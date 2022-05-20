import React from 'react'
import {createRoot} from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';

import Admin from './Pages/Admin';




const App = () : JSX.Element => {
    return (
        <h1>Hello World</h1>
    );
}

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
        <CssBaseline enableColorScheme/>
        <Router>
            <Routes>   
                <Route path='*' element={<NotFound/>}/>         
                <Route path="/" element={<App/>}>                                       
                </Route>   
                <Route path='/login' element={<span>login</span>}/>
                <Route path='/admin' element={<Admin/>}>

                </Route>          
            </Routes>
        </Router>
        </>
    );
}