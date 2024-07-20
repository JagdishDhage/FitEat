import React , {useEffect , useState} from 'react';
import { NavLink } from 'react-router-dom';
import '../css/navbar.css'; 
import logo from '../assets/img/logo1.png'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 250) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      };
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    return (
        <>
        <div className='nav-container'>
            <div className={`nav-content ${scrolled ? 'hide' : ''}`}>
                <div className='nav-brand'>
                   <img src={logo} alt="logo" className='logo' />
                   <NavLink to='/home'><h1>FitEat</h1></NavLink>
                </div>  
                <p className='slogn'>Smart Eating for Optimal Living</p>
                <hr/>
            </div>
        
            <div className= {`navbar-container ${scrolled ? 'navbar-content' : ''}`}>
                <ul className="navbar">
                    {scrolled && <li className='navbrand'>
                        <img src={logo} alt="FitEat Logo"/>
                        <NavLink to="/home">FitEat</NavLink>
                    </li>          }
                    <li><NavLink to="/nutrient-calculate"> 
                    <span class="material-symbols-outlined">restaurant
                    </span>Nutrient</NavLink></li>
                    <li><NavLink className='cal' to="/Calories">
                    <span class="material-symbols-outlined">water_voc</span>
                    Calories</NavLink></li>
                    <li><NavLink to="/BMI"><span class="material-symbols-outlined">heart_plus
                    </span>BMI</NavLink></li>
                    <li><NavLink to="/profile"><span class="material-symbols-outlined">person</    span>Profile</NavLink></li>
                </ul>
            </div>
        </div>
        </>
    );
}
