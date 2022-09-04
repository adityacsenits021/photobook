import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import {auth} from './database';
import {signOut} from 'firebase/auth';

function Navbar(props) {
  const navigate=useNavigate();
  return (
    <div className='navbar'>
        <div className="text">
            <Link to='/' className='phototext'>Photo Book</Link>
        </div>
        {
          !props.user?
          
            <button className='btn'
            onClick={()=>{
              navigate('/login',{replace:true})
            }}
            >Login
          </button>
        :
          <button className='btn'
          onClick={()=>{
            signOut(auth)
            .then(()=>{
              console.log("You are logged out");
            })
            .catch((err)=>{
              console.log(err.message);
            })
          }}
          >Logout
          </button>
        }
        {/* <button className='btn'>
          {props.user?"LogOut"
        :"Log In"  
        }
            
        </button> */}
        {/* <div className="imagesection">
            <img src="https://www.shaadidukaan.com/vogue/wp-content/uploads/2019/08/hug-kiss-images.jpg" alt="" srcset="" className='img' />
        </div> */}
    </div>
  )
}

export default Navbar