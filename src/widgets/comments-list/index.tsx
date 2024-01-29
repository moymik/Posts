import { useGetCommentsByPostIdQuery } from "entities/comment/api";
import CommentListItem from "entities/comment/ui/CommentListItem";
import InfiniteList from "shared/Infinitelist/InfiniteList";
import { IComment } from "entities/comment/models/types";

const CommentsList = ({ postId }: { postId: number }) => {
  return (
    <InfiniteList
      query={({ page, limit }: { page: number; limit: number }) =>
        useGetCommentsByPostIdQuery({ page, limit, postId })
      }
      rowHeight={200} 
      pageSize={3} // выбрал число поменьше для демки т.к. там комментов мало
      createRowElement={(itemData: IComment) => (
        <CommentListItem
          key={itemData.id}
          commentData={itemData}
        ></CommentListItem>
      )}
      containerHeight="40vh"
    ></InfiniteList>
  );
};

export default CommentsList;
