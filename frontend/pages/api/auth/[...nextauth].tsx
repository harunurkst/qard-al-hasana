import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import api from "../api";
import React from "react";
import { type } from "os";

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

type UserCredential{
    username: string,
    password: string,
}

export const authOptions = {
// session: {
//     strategy: "jwt",
//     // maxAge: 30 * 24 * 60 * 60, // 30 days
//   },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        username: {label: "Username", type: "username"},
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials:UserCredential) {
        const credentialDetails = {
          username: credentials.username,
          password: credentials.password,
        };

        const resp = await api.post('api/v1/auth/login/', credentialDetails);
        const user = resp;
        if (user && user.status == 200) {
          return user.data;
        } else {
          console.log("check your credentials");
          return null;
        }
      },
    }),
  ],
callbacks: {
    jwt: async ({ token, user }) => {
        console.log('user', user)
        console.log('token:', token)
        console.log('exxpire time: ', token.exp)
        console.log('expire time at time formate: ', token.exp * 1000)
        console.log('current time: ', Date.now())
        if (user) {
            token.refreshToken = user.refresh;
            token.accessToken = user.access;
        }
        else if(Date.now()<(token.exp * 1000)){
            return token
        }else{
            const refreshResponse = await api('api/v1/auth/refresh/', token.refreshToken )
            const res = refreshResponse
            console.log('res:.....', res)
        }

        return token;
    },

    session: ({ session, token, user }) => {
        console.log('session data: ', session)
        console.log('session_token data: ', token)

        if (token) {
            session.user.accessToken = token.jti;
        }
        //   console.log('session data: ', session)
        return session;
        },
  },

    pages: {
        signIn: '/login',
    },
};

export default NextAuth(authOptions);