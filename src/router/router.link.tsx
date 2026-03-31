import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import { all_routes } from './all_routes'
import { Login, CardBoxCalculator, CreateArticle, CreatePurchase, Master } from './lazyRoutes'

const routes = all_routes

export const publicRoutes = [
  {
    path: '/',
    name: 'Root',
    element: <Navigate to={routes.cardbox} replace />,
    route: Route,
  },
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
  }
]

export const authRoutes = [
  {
    path: routes.login,
    name: 'Login',
    element: <Login />,
    route: Route,
  },
]