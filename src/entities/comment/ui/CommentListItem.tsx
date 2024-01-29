import { Card,Typography } from "@mui/material";
import { IComment } from "../models/types";


const CommentListItem = (props: { commentData: IComment })=>{
    return(<Card className="comment">
    <Typography className="comment__name" variant="h4" noWrap>
      {props.commentData.name}
    </Typography>
    <Typography className="comment__body">{props.commentData.body}</Typography>
    <Typography className="comment__author">{props.commentData.email}</Typography>
  </Card>)
}
export default CommentListItem