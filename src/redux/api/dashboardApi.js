import { createApi } from "@reduxjs/toolkit/query/react";
import authApi from "./../authApi";

const baseQuery = async (args) => {
  try {
    const response = await authApi.get(args.url);
    return { data: response.data };
  } catch (error) {
    return { error: error.response?.data || error.message };
  }
};

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery,
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: ({ page, perPage, tabName, sortColumn, sortOrder, search }) => ({
        url: `/getJobsFromTmsSummeryViewDashboard?page=${page}&perPage=${perPage}&tabName=${tabName}${
          sortColumn ? `&sortBy=${sortColumn}` : ""
        }${sortOrder ? `&sortOrder=${sortOrder}` : ""}${
          search ? `&search=${encodeURIComponent(search)}` : ""
        }`,
      }),
      transformResponse: (response) => ({
        data: response.data,
        totalPages: response.totalPages,
      }),
    }),
  }),
});

export const { useGetJobsQuery } = dashboardApi;