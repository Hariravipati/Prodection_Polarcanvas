import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { all_routes } from './all_routes'
import { isAuthenticated } from '../services/authService'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation()

  if (!isAuthenticated()) {
    return <Navigate to={all_routes.login} replace state={{ from: location }} />
  }

  return <>{children}</>
}

export default ProtectedRoute
