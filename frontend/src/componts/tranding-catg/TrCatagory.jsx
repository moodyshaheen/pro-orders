import React from 'react'
import { PiShirtFoldedLight  } from "react-icons/pi";
import { LuSmartphone } from "react-icons/lu";
import { RiHomeHeartLine,RiScissorsFill } from "react-icons/ri"; 
import img1 from "../../assets/imges/b46ccc6535d54c976cebc2e72ea6f643.jpg"
import img2 from "../../assets/imges/9ec65627ebec9927cedb9cf282f76254.jpg"
import img3 from "../../assets/imges/01d7b11f5b3fc75e2a245383d7041b7a.jpg"
import img4 from "../../assets/imges/03bb08babfa360b967dcb34ae2ea9de5.jpg"
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