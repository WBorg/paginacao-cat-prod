import React, { useState , useEffect } from "react"
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import api from '../../services/api'
import { Link , useHistory } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import '../../components/Login/styles.css';


const initialValue = {
  name: '',
  description: '',
}


const CategoriasForm = (props) => {
 
  const [id] = useState(props.match.params.id)
  const history = useHistory()
  const [values, setValues] = useState(initialValue)
  const [acao, setAcao] = useState("Nova")
  const [status, setStatus] = useState({
    type: '',
    mensagem: '',
    loading: false
    
  })

  const valorInput = e => setValues({
    ...values,
    [e.target.name] : e.target.value

  })

  useEffect(()=>{
    const getCategories = async () =>{
      const headers = {
        'headers': {
          'Authorization' : 'Bearer ' +  localStorage.getItem('token'),
          'Content-Type' : 'application/json'
        }
      }
      await api.get("/categories/show/"+id, headers)
      .then((response)=>{
          if(response.data.categories){
            setValues(response.data.categories)
            setAcao('Editar')
          }else{
            setStatus({
              type: 'warning',
              mensagem: 'Categoria não encontrada'
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
  
    
    if(id) getCategories()

  }, [id])

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
      await api.post("/categories/create", values, headers)
      .then((response) =>{
          console.log(response)
          setStatus({
            type: 'success',
            mensagem: response.data.mensagem,
            loading: false
          })
          return history.push("/categorias")
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
      await api.put("/categories/update", values, headers)
    .then((response) =>{
        console.log(response)
        setStatus({
          type: 'success',
          mensagem: response.data.mensagem,
          loading: false
        })
        return history.push("/categorias")
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

    

    
 
 
 
 
 return ( <>
  
  <Container>
      <h1>{acao} Categoria</h1>
      <Form onSubmit={formSubmit} className="borderForm">
          {status.type == 'error' ? <Alert size="big" variant="danger"><p>{status.mensagem}</p></Alert> : ""} 
          {status.type == 'success' ? <Alert variant="success"><p>{status.mensagem}</p> </Alert> : ""}
          {status.loading ? <p>Validando...</p> : ""}
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Nome da Categoria</Form.Label>
            <Form.Control type="text" name="name" value={values.name} placeholder="digite o nome da categoria" onChange={valorInput} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Descrição</Form.Label>
            <Form.Control type="text" name="description" value={values.description} placeholder="descrição da categoria" onChange={valorInput} />
          </Form.Group>
          
          {status.loading 
          ? <Button variant="primary" type="submit" disabled>Enviando... </Button>
          : <Button variant="primary" type="submit">Enviar </Button> 
          }
            
         
        </Form>
      </Container>
  
          </> 
  );
}
 
export default CategoriasForm;