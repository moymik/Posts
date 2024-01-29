import { useParams } from "react-router-dom";
import { useGetPostByIdQuery } from "entities/post/api";

import { Card, Typography,CircularProgress } from "@mui/material";

import CommentsList from "widgets/comments-list";

const PostPage = () => {
  const { postId } = useParams();
  let { data: postData, isLoading: postDataIsLoading } = useGetPostByIdQuery(
    Number(postId)
  );

  if (postDataIsLoading) return <CircularProgress />;
  else
    return (
      <>
        <Card sx={{
            display:"flex",
            flexDirection: "column",
            height:"50vh",
            justifyContent:"space-around"}} >
          <Typography variant="h1">{postData!.title}</Typography>
          <Typography>{postData!.body}</Typography>
        </Card>
        <Typography variant="h3">Comments:</Typography>

        <CommentsList postId={Number(postId)}></CommentsList>
      </>
    );
};

export default PostPage;
