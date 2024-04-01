var express = require('express');
var router = express.Router();


var Compositor = require ('../controllers/compositores')


router.get('/', function(req, res, next) {
    Compositor.list()
      .then(data => res.jsonp(data))
      .catch(e=> res.jsonp(e))
});

router.post('/', function(req, res, next) {
  console.log (req.body)
  Compositor.insert(req.body)
    .then(dados => res.jsonp(dados))
    .catch(e => res.jsonp(e))
});

router.put('/:id', function(req, res, next) {
  Compositor.update(req.params.id, req.body)
    .then(dados => res.jsonp(dados))
    .catch(e => res.jsonp(e))
});

router.delete('/:id', function(req, res, next) {
  Compositor.remove(req.params.id)
    .then(console.log("Deleted " + req.params.id))
    .catch(e => res.jsonp(e))
});

//router.get('/periodos/:per', function(req, res, next) {
//  var d = new Date().toISOString().substring(0, 16)
//  per = req.params.per
//  axios.get("http://localhost:3000/compositores?periodo="+per)
//    .then (resp=> {
//      res.status(200).render("compositoresListPage",{ "clist": resp.data,"d":d})
//    })
//    .catch (e => {
//      res.status(509).render("er", {"er":e})
//    })
//});
//
//router.get('/edit/:idCompositor', function(req, res, next) {
//  var d = new Date().toISOString().substring(0, 16)
//  var id = req.params.idCompositor
//  axios.get("http://localhost:3000/compositores/" + id)
//    .then (resp=> {
//      comp = resp.data
//      res.status(200).render("compositoresFormEditPage",{ "comp": comp,"d":d})
//    })
//    .catch (e => {
//      res.status(504).render("er", {"er":e})
//    })
//});
//
//
//router.post('/edit/:idCompositor', function(req, res, next) {
//  var d = new Date().toISOString().substring(0, 16)
//  var comp = req.body
//  axios.put("http://localhost:3000/compositores/" + comp.id, comp)
//    .then (resp=> {
//      res.redirect("/")})
//    .catch (e => {
//      res.status(505).render("er", {"er":e})
//    })
//});
//
//
//router.get('/registo', function(req, res, next) {
//  var d = new Date().toISOString().substring(0, 16)
//  res.status(200).render("compositoresFormPage",
//      { "title":"Compositor Form","d": d})
//});
//
//router.post('/registo', function(req, res, next) {
//  var d = new Date().toISOString().substring(0, 16)
//  result = req.body
//  axios.post("http://localhost:3000/compositores/" ,result)
//    .then ( resp => {
//        res.redirect("/")
//    })
//    .catch (e => {
//      res.status(502).render("er", {"er":e})
//    })
//});
//
//
//router.get('/delete/:idCompositor', function(req, res, next) {
//  var d = new Date().toISOString().substring(0, 16)
//  var id = req.params.idCompositor
//  axios.delete("http://localhost:3000/compositores/" + id)
//    .then (resp=> {
//      res.redirect("/")})
//    .catch (e => {
//      res.status(506).render("er", {"er":e})
//    })
//});
//
//



module.exports = router;
