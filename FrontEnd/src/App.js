import { BrowserRouter, Route, Routes } from 'react-router-dom';

import DefaultLayout from "./layouts/DefaultLayout";

//pages
import Home from "./pages/Home";
import LoginForm from './pages/signIn';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
        <Route path='' element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path='cart' element={<Home />} />
          <Route path="/signIn" index element={<LoginForm/>}/>
        </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
