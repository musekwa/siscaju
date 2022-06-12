
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseURL = `http://localhost:8080/performances` 

let user = JSON.parse(localStorage.getItem("user"));

export const performancesApi = createApi({
    reducerPath: "performancesApi",
    keepUnusedDataFor: 1,
    baseQuery: fetchBaseQuery({ 
        baseUrl: baseURL,
        prepareHeaders: (headers, { getState })=>{
            if (user) {
                headers.set('authorization', `Bearer ${user.token}`)
            }
            return headers;
        },
    }),
    endpoints: (builder)=>({
        getPerformances: builder.query({
            query: ()=> `?userId=${user._id}&district=${user?.address?.district}`
        }),
    }),
})

export const { useGetPerformancesQuery } = performancesApi;