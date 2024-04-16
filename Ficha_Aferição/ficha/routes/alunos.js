var express = require('express');
var router = express.Router();
var Pessoa = require ('../controllers/alunos')


router.get('/', function(req, res, next) {
  Pessoa.list()
    .then(data => res.jsonp(data))
    .catch(e=> res.jsonp(e))
});


router.post('/', function(req, res, next) {
  Pessoa.insert(req.body)
    .then(data => res.jsonp(data))
    .catch(e => res.jsonp(e))
});


router.put('/:id', function(req, res, next) {
  Pessoa.updateByName(req.params.id, req.body)
    .then(data => res.jsonp(data))
    .catch(e => res.jsonp(e))
});


router.delete('/:id', function(req, res, next) {
  Pessoa.deleteByName(req.params.id)
    .then(data => res.jsonp(data))
    .catch(e => res.jsonp(e))
});




module.exports = router;
