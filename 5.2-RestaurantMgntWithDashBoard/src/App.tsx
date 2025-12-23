import { RouterProvider, createBrowserRouter } from 'react-router'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Meals from './pages/Meals'
import Register from './pages/Register'
import UserDashboard from './pages/userPages/UserDashboard'
import Orders from './pages/userPages/Orders'
import UserProfile from './pages/userPages/UserProfile'
import AdminDashboard from './pages/admin/AdminDashboard'
import AllOrders from './pages/admin/AllOrders'
import AllMenuItems from './pages/admin/AllMenuItems'
import AllCustomers from './pages/admin/AllCustomers'
import AllRestaurants from './pages/admin/AllRestaurants'
import AdminProfile from './pages/admin/AdminProfile'

// Route Protection Components
import AdminRoute from './components/auth/AdminRoute'
import UserRoute from './components/auth/UserRoute'
import PublicRoute from './components/auth/PublicRoute'


function App() {

  const router = createBrowserRouter([
    // Public routes
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/meals',
      element: <Meals />
    },
    {
      path: '/about',
      element: <About />
    },
    {
      path: '/contact',
      element: <Contact />
    },
    {
      path: '/register',
      element: <PublicRoute><Register /></PublicRoute>
    },
    {
      path: '/login',
      element: <PublicRoute><Login /></PublicRoute>
    },
    // User Dashboard routes (user only)
    {
      path: '/dashboard',
      element: <UserRoute><UserDashboard /></UserRoute>
    },
    {
      path: '/dashboard/my-orders',
      element: <UserRoute><Orders /></UserRoute>
    },
    {
      path: '/dashboard/user-profile',
      element: <UserRoute><UserProfile /></UserRoute>
    },
    
    // Admin dashboard routes (admin only)
    {
      path: '/admin/dashboard',
      element: <AdminRoute><AdminDashboard /></AdminRoute>
    },
    {
      path: '/admin/orders',
      element: <AdminRoute><AllOrders /></AdminRoute>
    },
    {
      path: '/admin/menu-items',
      element: <AdminRoute><AllMenuItems /></AdminRoute>
    },
    {
      path: '/admin/customers',
      element: <AdminRoute><AllCustomers /></AdminRoute>
    },
    {
      path: '/admin/restaurants',
      element: <AdminRoute><AllRestaurants /></AdminRoute>
    },
    {
      path: '/admin/profile',
      element: <AdminRoute><AdminProfile /></AdminRoute>
    },
    // Legacy admin routes (redirect to new paths)
    {
      path: '/admin/dashboard/all-orders',
      element: <AdminRoute><AllOrders /></AdminRoute>
    },
    {
      path: '/admin/dashboard/all-menu-items',
      element: <AdminRoute><AllMenuItems /></AdminRoute>
    },
    {
      path: '/admin/dashboard/all-customers',
      element: <AdminRoute><AllCustomers /></AdminRoute>
    },
    {
      path: '/admin/dashboard/all-restaurants',
      element: <AdminRoute><AllRestaurants /></AdminRoute>
    },
    {
      path: '/admin/dashboard/admin-profile',
      element: <AdminRoute><AdminProfile /></AdminRoute>
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
