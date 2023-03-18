import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
   reducerPath: 'lwsApi',
   baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:9000',
   }),
   tagTypes: ['Videos', 'Video', 'ReletedVideos'],
   endpoints: (builder) => ({
      getVideos: builder.query({
         query: () => '/videos',
         keepUnusedDataFor: 600,
         providesTags: ['Videos'],
      }),
      getVideo: builder.query({
         query: (id) => `/videos/${id}`,
         providesTags: (result, error, arg) => [{ type: 'Video', id: arg }],
      }),
      getReletedVideos: builder.query({
         query: ({ id, title }) => {
            const tags = title.split(' ');
            const likes = tags.map((title) => `title_like=${title}`);
            const queryString = `/videos?${likes.join('&')}&_limit=4`;
            return queryString;
         },
         providesTags: (result, error, arg) => [{ type: 'ReletedVideos', id: arg.id }],
      }),
      addVideo: builder.mutation({
         query: (data) => ({
            url: '/videos',
            method: 'POST',
            body: data,
         }),
         invalidatesTags: ['Videos'],
      }),
      editVideo: builder.mutation({
         query: ({ id, data }) => ({
            url: `/videos/${id}`,
            method: 'PATCH',
            body: data,
         }),
         invalidatesTags: (result, error, arg) => [
            'Videos',
            { type: 'Video', id: arg.id },
            { type: 'ReletedVideos', id: arg.id },
         ],
      }),
      deleteVideo: builder.mutation({
         query: (id) => ({
            url: `/videos/${id}`,
            method: 'DELETE',
         }),
         invalidatesTags: ['Videos'],
      }),
   }),
});

export const {
   useGetVideosQuery,
   useGetVideoQuery,
   useGetReletedVideosQuery,
   useAddVideoMutation,
   useEditVideoMutation,
   useDeleteVideoMutation,
} = apiSlice;
