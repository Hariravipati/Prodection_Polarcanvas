import React, { Suspense, lazy } from 'react'


const createLazyComponent = (
  importFunc,
  fallback = <div className="loader-wrap"><div className="loader"></div></div>
) => {
  const LazyComponent = lazy(importFunc)
  return (props) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  )
}

export const Login = createLazyComponent(() => import('../feature-module/auth/login'))
export const CardBoxCalculator = createLazyComponent(() => import('../components/CardBoxCalculator/CardBoxCalculator'))
export const CreateArticle = createLazyComponent(() => import('../feature-module/CreateArticle/CreateArticle'))
export const CreatePurchase = createLazyComponent(() => import('../feature-module/CreatePurchaseOrder/CreatePurchaseOrder'))