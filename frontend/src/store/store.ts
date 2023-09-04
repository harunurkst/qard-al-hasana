import { create } from 'zustand'
import {AuthSlice,createAuthSlice} from './slices/authSlice'
import {MemberSlice,createMemberSlice} from './slices/memberSlice'

const useStore = create<AuthSlice & MemberSlice>()((...a) => ({
  ...createAuthSlice(...a),
  ...createMemberSlice(...a)
}))

export default useStore;