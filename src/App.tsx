import { createBrowserRouter, RouterProvider, Outlet } from 'react-router';
import './App.css';
import Topbar from './components/Topbar';
import CustomCursor from './components/CustomCursor';
import Home from './pages/home/Home';
import Work from './pages/work/Work';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';

function Layout() {
  return (
    <div className="app-wrapper">
      <CustomCursor />
      <Topbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'work', element: <Work /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
