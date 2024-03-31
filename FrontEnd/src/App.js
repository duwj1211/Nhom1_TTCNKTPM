import { BrowserRouter, Route, Routes } from 'react-router-dom';

import DefaultLayout from "./layouts/DefaultLayout";

//pages
import Home from "./pages/Home";
import SignIn from "./pages/signIn";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
        <Route path='' element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route index element={<SignIn/>}/>
        </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
