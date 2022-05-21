import React from 'react'
import {createRoot} from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import './Styles/globals.scss';

import Admin from './Pages/Admin';
import Home from "./Pages/Home";

const NotFound = () : JSX.Element => {
    return (
        <h1>404</h1>
    );
}

const rootElement = document.getElementById("root");

if(rootElement != null){
    const root = createRoot(rootElement);

    root.render(
        <>
        <Router>
            <Routes>   
                <Route path='*' element={<NotFound/>}/>         
                <Route path="/" element={<Home/>}>                                       
                </Route>   
                <Route path='/login' element={<span>login</span>}/>
                <Route path='/admin' element={<Admin/>}>

                </Route>          
            </Routes>
        </Router>
        </>
    );
}