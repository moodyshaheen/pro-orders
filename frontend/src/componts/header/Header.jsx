import React from 'react'
import "./Header.css"
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";
import { RiPlayCircleFill } from "react-icons/ri";
import img from "../../assets/imges/3c5b5791ceeb7090fca7f8b0ff33bdbb.jpg"

function Header() {
  return (
    <div className='Header'>
        <div className="headerleft">
            <span>New Collection 2024</span>
            <h1>
                Discover
                <span>Premium</span>
                Products
            </h1>
            <p>Explore our curated collection of premium products designed to elevate your lifestyle and express your unique personality.</p>
          <div className="btn">
            <button > <MdOutlineShoppingBag  className='ops'/> Shop Now</button>
            <button className='btn-2'><RiPlayCircleFill className='ops'/> Watch Video</button>
          </div>
            
        </div>
        <div className="headerright">
            <div className="imghed">
              <img src={img} alt="" />
            <span>Live Shopping</span>

            </div>
         
            </div>
    </div>
  )
}
           


export default Header