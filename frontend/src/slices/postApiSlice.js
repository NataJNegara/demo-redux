import { apiSlice } from "./apiSlices";

const POST_URL = "/api/posts";

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => ({
        url: `${POST_URL}/`,
        method: "GET",
      }),
      providesTags: ["Post"],
    }),
    addPost: builder.mutation({
      query: (data) => ({
        url: `${POST_URL}/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Post", "UserPost"],
    }),
    getUserPosts: builder.query({
      query: () => ({
        url: `${POST_URL}/post`,
        method: "GET",
      }),
      providesTags: ["UserPost"],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `${POST_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["UserPost", "Post"],
    }),
    updatePost: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${POST_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["UserPost", "Post"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useAddPostMutation,
  useGetUserPostsQuery,
  useDeletePostMutation,
  useUpdatePostMutation,
} = postApiSlice;
