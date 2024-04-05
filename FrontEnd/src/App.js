import { BrowserRouter, Route, Routes } from 'react-router-dom';

import DefaultLayout from "./layouts/DefaultLayout";

//pages
import Home from "./pages/Home";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
        <Route path='' element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path='cart' element={<Home />} />
        </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
