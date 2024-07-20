import ConsumeFood from "./consume-food"
import Navbar from "./navbar"
import Footer from '../component/footer'
import '../css/consume-food.css'
export default function Nutrient(){
    return(
        <>
        <Navbar/>
         <ConsumeFood/> 
         <div className="foot">
         <Footer/>
         </div>
        </>
    )
}