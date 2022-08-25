import React, {useState, useEffect} from 'react'
import api from '../../services/api';
import { Link, useHistory } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import css from '../Categorias/listaCategorias.module.css'
import NavBar from '../../components/NavBar/NavBar';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';


export function ListaProdutos(){

  const history = useHistory()
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(''); 
  const [status, setStatus] = useState({
    type:'',
    mensagem: ''
  })

  const filteredData = search.length > 0
  ? data.filter((products)=> products.name.toLowerCase().includes(search.toLocaleLowerCase()))
  : []

  const getProducts = async () =>{
    const headers = {
      'headers': {
        'Authorization' : 'Bearer ' +  localStorage.getItem('token')
      }
    }
    await api.get("/products/all", headers)
    .then((response)=>{
        setData(response.data.products)
        console.log(response.data.products)
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
    getProducts()
    
  },[])

  
  async function handleDelete (id){
    const headers = {
      'headers': {
        'Authorization' : 'Bearer ' +  localStorage.getItem('token')
      }
    }
     await api.delete("/products/delete/"+id, headers)
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
    getProducts()

  }

  function confirmDelete(product){
    confirmAlert({
      title: 'Atenção!',
      message: `Tem certeza que deseja excluir a categoria ${product.name}?`,
      buttons: [
        {
          label: 'Sim',
          onClick: ()=> handleDelete(product.id)
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
        <h1>Lista de Produtos</h1>
        <input className={css.search} type="text" placeholder="Buscar..." onChange={ e => setSearch(e.target.value) } />
        <Button variant="success">
            <Link className={css.linkNavBar} to="/produtos/novo">Novo Produto</Link>
        </Button>
      </div>
      <div className={css.table}>
        <Table   size="sm">
            <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nome</th>
                      <th>Descrição</th>
                      <th>Quantidade</th>
                      <th>Preço</th>
                      <th>categoria</th>
                      <th>Opções</th>
                    </tr>
            </thead>
            <tbody>
            {search.length > 0 ? (

                filteredData.map(product => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.quantity}</td>
                    <td>{product.price}</td>
                    <td>{product.willy_category.name}</td>
                    <td className={css.buttons}>
                      <Button variant="warning" >
                          <Link className={css.linkNavBar} to={"/produtos/editar/"+product.id}>Editar</Link>
                      </Button>
                      <Button variant="danger" onClick={() => confirmDelete(categorie)}>
                          Excluir
                      </Button>
                    </td>
                  </tr>
                      )
                    )


            ):(

              data.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.quantity}</td>
                  <td>{product.price}</td>
                  <td>{product.willy_category.name}</td>

                  <td className={css.buttons}>
                    <Button variant="warning" >
                        <Link className={css.linkNavBar} to={"/produtos/editar/"+product.id}>Editar</Link>
                    </Button>
                    <Button variant="danger" onClick={() => confirmDelete(product)}>
                        Excluir
                    </Button>
                  </td>
                </tr>
                    )
                  )

            )}
            </tbody>
        </Table>
      </div>


    </>
  )


  
}










