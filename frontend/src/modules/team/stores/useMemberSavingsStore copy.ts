/* eslint-disable no-console */
import {  StateCreator } from 'zustand'

export interface MemberSlice {
  data: object | null
  addMember: (payload:object | null) => void
  deleteMember: (payload:object | null) => void
}
export const createMemberSlice: StateCreator<MemberSlice> = (set) => ({
  data: null,
  addMember: (payload : object | null) => {
    console.log('payload',payload)
    set(()=>({data: payload}))
  },
  deleteMember: (payload : object | null) => {
    console.log('payload',payload)
    set(()=>({data: payload}))
  },
})
