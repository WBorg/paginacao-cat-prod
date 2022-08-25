import React, {useContext, useState, useRef} from "react";
import { Context } from '../../Context/AuthContext'
import NavBar from "../../components/NavBar/NavBar";
import  css from  './dashboard.module.css';
// import { Dashboard } from './../../../../system-mercado/src/page/Dashboard/index';


export const Dashboard = () =>{

  const token = localStorage.getItem("token");
  

  /**************************************** */
  
/************************************************* */

  return(
    <>
      <NavBar/>
      <div className={css.center}>
        
          Painel de controle
        

      </div>
    </>
    
  )
}
        

