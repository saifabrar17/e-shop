import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Notfind from "./pages/notfind/Notfind";
import Navbar from "./components/shared/navbar/Navbar";

import AuthProvider from "./contex/AuthProvider";

import PrivateRoute from "./components/authentication/privateroute/PrivateRoute";

import Payment from "./pages/payment/Payment";

import DashBoard from "./pages/dashboard/DashBoard";
import Temp from "./pages/home/hotDeals/card/Temp";
import React, { Suspense } from "react";
import ConfirmOrder from "./pages/order/confirmOrder/ConfirmOrder";

const Products = React.lazy(() => import("./pages/products/Products"));
const ProductDetails = React.lazy(() => import("./pages/products/productDetails/ProductDetails"));
const BuyProduct = React.lazy(() => import("./pages/products/buyProduct/BuyProduct"));
const ProductOrder = React.lazy(() => import("./pages/products/productOrder/ProductOrder"));


function App() {
  // useEffect(() => {
  //   const { token } = localStorage.getItem("accessToken");
  //   if (token) {
  //     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  //   }
  // }, [])

  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Navbar></Navbar>

          <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/home" element={<Home />} />

            
              {/* <Route path="/products" element={<Products />}>
                <Route path=":findItem" element={<Products />} />
              </Route> */}

              {/* <Route path="/shoppingcart" element={<ProductOrder />} />

              <Route path="/buyproduct/:id" element={<BuyProduct />} /> */}

              {/* <Route
                path="/confirmorder"
                element={
                  <PrivateRoute>
                    <ConfirmOrder />
                  </PrivateRoute>
                }
              /> */}

              {/* <Route path="/productdetails/:id" element={<ProductDetails />} /> */}
              {/* <Route
                path="/productorder/:id"
                element={
                  <PrivateRoute>
                    {" "}
                    <ProductOrder />{" "}
                  </PrivateRoute>
                }
              /> */}
            

            <Route path="/temp" element={<Temp />} />

            {/* <Route
              path="dashboard/*"
              element={
                <PrivateRoute>
                  <DashBoard />
                </PrivateRoute>
              }
            /> */}

            {/* <Route
              path="/payment"
              element={
                <PrivateRoute>
                  <Payment />
                </PrivateRoute>
              }
            >
              <Route path=":id" element={ <PrivateRoute> <Payment /></PrivateRoute>}
              />
            </Route> */}

            <Route exact path="/" element={<Home />} />
            <Route path="*" element={<Notfind />} />
          </Routes>
          </Suspense>
          {/* <Footer></Footer> */}
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
