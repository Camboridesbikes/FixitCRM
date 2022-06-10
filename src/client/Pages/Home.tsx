import * as React from 'react'
import { Link } from 'react-router-dom';
const Logo = require('../images/logo.svg');

import styles from '../styles/modules/home.module.scss'



class Home extends React.Component{

    componentDidMount() {
        document.title = "Home";
      }
    
    render(){
    return(
        <div style={{display: "flex", flexDirection: "column", alignContent: "center", width: "100%", margin: "auto", textAlign: "center"}}>
            <div className={styles.contentContainer}>
                <img src={Logo} width={"100%"}/>
                <h1>Portland-Based Mobile Bicycle Mechanic</h1>
                <a href="https://velotooler.com/mechanic-public/cameron.hattendorf">
                    <button 
                    className={styles.bookingButton}><p>Book on Velotooler</p></button>
                </a>
                <div style={{marginTop: "1.8em"}}>                    
                    <h3>cameron@fixmyvelo.com</h3>
                    <h3>(971) 666-5094</h3>
                </div>
            </div>            
        </div>
    )
    }
}

export default Home;