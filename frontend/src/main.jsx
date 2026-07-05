import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import "swiper/css";
// import "swiper/swiper-bundle.css";
import App from './App.jsx'
import { StoreContextProvider } from './context/StoreContext.jsx'
import { DisplayContextProvider } from './context/DisplayContexet.jsx';
import { FavContextProvider } from './context/FavProContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DisplayContextProvider>
      <StoreContextProvider>
        <FavContextProvider>
          <App />
        </FavContextProvider>
      </StoreContextProvider>
    </DisplayContextProvider>
  </StrictMode>
)
