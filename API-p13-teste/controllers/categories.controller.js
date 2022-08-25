const Categories = require('../models/Categories');

/***************************************************************************************** */
exports.create =  async(req, res) =>{
  var dados = req.body;


  await Categories.create(dados)
  .then(()=>{
    return res.json({
      erro: false,
      mensagem: 'Categoria inserida com sucesso!'
    });
  }).catch((err)=>{
    return res.status(400).json({
      erro:true,
      mensagem: `Erro: Categoria não encontrada... ${err}`
    })
  })
}
/************************************************************************** */

exports.findAll = async(req,res)=>{
  await Categories.findAll({
    attributes: ['id','name','description'],
    order: [['id', 'ASC']]

  })
  .then((categories) => {
    return res.json({
      erro: false,
      categories
    });
  }).catch((err) => {
    return res.status(400).json({
      erro : true,
      mensagem: `Erro ${err} ou nenhuma categoria encontrada!!!`
    })
  })
}
/****************************************************************************** */
exports.findAllPages = async(req,res)=>{
  console.log(req.params)
  const {page = 1} = req.params
  const limit = 5
  let lastPage = 1

  const countCategories = await Categories.count()
  console.log(countCategories)

  if(countCategories === null){
    return res.status(400).json({
      erro : true,
      mensagem: "Error: Categorias não encontrada"
    })
  }
  else{
    lastPage = Math.ceil((countCategories / limit))
    console.log(lastPage)
  }
  // 
  ///Exemplo:
  // pag 1 = 1,2
  // pag 2 = 2,3
  // pag 3 = 3,4

  await Categories.findAll({
    attributes: ['id','name','description'],
    order: [['id', 'ASC']],
    offset: Number((page * limit) - limit),
    limit : limit

  })
  .then((categories) => {
    return res.json({
      erro: false,
      categories,
      countCategories,
      lastPage
    });
  }).catch((err) => {
    return res.status(400).json({
      erro : true,
      mensagem: `Erro ${err} ou nenhuma categoria encontrada!!!`
    })
  })
}
/****************************************************************************************************** */
exports.update = async(req,res)=>{
  const {id} = req.body;

  await Categories.update(req.body, {where: {id}})
  .then(()=>{
    return res.json({
      erro: false,
      mensagem: "Categoria alterada com sucesso!"
    })
  }).catch((err)=>{
    return res.status(400).json({
      erro: true,
      mensagem: `Erro: Categoria não encontrada ...${err}`
    })
  })
}
/******************************************************************* */
exports.findOne = async (req, res) =>{
  const {id} = req.params;
  try{
    // await User.findAll({ where: {id: id}})
    const categories = await Categories.findByPk(id);
    if(!categories){
      return res.status(400).json({
        erro: true,
        mensagem: "Erro:Nenhuma categoria encontrada!"
      })
    }
    res.status(200).json({
      erro: false,
      categories
    })
  }catch(err){
    res.status(400).json({
      erro: true,
      mensagem: `Erro ${err}`
    })
  }
}
/******************************************************************* */


exports.delete =  async(req,res)=>{
  const {id} = req.params;
  await Categories.destroy({where: {id}})
  .then(()=>{
    return res.json({
      erro: false,
      mensagem: "Categoriea apagada com sucesso!"
    });
  }).catch((err)=>{
    return res.status(400).json({
      erro: true,
      mensagem: `Erro: ${err} Categoria não apagado...`
    })
  })
}










