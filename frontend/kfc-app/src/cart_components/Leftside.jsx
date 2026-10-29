import React from 'react'
import { useSelector } from 'react-redux'
import Cartproduct from './Cartproduct';


const Leftside = () => {
    const cart= useSelector((state)=>state.cart);

  return (
    <div>
        {cart.map((el,index)=>{
            return <Cartproduct key={el.id || index} {...el} />
        })}
    </div>
  )
}

export default Leftside