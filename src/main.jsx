import { lazy, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { BasketProvider } from './components/basket/BasketContext.jsx'
import CheckoutSession from './components/checkout/CheckoutSession.jsx'
import SiteLayout from './components/SiteLayout.jsx'
import { departmentShopPath, departments } from './data/departments.js'
import HomePage from './pages/HomePage.jsx'
import './styles/index.css'

const AboutPage = lazy(() => import('./pages/AboutPage.jsx'))
const BasketPage = lazy(() => import('./pages/BasketPage.jsx'))
const CheckoutPage = lazy(() => import('./pages/CheckoutPage.jsx'))
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'))
const DeliveryPage = lazy(() => import('./pages/DeliveryPage.jsx'))
const ShopPage = lazy(() => import('./pages/ShopPage.jsx'))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <BasketProvider>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/basket" element={<BasketPage />} />
            <Route element={<CheckoutSession />}>
              <Route path="/delivery" element={<DeliveryPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Route>
            {departments.map(({ id, path }) => (
              <Route key={path} path={path} element={<Navigate to={departmentShopPath(id)} replace />} />
            ))}
          </Route>
        </Routes>
      </BasketProvider>
    </BrowserRouter>
  </StrictMode>,
)
