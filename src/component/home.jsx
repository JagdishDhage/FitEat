import Card from "./card"
import Footer from "./footer"
import Navbar from "./navbar"
import '../css/home.css'
import { useNavigate } from "react-router-dom"
export default function Home(){
    const navigate =useNavigate();
    const handlecalculate =()=>{
        navigate('/nutrient-calculate')
    }
    const handlePlanDiet =()=>{
        navigate('/plan-diet')
    }
    const handleBmi =()=>{
        navigate('/BMI')
    }
    const handleVegDiet =()=>{
        navigate('/plan-diet')
    }
    const handleNonVegDiet =()=>{
        navigate('/plan-diet')
    }
    const handleCalorryLoss =()=>{
        navigate('/Calories')
    }
    return(
        <>
       
            <Navbar/>
            <div className="cards">
                <Card
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnvJf-A5HPdIH-NBKr4y5ZkmhHPhJZ-vN6JQ&s"
                    title="Calculate Your Nutrent"
                    description=""
                    buttonText="Calculate Nutrient"
                    nav={handlecalculate}
                />
                <Card 
                    src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGRpZXR8ZW58MHx8MHx8fDA%3D"
                    title="Plan Your Diet"
                    description=""
                    buttonText="Plan Your Diet"
                    nav={handlePlanDiet}
                />
                <Card
                    src="https://media.istockphoto.com/id/528072248/photo/bmi-body-mass-index-written-on-a-notepad-sheet.jpg?s=612x612&w=0&k=20&c=FuiMivhVuaOTV8K_8yooWaTpZ0ie5iuOZwoRbZPoo3g="
                    title="Calculate Your BMi"
                    description=""
                    buttonText="Calculate Your BMi"
                    nav={handleBmi}
                />                
            </div>
            <div className="cards">
                <Card
                    src="https://plus.unsplash.com/premium_photo-1671403964050-f7756da6c60b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHZlZ2V0YXJpYW4lMjBmb29kfGVufDB8fDB8fHww"
                    title="Vegetarian Diet"
                    description=""
                    buttonText="Vegetarian Diet"
                    nav={handleVegDiet}
                />
                <Card
                    src="https://t3.ftcdn.net/jpg/06/48/92/52/360_F_648925212_QYHo0OCN9Va3UvfWOEtpHM43A6lE1lSV.jpg"
                    title="Non-Vegetarian Diet"
                    description=""
                    buttonText="Non-Veg Diet"
                    nav={handleNonVegDiet}
                />
                <Card
                    src="https://media.istockphoto.com/id/502387628/photo/calorie-counter.jpg?s=612x612&w=0&k=20&c=NnhJSlNSjVpcrxA0mY_MmGk7dFIPAZaWsxnAh9SnX9A="
                    title="Count Loss Callory"
                    description=""
                    buttonText="Count Loss Callory"
                    nav={handleCalorryLoss}
                />                
            </div>
            
            <Footer/>
            
        </>
    )
}
