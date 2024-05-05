import { BrowserRouter, Route, Routes } from "react-router-dom";

import DefaultLayout from "./layouts/DefaultLayout";

//pages
import Home from "./pages/Home";
import Cart from './pages/Cart/Cart';
import CheckOut from './pages/CheckOut/CheckOut';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import BookDetails from './pages/BookDetails';
import BookList from "./pages/BookList";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
        <Route path='' element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/checkout" element={<CheckOut/>}/>
          <Route path="/detail/:slug" exact element={<BookDetails />}/>
          <Route path="/books" element={<BookList />} />
          <Route path="/category/:cate" element={<BookList />} />
        </Route>
        
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
