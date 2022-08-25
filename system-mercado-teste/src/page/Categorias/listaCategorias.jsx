import React, {useState, useEffect} from 'react'
import NavBar from '../../components/NavBar/NavBar'
import api from '../../services/api';
import Button from 'react-bootstrap/Button';
import { Link, useHistory } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Table from 'react-bootstrap/Table';
import css from './listaCategorias.module.css';
import { Pagination } from './../../components/Pagination/Pagination';









export function ListaCategorias(){

  const history = useHistory()
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState("");
  const [lastPage, setLastPage] = useState("")
  const [status, setStatus] = useState({
    type:'',
    mensagem: ''
  });

  
    const filteredData = search.length > 0
    ? data.filter((categorie)=> categorie.name.toLowerCase().includes(search.toLocaleLowerCase()))
    : []
  

  const getCategories = async (page) =>{

    if(page === undefined)  page = 1
    setPage(page)

    const headers = {
      'headers': {
        'Authorization' : 'Bearer ' +  localStorage.getItem('token')
      }
    }
    await api.get("/categories/all/pages/" + page, headers)
    .then((response)=>{
        setData(response.data.categories)
        setLastPage(response.data.lastPage)
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
    getCategories()
    console.log("effect")
    return () => console.log("Saiu")
    
  },[])

 

  async function handleDelete (id){
    const headers = {
      'headers': {
        'Authorization' : 'Bearer ' +  localStorage.getItem('token')
      }
    }
     await api.delete("/categories/delete/"+id, headers)
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
    getCategories()

      
  } 

  function confirmDelete(categorie){
    confirmAlert({
      title: 'Atenção!',
      message: `Tem certeza que deseja excluir a categoria ${categorie.name}?`,
      buttons: [
        {
          label: 'Sim',
          onClick: ()=> handleDelete(categorie.id)
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
      <NavBar />
      <div className={css.header}>
        <h1>Lista de Categorias</h1>
        <input className={css.search} type="text" placeholder="Buscar..." onChange={ e => setSearch(e.target.value) } />
        <Button variant="success">
            <Link className={css.linkNavBar} to="/categorias/novo">Nova Categoria</Link>
        </Button>
      </div>
      <div className={css.table}>
        <Table   size="sm">
            <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nome</th>
                      <th>Descrição</th>
                      <th>Opções</th>
                    </tr>
            </thead>
            <tbody>
            {search.length > 0 ? (

                filteredData.map(categorie => (
                  <tr key={categorie.id}>
                    <td>{categorie.id}</td>
                    <td>{categorie.name}</td>
                    <td>{categorie.description}</td>
                    <td className={css.buttons}>
                      <Button variant="warning" >
                          <Link className={css.linkNavBar} to={"/categorias/editar/"+categorie.id}>Editar</Link>
                      </Button>
                      <Button variant="danger" onClick={() => confirmDelete(categorie)}>
                          Excluir
                      </Button>
                    </td>
                  </tr>
                      )
                    )


            ):(

              data.map(categorie => (
                <tr key={categorie.id}>
                  <td>{categorie.id}</td>
                  <td>{categorie.name}</td>
                  <td>{categorie.description}</td>
                  <td className={css.buttons}>
                    <Button variant="warning" >
                        <Link className={css.linkNavBar} to={"/categorias/editar/"+categorie.id}>Editar</Link>
                    </Button>
                    <Button variant="danger" onClick={() => confirmDelete(categorie)}>
                        Excluir
                    </Button>
                  </td>
                </tr>
                    )
                  )

            )}
            </tbody>
        </Table>
        <Pagination page={page} lastPage={lastPage} getItens={getCategories}/>           

      </div>


    </>
  )
}