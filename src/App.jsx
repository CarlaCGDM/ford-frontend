import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";


import Home from './Pages/Home.jsx'
import Admin from './Pages/Admin.jsx'

export default function App() {
  return <>

    <Router>
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/admin" element={<Admin />}></Route>
        </Routes>
    </Router>
  </>
}

