import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Product from "./Pages/Product";
import Homepage from "./Pages/Homepage";
import Pricing from "./Pages/Pricing";
import PageNotFound from "./Pages/PageNotFound";
import AppLayout from "./Pages/AppLayout";
import Login from "./Pages/Login";
import CityList from "./Components/CityList";
import City from "./Components/City";
import CountryList from "./Components/CountryList";
import Form from "./Components/Form";


const BASE_URL = 'http://localhost:8001' 

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(function(){
    async function fetchCities(){
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()
        setCities(data)

      } catch (error) {

        alert("ops something went wrong")

      }finally {
        setIsLoading(false)
      }

    }
    fetchCities()
  },[])


  return <BrowserRouter>
    <Routes>
      <Route index element={<Homepage />} />
      <Route path="product" element={<Product />} />
      <Route path="pricing" element={<Pricing />} />
      <Route path="login" element={<Login />} />
      <Route path="app" element={<AppLayout />} >
        <Route index element={<CityList cities={cities} isLoading={isLoading} />} />
        <Route path="cities" element={<CityList cities={cities} isLoading={isLoading} />} />
        <Route path="cities/:id" element={<City />} />
        <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading} />} />
        <Route path="form" element={<Form />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </BrowserRouter>;
}

export default App;
