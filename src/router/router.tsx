import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import { publicRoutes, protectedRoutes } from './router.link'

const Feature = lazy(() => import('../feature-module/auth/feature'))
const AuthFeature = lazy(() => import('../feature-module/auth/authFeature'))

const ALLRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <Suspense fallback={<div className="loader-wrap"><div className="loader"></div></div>}>
            <AuthFeature />
          </Suspense>
        }
      >
        {publicRoutes.map((route, idx) => (
          <Route path={route.path} element={route.element} key={idx} />
        ))}
      </Route>

      <Route
        element={
          <ProtectedRoute>
            <Suspense fallback={<div className="loader-wrap"><div className="loader"></div></div>}>
              <Feature />
            </Suspense>
          </ProtectedRoute>
        }
      >
        {protectedRoutes.map((route, idx) => (
          <Route path={route.path} element={route.element} key={idx} />
        ))}
      </Route>
    </Routes>
  )
}

export default ALLRoutes