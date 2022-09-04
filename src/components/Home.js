import React from 'react'
import Additem from './additem/Additem'
import Signup from './signup/Signup'

function Home(props) {
  return (
    <div>
      {!props.user?
      <Signup/>:
      // <div className="home">Home</div>
      
      <Additem user={props.user} />
      
    }
    </div>
  )
}

export default Home