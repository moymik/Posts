import { CircularProgress } from "@mui/material";
import { useState, useEffect, useRef } from "react";

interface InfiniteListProps {
  query: ({ page, limit }: { page: number; limit: number }) => any;
  //todo : тут подумать нужно как грамотно затипизировать
  //todo: также возмонжно ли добавить автоматическое определение высоты ряда
  rowHeight: number;
  pageSize: number;
  createRowElement: (itemData: any) => JSX.Element;
  containerHeight: string;
}

export default function InfiniteList(params: InfiniteListProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const { query, pageSize, createRowElement, rowHeight, containerHeight } =
    params;

  const [firstVisibleIndex, setFirstVisibleIndex] = useState(0);
  const [lastVisibleIndex, setLastVisibleIndex] = useState(pageSize - 1);
  const [page, setPage] = useState(0);

  const { data, isFetching } = query({
    page: page,
    limit: pageSize,
  });

  const items = data?.data;
  const totalCount = data?.totalCount;

  useEffect(() => {
    const onScroll = () => {
      if (listRef.current) {
        let containerHeight = listRef.current.getBoundingClientRect().height;
        let scrollTop = listRef.current.scrollTop;
        let scrollHeight = listRef.current.scrollHeight;
        let scrolledToBottom =
          Math.abs(scrollHeight - containerHeight - scrollTop) <= 100;
        // подгружаем
        if (scrolledToBottom && !isFetching && totalCount > page * pageSize) {
          setPage(page + 1);
        }
        //выбираем видимые c запасом чтобы прорисовывалось заранее
        setFirstVisibleIndex(() => {
          if (Math.floor(scrollTop / rowHeight) - 5 < 0) return 0;
          else return Math.floor(scrollTop / rowHeight) - 5;
        });
        setLastVisibleIndex(
          Math.floor((scrollTop + containerHeight) / rowHeight) + 5
        );
      }
    };

    listRef.current?.addEventListener("scroll", onScroll);

    return function () {
      listRef.current?.removeEventListener("scroll", onScroll);
    };
  }, [page, isFetching]);

  return (
    <div style={{ height: containerHeight, overflowY: "scroll" }} ref={listRef}>
      {items?.map((itemData: { id: number }, i: number) => {
        return (
          <div style={{ height: rowHeight }} key={itemData!.id}>
            {i >= firstVisibleIndex &&
              i <= lastVisibleIndex &&
              createRowElement(itemData)}{" "}
          </div>
        );
      })}
      {isFetching && <CircularProgress></CircularProgress>}
    </div>
  );
}
