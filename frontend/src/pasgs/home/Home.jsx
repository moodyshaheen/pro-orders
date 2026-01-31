import "./Home.css" 
import Header from '../../componts/header/Header'
import TrCatagory from '../../componts/tranding-catg/TrCatagory'
import Categories from "../../componts/category/Category"
import Products from "../../componts/products/Products"
import SessionNum from "../../componts/sessionnumper/SessionNum"
import SessionStl from "../../componts/sessionstyle/SessionStl"

function Home() {
  return (
    <div className='Home'>
      <Header/>
      <TrCatagory/>
      <Categories/>
      <SessionNum/>
      <SessionStl/>
    </div>
  )
}

export default Home