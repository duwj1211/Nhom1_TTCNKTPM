import { BrowserRouter, Route, Routes } from "react-router-dom";

import DefaultLayout from "./layouts/DefaultLayout";

//pages
import Home from "./pages/Home";
import Cart from "./pages/Cart/Cart";
import CheckOut from "./pages/CheckOut/CheckOut";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import BookDetails from "./pages/BookDetails";
import BookList from "./pages/BookList";
import OrderList from "./pages/Order/orderList";
import Profile from "./pages/Profile";
import OrderDetail from "./pages/Order/orderDetail";
import AuthorList from "./pages/AuthorList";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="" element={<DefaultLayout />}>
            <Route index element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/detail/:slug" exact element={<BookDetails />} />
            <Route path="/books" element={<BookList />} />
            <Route path="/category/:cate" element={<BookList />} />
            <Route path="/order" element={<OrderList />} />
            <Route path="/account" element={<Profile />} />
            <Route path="/order/detail/:orderId" element={<OrderDetail />} />
            <Route path="/authors" element={<AuthorList />} />
          </Route>

          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
