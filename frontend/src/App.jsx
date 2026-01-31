import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";
import LotyHendeler from "./common/lotyhndler/Lotyhndler";
import { Suspense } from "react";
import { Toaster } from 'react-hot-toast';
import Fashon from "./pasgs/fashon/Fashon";
import LifeSt from "./pasgs/lifest/LifeSt";
import Elctronic from "./pasgs/elctronic/Elctronic";
import Product from "./common/product/Product";
import Login from "./pasgs/login/Login";
import Register from "./pasgs/register/Register";
import Profile from "./pasgs/profile/Profile";
import FavPro from "./pasgs/favpro/FavPro";
import Deals from "./common/deals/Deals";
import Contact from "./common/contact/Contact";
import About from "./common/about/About";
import Orders from "./pasgs/placeorder/Orders";
import ProtectedRoute from "./components/ProtectedRoute";


const Home = lazy(() => import("./pasgs/home/Home"))
const Cart = lazy(() => import("./pasgs/cart/Cart"))
const Layout = lazy(() => import("./layout/Layout"))



function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: (
        <Suspense fallback={<LotyHendeler status={'main'} />}>
          <Layout />
        </Suspense>


      ),
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<LotyHendeler status={'normal'} />}>
              <Home />
            </Suspense>

          )
        },
        { path: 'cart', element: (<Suspense fallback={<LotyHendeler status={'normal'} />}> <Cart /> </Suspense>) },
        { path: 'fashion', element: (<Suspense fallback={<LotyHendeler status={'normal'} />}> <Fashon /> </Suspense>) },
        { path: 'Jewelry', element: (<Suspense fallback={<LotyHendeler status={'normal'} />}> <LifeSt /> </Suspense>) },
        { path: 'Electronics', element: (<Suspense fallback={<LotyHendeler status={'normal'} />}> <Elctronic /> </Suspense>) },

        { path: 'product', element: (<Suspense fallback={<LotyHendeler status={'normal'} />}> <Product /> </Suspense>) },
        { path: 'login', element: (<Suspense fallback={<LotyHendeler status={'normal'} />}> <Login /> </Suspense>) },
        { path: 'register', element: (<Suspense fallback={<LotyHendeler status={'normal'} />}> <Register /> </Suspense>) },
        { path: 'profile', element: (<Suspense fallback={<LotyHendeler status={'normal'} />}> <Profile /> </Suspense>) },
        { path: 'favpro', element: (<Suspense fallback={<LotyHendeler status={'normal'} />}> <FavPro /> </Suspense>) }
        ,
        { path: 'deals', element: (<Suspense fallback={<LotyHendeler status={'normal'} />}> <Deals /> </Suspense>) }
        ,
        { path: 'about', element: (<Suspense fallback={<LotyHendeler status={'normal'} />}> <About /> </Suspense>) }
        ,
        { path: 'contact', element: (<Suspense fallback={<LotyHendeler status={'normal'} />}> <Contact /> </Suspense>) }
        ,
         { 
           path: 'orders', 
           element: (
             <ProtectedRoute>
               <Suspense fallback={<LotyHendeler status={'normal'} />}>
                 <Orders />
               </Suspense>
             </ProtectedRoute>
           ) 
         }


      ]
      , errorElement: <LotyHendeler status="error" />
    }

  ])

  return <>
    <RouterProvider router={router} />
    <Toaster />
  </>

}

export default App