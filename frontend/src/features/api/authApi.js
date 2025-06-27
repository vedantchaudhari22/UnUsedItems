import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userLoggedIn } from '../authSlice';
const USERAPI = "http://localhost:8080/api/v1/user/"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: USERAPI,
        credentials: 'include'
    }),
    endpoints: (builder) => ({

        registerUser: builder.mutation({
            query: (inputData) => ({
                url: "register",
                method: "POST",
                body: inputData
            })
        }),

        loginUser: builder.mutation({
            query: (inputData) => ({
                url : "login",
                method : "POST",
                body: inputData
            }),
            async onQueryStarted(args, {queryFullfilled, dispatch}){
                try {
                    const { result } = await queryFullfilled;
                    dispatch(userLoggedIn({user : result.data?.user}))
                } catch (error) {
                    console.log(error);
                    
                }
            }
        }),
        loadUser : builder.query({
            query: () => ({
                url:"profile",
                method: "GET"
            })
        }),

        updateUser: builder.mutation({
            query: (formData) => ({
                url: "/profile-update",
                method: "PUT",
                body: formData,
            })
        })
    })
})

export const {
    useRegisterUserMutation,
    useLoginUserMutation, 
    useLoadUserQuery, 
    useUpdateUserMutation
} = authApi
