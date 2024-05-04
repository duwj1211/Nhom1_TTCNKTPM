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
          <Route path="/SignIn" index element={<SignIn />} />
          <Route path="/SignUp" index element={<SignUp />} />
          <Route path="/Cart"  index element={<Cart/>}/>
          <Route path="/CheckOut" index element={<CheckOut/>}/>
          <Route path="/BookDetails/:slug" exact element={<BookDetails />}/>
          <Route path="/AllBook" index element={<BookList />} />
        </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
