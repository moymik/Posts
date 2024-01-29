import { IPost } from "../models/types";
import { typicodeApi } from "shared/Infinitelist/typicodeApi";

export const postApi = typicodeApi.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.query<
      { data: IPost[]; totalCount: number },
      { limit: number; page: number }
    >({
      query: function ({ page = 0, limit }) {
        return {
          url: "/posts",
          params: {
            _limit: limit,
            _start: page * limit,
          },
        };
      },

      transformResponse: (data: IPost[], meta) => {
        return {
          data,
          totalCount: Number(meta?.response?.headers.get("X-Total-Count")),
        };
      },

      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
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
    }),

    getPostById: build.query<IPost, number>({
      query: (id) => ({
        url: `/posts/${id}`,
      }),
    }),
  }),
});
export const { useGetPostsQuery, useGetPostByIdQuery } = postApi;
