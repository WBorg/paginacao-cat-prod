import React, { useState, useEffect } from "react";
import api from '../../services/api';
import { useHistory } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const initialValue = {
    name: '',
    description: '',
    quantity: 0,
    price: 0,
    categorieId: ''

}






function ProdutosForm(props) {
  
  
  const [id] = useState(props.match.params.id)
  const history = useHistory()
  const [product, setProduct] = useState(initialValue)
  const [categories, setCategories] = useState([])
  const [acao, setAcao] = useState("Novo")
  const [status, setStatus] = useState({
    type: '',
    mensagem: '',
    loading: false
    
  })
  

  const valorInput = e => setProduct({
    ...product,
    [e.target.name] : e.target.value

  })

  const valorSelect = e => setProduct({
    ...product,
    [e.target.name] : e.target.value
  })

  useEffect(()=>{
    const getProduct= async () =>{
      const headers = {
        'headers': {
          'Authorization' : 'Bearer ' +  localStorage.getItem('token'),
          'Content-Type' : 'application/json'
        }
      }
      await api.get("/products/show/"+id, headers)
      .then((response)=>{
          if(response.data.products){
            setProduct(response.data.products)
            console.log(response.data)
            setAcao('Editar')
          }else{
            setStatus({
              type: 'warning',
              mensagem: 'Produto não encontrado'
            })
          }
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
  
    
    if(id) getProduct()

  }, [id])
/************************************************************************************** */
  const getCategories = async () =>{
    const headers = {
      'headers': {
        'Authorization' : 'Bearer ' +  localStorage.getItem('token')
      }
    }
    await api.get("/categories/all", headers)
    .then((response)=>{
        setCategories(response.data.categories)
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
    
  },[])

  const formSubmit = async e =>{
    e.preventDefault()
    setStatus({loading: true})

    const headers = {
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }

    if(!id){
      await api.post("/products/create", product, headers)
      .then((response) =>{
          console.log(response)
          setStatus({
            type: 'success',
            mensagem: response.data.mensagem,
            loading: false
          })
          return history.push("/produtos")
      }).catch((err)=>{
        if(err.response){
          setStatus({
            type: 'error',
            mensagem: err.response.data.mensagem,
            loading: false
          })
        }else{
          setStatus({
            type: 'error',
            mensagem: 'Erro: tente mais tarde',
            loading: false
          })
        }
  
      })
    }else{
      await api.put("/products/update", product, headers)
    .then((response) =>{
        console.log(response)
        setStatus({
          type: 'success',
          mensagem: response.data.mensagem,
          loading: false
        })
        return history.push("/produtos")
    }).catch((err)=>{
      if(err.response){
        setStatus({
          type: 'error',
          mensagem: err.response.data.mensagem,
          loading: false
        })
      }else{
        setStatus({
          type: 'error',
          mensagem: 'Erro: tente mais tarde',
          loading: false
        })
      }

    })

  }
}
  
  
  
  
  
  return ( 
    
    <Container>
    <h1>{acao} Produto</h1>
    <Form onSubmit={formSubmit} className="borderForm">
        {status.type == 'error' ? <Alert size="big" variant="danger"><p>{status.mensagem}</p></Alert> : ""} 
        {status.type == 'success' ? <Alert variant="success"><p>{status.mensagem}</p> </Alert> : ""}

        {status.loading ? <p>Validando...</p> : ""}
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Nome do Produto</Form.Label>
          <Form.Control type="text" name="name" value={product.name} placeholder="digite o nome do produto" onChange={valorInput} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Descrição</Form.Label>
          <Form.Control type="text" name="description" value={product.description} placeholder="descrição do produto" onChange={valorInput} />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Quantidade</Form.Label>
          <Form.Control type="number" name="quantity" value={product.quantity} onChange={valorInput} />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Preço</Form.Label>
          <Form.Control type="number" name="price" value={product.price} onChange={valorInput} />
        </Form.Group>

        <Form.Select aria-label="categorieId" 
                    name="categorieId"
                    onChange={valorSelect} value={product.categorieId}>
                        <option>Selecione uma Categoria</option>
                        {categories.map(categorie => (
                            <option key={categorie.id} value={categorie.id}>{categorie.name}</option>
                        ))}
        </Form.Select>
        
        {status.loading 
        ? <Button variant="primary" type="submit" disabled className="mt-3">Enviando... </Button>
        : <Button variant="primary" type="submit"  className="mt-3">Enviar </Button> 
        }
          
       
      </Form>
    </Container>


   );
}

export default ProdutosForm;