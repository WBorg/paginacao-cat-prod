import React, {useState, useContext} from 'react';
import Container from 'react-bootstrap/container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import './styles.css';
import api from '../../services/api';
import {Eye, EyeSlash} from 'phosphor-react';
import {useHistory} from 'react-router-dom';

import { Context } from '../../Context/AuthContext'

export function Login(){

  const history = useHistory();

  const { authenticated, signIn } = useContext(Context);
  
  console.log(`Situação do usuário na página Login: ${authenticated}`)

  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const [status, setStatus] = useState({
    type: '',
    mensagem: '',
    loading: false
  })

  const [pass, setPass] = useState('password')
  
  /*funcao para alternar visualizacao da senha*/
  const changeIcon = ()=>{
    {pass == 'password' ? setPass('text') : setPass('password')}
  }

  /* change dos imputs*/
  const valorInput = e => setUser({
    ...user,
    [e.target.name] : e.target.value
  })

  /* submissao do form */
  const loginSubmit = async e => {
    e.preventDefault();
    // console.log(user.email);
    // console.log(user.password);
    const headers = {
      'Content-Type': 'application/json'
    }
    setStatus({
      loading: true
    })
    await api.post("/users/login", user, {headers})
    .then((response)=>{
       console.log(response)
      setStatus({
        type: 'success',
        mensagem: response.data.mensagem,
        loading: false
      })
      localStorage.setItem('token', response.data.token)
      signIn(true)
      return history.push('/dashboard');
      
    }).catch((err)=>{
       console.log(err)
      
      setStatus({
        type: 'error',
        mensagem: 'Erro: tente mais tarde',
        loading: false
      })
      if(err.response){
        //  console.log(err)
        setStatus({
          type: 'error',
          mensagem: err.response.data.mensagem,
          loading: false
        })
      }
      
        

  })
}

  

  return(
    <>
      <Container className="box">
          <Form onSubmit={loginSubmit} className="borderForm">
          {status.type == 'error' ? <Alert size="big" variant="danger"><p>{status.mensagem}</p></Alert> : ""} 
          {status.type == 'success' ? <Alert variant="success"><p>{status.mensagem}</p> </Alert> : ""}
          {status.loading ? <p>Validando...</p> : ""}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>E-mail:</Form.Label>
            <Form.Control type="email" name="email" placeholder="Digite seu e-mail" onChange={valorInput} />
            <Form.Text className="text-muted">
              Nunca compartilharemos seu e-mail com outra pessoa.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Senha:</Form.Label>
            <div className="password">
              <Form.Control type={pass} name="password" placeholder="Digite sua senha" onChange={valorInput} />
              <button type="button" className="view-password" onClick={changeIcon}>
                {pass == "password" ? <EyeSlash size={28} /> : <Eye size={28}/> }
              </button>
               
            </div>
            
          </Form.Group>
          {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group> */}
          {status.loading 
          ? <Button variant="primary" type="submit" disabled>Acessando... </Button>
          : <Button variant="primary" type="submit">Enviar </Button> 
          }
            
         
        </Form>

      </Container>
    </>
  )

  }