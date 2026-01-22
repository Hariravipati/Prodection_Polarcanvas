import { configureStore } from '@reduxjs/toolkit'
import sidebarSlice from './sidebarSlice'
import themeSettingSlice from './themeSettingSlice'

export const store = configureStore({
  reducer: {
    sidebarSlice,
    themeSetting: themeSettingSlice,
  },
  devTools: true,
})

if (typeof window !== 'undefined') {
  store.subscribe(() => {
    try {
      const collapsed = store.getState().sidebarSlice.collapsed
      localStorage.setItem('sidebarCollapsed', String(collapsed))
    } catch {}
  })
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
