import { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import axios from "axios";
import {
  FaPhone,
  FaFacebookSquare,
  FaTwitterSquare,
  FaInstagramSquare,
  FaHeart,
  FaUser,
  FaShoppingCart,
  FaSearch,
  FaSignOutAlt
} from "react-icons/fa";
import { PiShirtFoldedLight } from "react-icons/pi";
import { LuSmartphone, LuLogIn } from "react-icons/lu";
import { RiHomeHeartLine } from "react-icons/ri";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose, IoMdPersonAdd } from "react-icons/io";
import { MdEmail, MdFireplace, MdOutlineShoppingBag } from "react-icons/md";
import { displayContext } from '../../context/DisplayContexet';
import { StoreContext } from '../../context/StoreContext';

function Navbar() {
  const [menu, setMenu] = useState('home');
  const [phone, setPhone] = useState(false);
  const { userData, token, logoutHandler ,setUserData} = useContext(displayContext);
  const { cartIds, favIds } = useContext(StoreContext);
  const categoriesRef = useRef(null);
  const userMenuRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const amountcartidis = Object.values(cartIds).reduce((a, b) => a + b, 0);
  const amountFavortidis = favIds.length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target) && menu === 'Categories') {
        setMenu('');
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target) && menu === 'drobdown') {
        setMenu('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menu]);

  // 🔹 Logout
  const handleLogout = async () => {
       try {
      await logoutHandler();
      setUserData(null);
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // 🔹 Search products
  useEffect(() => {
    const fetchProducts = async () => {
      if (searchTerm.trim().length < 2) {
        setSearchResults([]);
        return;
      }
      try {
        const res = await axios.get(`http://localhost:3000/products?q=${searchTerm}`);
        setSearchResults(res.data);
      } catch (error) {
        console.error("Search error:", error);
      }
    };
    const delayDebounce = setTimeout(fetchProducts, 300);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  return (
    <div className='Navbar'>
      {/* TOP NAV */}
      <div className="navtop">
        <div className="navtopLeft">
          <span className='phone'><FaPhone className='phoneicon' /> +123 456 7890</span>
          <span className='email'><MdEmail className='emailicon' /> hello@modernshop.com</span>
        </div>
        <div className="navtopRight">
          <span>Free shipping on orders over $99!</span>
          <div className="socialop">
            <FaFacebookSquare className='socialicon' />
            <FaTwitterSquare className='socialicon' />
            <FaInstagramSquare className='socialicon' />
          </div>
        </div>
      </div>

      {/* BOTTOM NAV */}
      <div className="navbottom">
        <div className="navbottomLeft">
          <Link className="navbar-brand" to="/">
            <MdOutlineShoppingBag className='shopicon' />
            <div>
              <h1>ModernStore</h1>
              <p>Premium Shopping</p>
            </div>
          </Link>
        </div>

        <button className='hamburger' onClick={() => setPhone(!phone)}>
          <GiHamburgerMenu />
        </button>

        <div className={`navMenu ${phone ? 'open' : ''}`}>
          <button className="close-btn" onClick={() => setPhone(false)}>
            <IoMdClose />
          </button>

          {/* USER ICON / DROPDOWN */}

          {/* NAV LINKS */}
          <Link to={'/'} onClick={() => setMenu('home') || setPhone(false)} className={menu === 'home' ? 'active' : ''}>Home</Link>

          <div className="dropdown" ref={categoriesRef}>
            <button onClick={() => setMenu(menu === 'Categories' ? '' : 'Categories')} className={`dropdown-btn ${menu === 'Categories' ? 'active' : ''}`}>
              Categories {menu === 'Categories' ? <IoIosArrowDown /> : <IoIosArrowUp />}
            </button>
            {menu === 'Categories' && (
              <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
                <Link to={"fashion"} className="dropdown-item"><PiShirtFoldedLight /> Fashion </Link>
                <Link to={"Electronics"} className="dropdown-item"><LuSmartphone /> Electronic </Link>
                <Link to={"Jewelry"} className="dropdown-item"><RiHomeHeartLine /> Lifestyle </Link>
              </div>
            )}
          </div>

          <Link to={"product"} onClick={() => setMenu('Products') || setPhone(false)} className={menu === 'Products' ? 'active' : ''}>Products</Link>
          <Link to={"deals"} onClick={() => setMenu('Deals') || setPhone(false)} className={menu === 'Deals' ? 'active' : ''}>Deals <span className="hot-badge">Hot</span></Link>
          <Link to={"about"} onClick={() => setMenu('About') || setPhone(false)} className={menu === 'About' ? 'active' : ''}>About</Link>
          <Link to={"contact"} onClick={() => setMenu('Contact') || setPhone(false)} className={menu === 'Contact' ? 'active' : ''}>Contact</Link>

          <Link className='fsdfn' to={'/cart'}>
            <span className='fsdff'>Cart Shop <FaShoppingCart className="icon" /> </span>
          </Link>
          <Link className='fsdfn' to={'/favpro'}>
            <span className='fsdff'>My Fav <FaHeart className="icon" /> </span>
          </Link>
        </div>

        {/* SEARCH */}
        <div className="navSearchIcons">
          <div className="searchcontiner" style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Search products..."
              className="searchInput"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setShowResults(true); }}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
            />
            <FaSearch className="searchIcon" />

            {showResults && searchResults.length > 0 && (
              <div className="search-dropdown">
                {searchResults.slice(0, 5).map((item) => (
                  <div key={item.id} className="search-item" onClick={() => { navigate(`/${item.category}`); setSearchTerm(""); setShowResults(false); }}>
                    <img src={item.image} alt={item.title} />
                    <span>{item.title}</span>
                  </div>
                ))}
              </div>
            )}

            {showResults && searchTerm.length > 1 && searchResults.length === 0 && (
              <div className="search-dropdown no-results">No products found</div>
            )}
          </div>
        </div>

        {/* CART ICONS */}
        <div className="cart-icons">
          <div className="cartIcon">
            <Link to="/favpro">
              <FaHeart className="icon" />
              <span className={`cartCount ${amountFavortidis ? '' : 'sdeff'}`}>{amountFavortidis || ''}</span>
            </Link>
          </div>
          <div className="cartIcon">
            <Link to="/cart">
              <FaShoppingCart className="icon" />
              <span className={`cartCount ${amountcartidis ? '' : 'sdeff'}`}>{amountcartidis || ''}</span>
            </Link>
          </div>
            <div className="cartIcon2" ref={userMenuRef}>
            {userData ? (
              <div className="userAvatar" onClick={() => setMenu(menu === 'drobdown' ? '' : 'drobdown')}>
                {userData.firstName && userData.lastName
                  ? `${userData.firstName[0]}${userData.lastName[0]}`.toUpperCase()
                  : userData.firstName
                    ? userData.firstName[0].toUpperCase()
                    : "U"}
              </div>
            ) : (
              <FaUser className="icon" onClick={() => setMenu(menu === 'drobdown' ? '' : 'drobdown')} />
            )}

            {menu === 'drobdown' && (
              !userData ? (
                <div className="drop-user">
                  <Link to={"login"} className="dropdown-item"><LuLogIn /> Login </Link>
                  <Link to={"register"} className="dropdown-item"><IoMdPersonAdd /> Register </Link>
                </div>
              ) : (
                <div className="drop-user">
                  <Link to={"profile"} className="dropdown-item"><FaUser /> Profile </Link>
                  <Link to={"orders"} className="dropdown-item"><MdFireplace /> Orders </Link>
                  <button onClick={handleLogout} className="dropdown-item logout-btn"><FaSignOutAlt /> Logout</button>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
