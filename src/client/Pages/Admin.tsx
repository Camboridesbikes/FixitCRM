import { url } from 'inspector';
import * as React from 'react'
import { Outlet, Route, Routes, useParams, useRoutes } from 'react-router-dom';

import styles from '../styles/modules/admin.module.scss'

export type AdminProps = {
    children: React.ReactNode;
}

const Admin = () : JSX.Element => {

    let element = useRoutes([
        {
            path: "/",
            element: <><p>Dashboard </p><Outlet/></>,
            children: [
                {
                    path:"clients",
                    element: <p>Client</p>
                }
            ]

        }
    ])
    
    return(
        <div className={styles.Admin}>
            <div className={styles.NavPanel}></div>
            <div className={styles.AdminBody}>
                <Routes>
                    <Route path="/" element={<span>Dashboard</span>}/>
                    <Route path="clients" element={<span>Clients</span>}/>
                    <Route path="clients/:search" element={<Clients/>}/>
                    <Route path="client/:id" element={<span>Clients</span>}/>
                    <Route path="bicycles" element={<span>Clients</span>}/>
                    <Route path="reports" element={<span>Clients</span>}/>
                </Routes>
            </div>
        </div>
    )
}

const Clients = () : JSX.Element => {
    const params = useParams();
    return <h1>Client: {params.search}</h1>;
}

export default Admin;