import ConsumeFood from "./consume-food";
import InputComp from './inputComp'
import Navbar from "./navbar";
import GenerateAnswer from "./geminiApi/api";
import Footer from "./footer";
export default function Calories(){
    return(
        <>
        <div className="cal">
            <Navbar/>
            <InputComp/>
            <Footer/>
            </div>
        </>
    )
}