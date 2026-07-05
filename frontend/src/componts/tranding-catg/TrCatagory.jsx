import React from 'react'
import { PiShirtFoldedLight  } from "react-icons/pi";
import { LuSmartphone } from "react-icons/lu";
import { RiHomeHeartLine,RiScissorsFill } from "react-icons/ri"; 
const img1 = "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c";
const img2 = "https://images.unsplash.com/photo-1517336714731-489689fd1ca8";
const img3 = "https://images.unsplash.com/photo-1505691938895-1758d7feb511";
const img4 = "https://images.unsplash.com/photo-1526045612212-70caf35c14df";
import "./TrCategory.css"

function TrCatagory() {
  return (
    <div className='TrCatagory'>
        <div className="h2p">
            <h2>Trending Categories</h2>
            <p>Discover what's popular right now across different product categories</p>
        </div>
        <div className="detials">
            <div className="cart">
                <div className="imgyy">
                <img src={img1} alt="" />
                <div className="ovarly fashon"></div>
                </div>
                <div className="ditalsh2">
                <PiShirtFoldedLight className='opc' />
                <b>Fashion</b>
                <span>2.5k+ Products</span>
                </div>

            </div>
             <div className="cart">
               <div className="imgyy">
                <img src={img2} alt="" />
                <div className="ovarly elctronic"></div>
                </div>
                <div className="ditalsh2">
                <LuSmartphone className='opc' />
                <b>Electronics</b>
                <span>1.8k+ Products</span>
                </div>

            </div>
             <div className="cart">
                <div className="imgyy">
                <img src={img3} alt="" />
                <div className="ovarly lifestyle"></div>
                </div>  
             <div className="ditalsh2">
                <RiHomeHeartLine  className='opc'/>
                <b>Lifestyle</b>
                <span>3.2k+ Products</span>
                </div>

            </div>
             <div className="cart">
               <div className="imgyy">
                <img src={img4} alt="" />
                <div className="ovarly grooming"></div>
                </div>
             <div className="ditalsh2">
                <RiScissorsFill className='opc' />
                <b>Grooming</b>
                <span>4.1k+ Products</span>
                </div>

            </div>
        </div>
    </div>
  )
}

export default TrCatagory