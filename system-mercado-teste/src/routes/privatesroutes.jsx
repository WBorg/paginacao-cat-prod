import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { Dashboard } from '../page/Dashboard/index'
import { Login } from '../components/Login/Login'
// import { ListaUsuarios } from '../page/Usuarios/listaUsuarios'
// import { UsuariosForm } from '../page/UsuariosForm/UsuariosForm'
import { ListaCategorias } from '../page/Categorias/listaCategorias'
import  CategoriasForm  from '../page/CategoriasForm/CategoriasForm'
import ProdutosForm from '../page/ProdutosForm/ProdutosForm'
import {ListaProdutos} from '../page/Produtos/listaProdutos'
import { Context } from '../Context/AuthContext'






function CustomRoute({isPrivate, ...rest}){
  const { authenticated} = useContext(Context)
  if(isPrivate && !authenticated){
    return <Redirect to="/" />
  }

  return <Route { ...rest} />

}

export default function PrivateRoute(){

  return(

    <Switch>
      <CustomRoute exact path="/" component={Login}/>
      <CustomRoute isPrivate path="/dashboard" component={Dashboard}/>
      {/* <CustomRoute isPrivate path="/usuarios/novo" component={UsuariosForm}/> */}
      {/* <CustomRoute isPrivate path="/usuarios/editar/:id" component={UsuariosForm}/> */}
      {/* <CustomRoute isPrivate path="/usuarios" component={ListaUsuarios}/> */}
      <CustomRoute isPrivate path="/categorias/novo" component={CategoriasForm}/>
      <CustomRoute isPrivate  path="/categorias/editar/:id" component={CategoriasForm}/>
      <CustomRoute isPrivate  path="/categorias" component={ListaCategorias}/>
      
      <CustomRoute isPrivate path="/produtos/novo" component={ProdutosForm}/>
      <CustomRoute isPrivate  path="/produtos/editar/:id" component={ProdutosForm}/>
      <CustomRoute isPrivate  path="/produtos" component={ListaProdutos}/>


    </Switch>

    
  )
}