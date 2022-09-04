import './App.css';
import Navbar from './components/Navbar';
import {Routes,Route} from 'react-router-dom'
import Home from './components/Home';
import {auth} from './components/database';
import {onAuthStateChanged} from 'firebase/auth'
import { useEffect, useState } from 'react';
import Login from './components/login/Login';

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubAuth=onAuthStateChanged(auth,(authUser)=>{
      if(authUser){
        setUser(authUser);
        console.log(authUser);
        console.log("user email is:",authUser.email);
        console.log("display name is:",authUser.displayName);
      }
      else{
        // No user is logged in right now.
        console.log("No one is logged in")
        setUser(null);
      }
    })
  
    return () => {
      unsubAuth();
    }
  }, [user])
  
  return (
    <div className="App">

      <Navbar user={user} />
      <Routes>
        <Route path='/' element={<Home user={user} />} />
        <Route path='/login' element={<Login/>} />
      </Routes>
    </div>
  );
}

export default App;
