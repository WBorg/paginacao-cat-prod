import {Button} from 'react-bootstrap'


export function Pagination({page,reg, lastPage, getItens}){

  return(
    <>
        {
          page != 1 
          ? <Button type="button" variant="secondary"  onClick={()=> getItens(1,reg)}>Primeira</Button>
          : ""
        } {" "}
        
        {/* antes da página que o usuário está */}
        {
          page - 1 > 1
          ? <Button type="button" variant="secondary"  onClick={()=> getItens(page - 1 ,reg)}>{page -1}</Button>
          : ""
        } {" "}


        {/* página atual */}
        <Button type="button" size="lg" disabled>{page}</Button>{" "}
        
        {/* depois da página que o usuário está */}
        {
          page +1  < lastPage  
          ? <Button type="button" variant="secondary"  onClick={()=> getItens(page + 1,reg )}>{page +1}</Button>
          : ""
        } {" "}
        
        
        {/* ultima página */}
        {page != lastPage 
        ? <Button type="button" variant="secondary"  onClick={()=> getItens(lastPage,reg)}>Última</Button>
        : ""
          
        }{` Página ${page} de ${lastPage}`}

    </>
  )
}