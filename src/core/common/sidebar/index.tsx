import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMobileSidebar } from '../../../hooks/redux/sidebarSlice'
import { all_routes } from '../../../router/all_routes'
import { Link, useLocation } from "react-router-dom";
import icon from "../../../assets/images/icon.png";
import logo from "../../../assets/images/logo.png";

import {
  Home,
  Calculator,
  FileText,
  ShoppingCart,
  Package,
  Settings
} from 'lucide-react'

const Sidebar = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const open = useSelector((s: any) => s.sidebarSlice.mobileSidebar)
  const collapsed = useSelector((s: any) => s.sidebarSlice.collapsed)

  const close = () => dispatch(setMobileSidebar(false))

  const NavIcon = ({ to, Icon, label }) => (
    <Link
      to={to}
      title={label}
      aria-label={label}
      onClick={close}
      className={`nav-icon ${location.pathname === to ? 'active' : ''}`}
    >
      <Icon />
      <span className="label">{label}</span>
    </Link>
  )

  return (
    <aside className={`app-sidebar ${open ? 'open' : ''} ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-brand">
        <img src={`${collapsed ? icon : logo}`} alt="brand" />
      </div>

      <nav className="sidebar-nav">
        <NavIcon to={all_routes.cardbox} Icon={Calculator} label="Calculator" />
        <NavIcon to={all_routes.article} Icon={FileText} label="Article" />
        <NavIcon to={all_routes.purchase} Icon={ShoppingCart} label="Purchase" />       
        <NavIcon to={all_routes.master} Icon={Settings} label="Master" />
      </nav>
    </aside>
  )
}

export default Sidebar

