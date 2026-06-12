import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import { all_routes } from './all_routes'
import { Login, CardBoxCalculator, CreateArticle, CreatePurchase, Master } from './lazyRoutes'
import Logout from '../feature-module/auth/Logout'
import { isAuthenticated } from '../services/authService'

const routes = all_routes

const isLoggedIn = () => isAuthenticated()

export const publicRoutes = [
  {
    path: '/',
    name: 'Root',
    element: <Navigate to={isLoggedIn() ? routes.cardbox : routes.login} replace />,
    route: Route,
  },
  {
    path: routes.login,
    name: 'Login',
    element: isLoggedIn() ? <Navigate to={routes.cardbox} replace /> : <Login />,
    route: Route,
  },
  {
    path: routes.logout,
    name: 'Logout',
    element: <Logout />,
    route: Route,
  },
]

export const protectedRoutes = [
  {
    path: routes.cardbox,
    name: 'Card Box Calculator',
    element: <CardBoxCalculator />,
    route: Route,
  },
  {
    path: routes.article,
    name: 'Create Article',
    element: <CreateArticle />,
    route: Route,
  },
  {
    path: routes.purchase,
    name: 'Purchase Order',
    element: <CreatePurchase />,
    route: Route,
  },
  {
    path: routes.master,
    name: 'Master',
    element: <Master />,
    route: Route,
  },
]