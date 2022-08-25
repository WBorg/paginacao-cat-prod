import React, {useState, useEffect} from 'react'
import api from '../../services/api';
import Table from 'react-bootstrap/Table'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link, useHistory } from 'react-router-dom'
import NavBar from '../../components/NavBar/NavBar'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import css from './listaUsuarios.module.css'



export const ListaUsuarios = () =>{

  const history = useHistory()
  const [data, setData] = useState([]);
  const [status, setStatus] = useState({
    type:'',
    mensagem: ''
  });

  const getUsers = async () =>{
    const headers = {
      'headers': {
        'Authorization' : 'Bearer ' +  localStorage.getItem('token')
      }
    }
    await api.get("/users/all", headers)
    .then((response)=>{
        setData(response.data.users)
    }).catch((error)=>{
      if(error.response){
        setStatus({
          type:'error',
          mensagem: error.response.data.mensagem
        })
      }else{
          setStatus({
            type:'error',
            mensagem: 'Erro: tente mais tarde'
          })
      }
    })
  }

  useEffect(()=>{
    getUsers()
  },[])

  async function handleDelete (id){
    const headers = {
      'headers': {
        'Authorization' : 'Bearer ' +  localStorage.getItem('token')
      }
    }
     await api.delete("/users/delete/"+id, headers)
     .then((response)=>{
      setStatus({
        type: 'success',
        mensagem: response.data.mensagem
      })
      console.log(status.mensagem)
      // return history.push("/usuarios")

    }).catch((err)=>{
      if(err.response){
        setStatus({
        type: 'erro',
        mensagem: err.response.data.mensagem
      })
      }else{
        setStatus({
          type: 'erro',
          mensagem: "Erro: Tente mais tarde"
        })
      }
      
      
    })
    getUsers()

      
  } 

  function confirmDelete(user){
    confirmAlert({
      title: 'Atenção!',
      message: `Tem certeza que deseja excluir ${user.name}?`,
      buttons: [
        {
          label: 'Sim',
          onClick: ()=> handleDelete(user.id)
        },
        {
          label: 'No'
          
        }
      ],
      closeOnClickOutside: false
    });
    
  };
  
    

  return(
    <>
      
      <NavBar/>
      <div className={css.header}>
        <h1>Lista de Usuários</h1>
        <Button variant="outline-success">
          <Link className={css.linkNavBar} to="/usuarios/novo">Novo Usuário</Link>
        </Button>
      </div>

      <Table striped bordered  size="sm" >
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>

                  {data.map(user => (
                    
                    // <div key={user.id}>
                    //     <div>{user.name}</div>
                    //     <div>{user.email}</div>
                    // </div>
                          <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td className={css.buttons}>
                              <Button variant="outline-warning" >
                                  <Link className={css.linkNavBar} to={"/usuarios/editar/"+user.id}>Editar</Link>
                              </Button>
                              <Button variant="outline-danger" onClick={() => confirmDelete(user)}>
                                  Excluir
                              </Button>
                            </td>
                          </tr>
                  )
                )}
            </tbody>
      </Table>

    </>

  )
}
              
        
        
            
             
            
        



 