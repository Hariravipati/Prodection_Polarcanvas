import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  mobileSidebar: true,
  collapsed: (typeof window !== 'undefined' && localStorage.getItem('sidebarCollapsed') !== null)
    ? localStorage.getItem('sidebarCollapsed') === 'true'
    : true,
}

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setMobileSidebar: (state, action) => {
      state.mobileSidebar = action.payload
    },
    setCollapsed: (state, action) => {
      state.collapsed = action.payload
    },
  },
})

export const { setMobileSidebar, setCollapsed } = sidebarSlice.actions
export default sidebarSlice.reducer
