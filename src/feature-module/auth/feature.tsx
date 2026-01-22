import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../core/common/header/index'
import Sidebar from '../../core/common/sidebar/index'
import { setMobileSidebar } from '../../hooks/redux/sidebarSlice'
import { all_routes } from '../../router/all_routes'

const Feature = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const open = useSelector((s: any) => s.sidebarSlice.mobileSidebar)
  const collapsed = useSelector((s: any) => s.sidebarSlice.collapsed)
  const close = () => dispatch(setMobileSidebar(false))
  const [routeLoading, setRouteLoading] = useState(false)
  useEffect(() => {
    setRouteLoading(true)
    const t = setTimeout(() => setRouteLoading(false), 300)
    return () => clearTimeout(t)
  }, [location.pathname])

  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 992px)').matches

  const isIndex = location.pathname === all_routes.index

  return (
    <div className={`main-wrapper ${!isIndex && collapsed ? 'sidebar-collapsed' : ''}`}>
      <Header variant={isIndex ? 'index' : 'app'} noSidebar={isIndex} />
      {!isIndex && <Sidebar />}
      {open && isMobile ? <div onClick={close} className="sidebar-overlay" /> : null}
      {routeLoading ? <div className="global-loader"><div className="loader"></div></div> : null}
      <div className={`content-wrap ${isIndex ? 'full-width' : ''}`}>
        <main className={isIndex ? '' : 'with-sidebar'} style={{ background: '#fafafa', minHeight: 'cal(100vh - 140px)', padding: 0 }}>
          <Outlet />
        </main>
        <footer className="app-footer">
          <small>2026 @ PolarCanvas</small>
          <p>Designed by <span>PolarCanvas</span></p>
        </footer>
      </div>
    </div>
  )
}

export default Feature
