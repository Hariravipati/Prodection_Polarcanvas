import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { all_routes } from '../../router/all_routes'
import { clearAuthSession } from '../../services/authService'

const Logout = () => {
  useEffect(() => {
    clearAuthSession()
  }, [])

  return <Navigate to={all_routes.login} replace />
}

export default Logout
