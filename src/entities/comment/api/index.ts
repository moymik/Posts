import { IComment } from "../models/types";
import { typicodeApi } from "shared/Infinitelist/typicodeApi";


export const postApi = typicodeApi.injectEndpoints({
  endpoints: (build) => ({
    getCommentsByPostId: build.query<
      {data:IComment[],totalCount:number},
      { limit: number; page: number; postId: number }
    >({
      query: function ({ page = 0, limit, postId }) {
        return {
          url: `/comments?postId=${postId}`,
          params: {
            _limit: limit,
            _start: page * limit,
          },
        };
      },
      serializeQueryArgs: ({ queryArgs }) => {
        return queryArgs.postId;
      },
      merge: (currentCache, res) => {
        currentCache.data.push(...res.data);
      },
      forceRefetch({ currentArg, previousArg }) {
        if (!currentArg || !previousArg) return true;
        else
          return (
            currentArg.page !== previousArg.page ||
            currentArg.limit !== previousArg.limit
          );
      },
      transformResponse:(data:IComment[], meta)=> {
        return {
          data,
          totalCount: Number(meta?.response?.headers.get("X-Total-Count")),
        };
      },
    }),
   
  }),
});
export const { useGetCommentsByPostIdQuery } = postApi;
