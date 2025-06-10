import './App.css'
import AuthPage from './pages/auth/AuthPage'
import DashboardPage from './pages/dashboard/DashboardPage'
import PageNotFound from './pages/pageNotFound/PageNotFound.jsx'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { ProtectedRoute } from './components/Routing/ProtectedRoute.jsx'


function Layout() {
  return (
    <div className="App"> 
      <Outlet />
    </div>
  )
}

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          element: <ProtectedRoute />,
          children: [
            { index: true, element: <DashboardPage /> },
            { path: 'dashboard', element: <DashboardPage /> },
         
          ],
        },
        { path: 'login', element: <AuthPage /> },
        { path: '*', element: <PageNotFound /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
