import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import AdminLayout from './AdminLayout.jsx'
import { DemoProvider } from './DemoContext.jsx'
import OverviewPage from './OverviewPage.jsx'
import ProductsPage from './ProductsPage.jsx'
import DepartmentsPage from './DepartmentsPage.jsx'
import OrdersPage from './OrdersPage.jsx'
import DeliverySlotsPage from './DeliverySlotsPage.jsx'
import DeliverySettingsPage from './DeliverySettingsPage.jsx'
import StoreSettingsPage from './StoreSettingsPage.jsx'
import './admin.css'

if (import.meta.env.DEV && ['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname)) {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <BrowserRouter basename="/admin">
        <DemoProvider>
          <Routes>
            <Route element={<AdminLayout />}>
              <Route index element={<OverviewPage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="categories" element={<DepartmentsPage />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="delivery-slots" element={<DeliverySlotsPage />} />
              <Route path="delivery-settings" element={<DeliverySettingsPage />} />
              <Route path="store-settings" element={<StoreSettingsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </DemoProvider>
      </BrowserRouter>
    </StrictMode>,
  )
}
