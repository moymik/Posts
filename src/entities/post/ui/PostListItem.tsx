import { useRef, useEffect, useState, RefObject } from "react";
import { useNavigate } from "react-router";
import { Card, Button, Typography } from "@mui/material";

import { IPost } from "../models/types";
import "../postListItem.scss";


function getElementsWidth(ref: RefObject<HTMLDivElement>): number {
  if (ref.current) return ref.current.getBoundingClientRect().width;
  else return 0;
}


const PostListItem = (props: { postData: IPost }) => {
  const navigate = useNavigate();
  const itemRef = useRef<HTMLDivElement>(null);
  const { postData } = props;

  const [description, setDescription] = useState(postData.body);

  useEffect(() => {
    function handleResize() {
      let maxLength = Math.floor((2 * getElementsWidth(itemRef)) / 11);
      if (props.postData.body.length > maxLength) {
        setDescription(postData.body.slice(0, maxLength - 3) + "...");
      } else {
        setDescription(postData.body);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Card ref={itemRef} className="post">
      <Typography className="post__title" variant="h2" noWrap>
        {props.postData.title}
      </Typography>

      <Typography className="post__body">{description}</Typography>
      <Button
        variant="contained"
        className="post__redirect-button"
        onClick={() => {
          navigate(`/posts/${props.postData.id}`);
        }}
      >
        Read more
      </Button>
    </Card>
  );
};
export default PostListItem;
