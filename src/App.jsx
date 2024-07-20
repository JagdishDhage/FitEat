import './App.css'
import Home from './component/home'
import Login from './component/login'
import Register from './component/register'
import Nutrient from './component/nutrient'
import PlanDiet from './component/Plan-diet'
import { createBrowserRouter,RouterProvider} from "react-router-dom";
import BMI from './component/BMI/bmi'
import Profile from './component/Profile/profile'
import Calories from './component/calory'
import Footer from './component/footer'
function App() {
 const router=createBrowserRouter([
  {
    path:'/',
    element:<Login/>
  },
  {
    path:'/register',
    element:<Register/>
  },
  {
    path:'/home', 
    element:<Home/>
  },
  {
    path:'/nutrient-calculate', 
    element:<Nutrient/>
  },
  {
    path:'/Calories', 
    element:<Calories/>
  },
   {
    path:'/plan-diet', 
    element:<PlanDiet/>
  },
  {
    path:'/BMI', 
    element:<BMI/>
  },
  {
    path:'/profile', 
    element:<Profile/>
  }
 ])

  return (
    <> 
      
      <RouterProvider router={router}/>
      
    </>
  )
}

export default App
