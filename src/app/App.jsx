import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout/AdminLayout'
import Dashboard from '../features/dashboard/pages/Dashboard'
import Register from '../pages/Register'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register/:token" element={<Register />} />
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="invitations" element={<div className="p-6">Invitations Placeholder</div>} />
          <Route path="applications" element={<div className="p-6">Applications Placeholder</div>} />
          <Route path="documents" element={<div className="p-6">Documents Placeholder</div>} />
          <Route path="reports" element={<div className="p-6">Reports Placeholder</div>} />
          <Route path="settings" element={<div className="p-6">Settings Placeholder</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
