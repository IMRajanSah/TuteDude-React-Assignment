import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './component/Header'
import Meals from './component/Meals'
import { MealContext } from './Data/MealContext'
import { useEffect, useState } from 'react'
function App() {
  const [myMeals,setMeals] = useState([])
  const addMeal=(item)=>{
    setMeals((prev) => [...prev, item]);    
  }
  const deleteMeal=(item)=>{
    setMeals((prev) => prev.filter(m => m.id !== item));
  }
  return (
    <>
      <MealContext.Provider value={{myMeals,addMeal,deleteMeal}}>
        <Header/>
        <Meals/>
      </MealContext.Provider>
    </>
  )
}

export default App
