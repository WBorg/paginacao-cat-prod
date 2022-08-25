import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'
import '../NavBar/listaUsuarios.css'
import { Context } from '../../Context/AuthContext'

import {useContext} from 'react'


function NavBar() {
  
  const {handleLogout}  = useContext(Context)

  
  
  return ( 
    <div >
      <Navbar className="ps-4" bg="dark" variant="dark">
        <Navbar.Brand href="#">MENU</Navbar.Brand>
          <Nav className="me-auto">
            {/* <Nav.Link href="#"><Link className="linkNavBar" to="/usuarios">Usuários</Link></Nav.Link> */}
            <Nav.Link href="#"><Link className="linkNavBar" to="/categorias">Categorias</Link></Nav.Link>
            <Nav.Link href="#"><Link className="linkNavBar" to="/produtos">Produtos</Link></Nav.Link>
          </Nav>
          <Button className="me-4" variant="outline-warning" onClick={handleLogout}>Sair</Button>
      </Navbar>


    </div>
   );
}

export default NavBar;