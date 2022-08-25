import React, {useContext, useState, useRef} from "react";
import { Context } from '../../Context/AuthContext'
import NavBar from "../../components/NavBar/NavBar";
import  css from  './dashboard.module.css';
// import { Dashboard } from './../../../../system-mercado/src/page/Dashboard/index';


export const Dashboard = () =>{

  const token = localStorage.getItem("token");
  const { authenticated,handleLogout}  = useContext(Context)

  console.log(`Situação do usuário na página Login: ${authenticated}`)
  /**************************************** */
  
/************************************************* */

  return(
    <div>
      <NavBar/>
      <button type="button" onClick={handleLogout}>Sair</button>
    </div>
  )
}
        

