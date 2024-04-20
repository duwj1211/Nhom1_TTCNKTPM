import { BrowserRouter, Route, Routes } from "react-router-dom";

import DefaultLayout from "./layouts/DefaultLayout";

//pages
import Home from "./pages/Home";
import LoginForm from "./pages/signIn";
import Cart from "./pages/Cart/Cart";
import CheckOut from "./pages/CheckOut/CheckOut";
import BookList from "./pages/BookList";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="" element={<DefaultLayout />}>
            <Route index element={<Home />} />
            <Route path="/signIn" index element={<LoginForm />} />
            <Route path="/Cart" index element={<Cart />} />
            <Route path="/CheckOut" index element={<CheckOut />} />
            <Route path="/AllBook" index element={<BookList />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
