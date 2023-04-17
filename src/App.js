import { useReducer } from 'react';
import './App.css';
import Layout from './Components/Layout';
import { reducer } from './global/reducer';
import Context, { storeInit } from './global/store';
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import NoPage from './Components/NoPage';
import Cart from './Components/Cart';
import ProductPage from './Components/ProductPage';
import Home from './Components/Home';
import Checkout from './Components/Checkout';
import Search from './Components/Search';
import ProductsList from './Components/ProductsList';

function App() {
  const [store, dispatch] = useReducer(reducer, storeInit)
  return (
    <Context.Provider value={{ store, dispatch }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Layout}>
            <Route index Component={Home} />
            <Route path="Cart" Component={Cart} />
            <Route path="Product/:proId" Component={ProductPage} />
            <Route path="Checkout/:uid" Component={Checkout} />
            <Route path="Search" Component={Search} />
            <Route path="Group" Component={ProductsList} />
          </Route>
          <Route path="*" Component={NoPage} />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
