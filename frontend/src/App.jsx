//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
//import { Button } from './components/ui/button'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import HeroSection from './pages/student/HeroSection'
import { createBrowserRouter } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import { RouterProvider } from 'react-router-dom'
import Courses from './pages/student/Courses'
import MyLearning from './pages/student/MyLearning'
import Profile from './pages/student/Profile'


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />
            <Courses />
          </>
        ),
      },


      {
        path:"login",
        element:<Login />
      },
      
      {
        path:"my-learning",
        element:<MyLearning />
      },

      {
        path:"profile",
        element: <Profile />
      }


    ],
  }
])

function App() {
  // const [count, setCount] = useState(0)

  return (
    <main>
      <RouterProvider router={appRouter}/>


    </main>
  )
}

export default App
