/* eslint-disable no-console */
import {  StateCreator } from 'zustand'
import {instance} from '../../axios'
import { getHeaders } from '@/utils/getHeaders'


const apiRoute = `/auth`

export interface AuthSlice {
  data: object | null
  registerUser: (payload:object | null) => void
  login: (payload:object | null) => void
}
export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  data: null,
  registerUser: async (payload : object | null) => {
    console.log('payload',payload)
    const response = await instance.post(`${apiRoute}/registration`,payload, getHeaders());
    console.log('response',response)
    const data = response;
    return data;
  },
  login: (payload : object | null) => {
    console.log('payload',payload)
    set(()=>({data: payload}))
  },
})
