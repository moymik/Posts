import { useGetPostsQuery } from "entities/post/api";

import PostListItem from "entities/post/ui/PostListItem";
import InfiniteList from "shared/Infinitelist/InfiniteList";
import { IPost } from "entities/post/models/types";

const PostsList = () => {
  return (
    <InfiniteList 
      query={useGetPostsQuery}
      rowHeight={200} 
      pageSize={20}
      createRowElement={(itemData:IPost) => (
        <PostListItem key={itemData.id} postData={itemData}></PostListItem>
      )}
      containerHeight="90vh"
    ></InfiniteList>
  );
};




export default PostsList;
