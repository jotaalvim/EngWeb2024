var express = require('express');
var router = express.Router();
var Pessoa = require ('../controllers/alunos')


router.get('/', function(req, res, next) {
  Pessoa.listModalidades()
    .then(data => res.jsonp(data))
    .catch(e=> res.jsonp(e))
});




router.get('/:id', function(req, res, next) {
    Pessoa.listPessoasbyModalidaes(req.params.id)
      .then(data => res.jsonp(data))
      .catch(e=> res.jsonp(e))
  });
  
  

module.exports = router;
