import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import { setCollapsed } from '../../../hooks/redux/sidebarSlice'
import { setDataTheme } from '../../../hooks/redux/themeSettingSlice'
import { Bell, HelpCircle, Grid2x2, Search } from 'lucide-react'

type HeaderProps = {
  variant?: 'index' | 'app'
  noSidebar?: boolean
}

const Header = ({ variant = 'app', noSidebar = false }: HeaderProps) => {
  const dispatch = useAppDispatch()
  const theme = useAppSelector((s) => s.themeSetting.dataTheme)
  const collapsed = useAppSelector((s) => s.sidebarSlice.collapsed)

  const toggleSidebar = () => dispatch(setCollapsed(!collapsed))
  const toggleTheme   = () => dispatch(setDataTheme(theme === 'dark' ? 'light' : 'dark'))
  const IMG_BASE = import.meta.env.VITE_IMAGE_BASE_URL;

  const handleMenuClick = () => {
    toggleSidebar();
  };

  const headerClasses = `app-header ${noSidebar ? 'no-sidebar' : ''}`

  return (
    <header className={headerClasses}>
      <div className="left">
        {variant === 'index' ? (
          <div className="brand">
            <a href="/index"><img src={`${IMG_BASE}logo.png`} alt="brand" className="brand-logo" /></a>
          </div>
        ) : (
          <button className="icon-btn" aria-label="Toggle menu" onClick={handleMenuClick}>
            <svg
              className={`menu-icon ${collapsed ? 'rotate' : ''}`}
              width="40"
              height="40"
              viewBox="-2.4 -2.4 28.80 28.80"
              xmlns="http://www.w3.org/2000/svg"
              transform="rotate(180)"
            >
              <path d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z" fill="currentColor" stroke="currentColor" strokeWidth="0.2"></path>
            </svg>
          </button>
        )}
      </div>

      <div className="center">
        <div className="search-box">
          <Search />
          <input placeholder="Search" />
        </div>
      </div>

      <div className="right">
        <button className="icon-btn" title="Notifications">
          <Bell />
        </button>
        <button className="icon-btn" title="Help">
          <HelpCircle />
        </button>
        <button className="icon-btn" title="Apps">
          <Grid2x2 />
        </button>
        <div className="profile-mini" title="Admin">
          <img src={`${IMG_BASE}icon.png`} alt="avatar" />
        </div>
      </div>
    </header>
  )
}

export default Header
