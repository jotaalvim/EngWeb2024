var express = require('express');
var router = express.Router();
var axios = require ('axios')

router.get('/', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get("http://localhost:3000/compositores?_sort=nome")
    .then (resp=> {
      c = resp.data
      res.status(200).render("compositoresListPage",
      { "title":"Compositores List", "clist": c,"d": d})
    })
    .catch (erro => {
      res.status(501).render("error", {"error":erro})
    })
});


router.get('/periodos', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get("http://localhost:3000/compositores/")
    .then (resp=> {
      var plist = []
      for (i in resp.data) {
        g = resp.data[i]["periodo"]
        if (!plist.includes(g)) {
            plist.push(g)    
        } 
      }

      res.status(200).render("periodos",{ "plist": plist,"d":d})
    })
    .catch (erro => {
      res.status(508).render("error", {"error":erro})
    })
});

router.get('/periodos/:per', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  per = req.params.per
  axios.get("http://localhost:3000/compositores?periodo="+per)
    .then (resp=> {
      res.status(200).render("compositoresListPage",{ "clist": resp.data,"d":d})
    })
    .catch (erro => {
      res.status(509).render("error", {"error":erro})
    })
});

router.get('/edit/:idCompositor', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  var id = req.params.idCompositor
  axios.get("http://localhost:3000/compositores/" + id)
    .then (resp=> {
      comp = resp.data
      res.status(200).render("compositoresFormEditPage",{ "comp": comp,"d":d})
    })
    .catch (erro => {
      res.status(504).render("error", {"error":erro})
    })
});


router.post('/edit/:idCompositor', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  var comp = req.body
  axios.put("http://localhost:3000/compositores/" + comp.id, comp)
    .then (resp=> {
      res.redirect("/")})
    .catch (erro => {
      res.status(505).render("error", {"error":erro})
    })
});


router.get('/registo', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  res.status(200).render("compositoresFormPage",
      { "title":"Compositor Form","d": d})
});

router.post('/registo', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  result = req.body
  axios.post("http://localhost:3000/compositores/" ,result)
    .then ( resp => {
        res.redirect("/")
    })
    .catch (erro => {
      res.status(502).render("error", {"error":erro})
    })
});





router.get('/delete/:idCompositor', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  var id = req.params.idCompositor
  axios.delete("http://localhost:3000/compositores/" + id)
    .then (resp=> {
      res.redirect("/")})
    .catch (erro => {
      res.status(506).render("error", {"error":erro})
    })
});


// TEM QUE FICAR NO FIM ? porque dá conflitos? com o /registo?
router.get('/:idCompositor', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  var id = req.params.idCompositor
  axios.get("http://localhost:3000/compositores/"+ id)
    .then (resp=> {
      c = resp.data
      res.status(200).render("compositoresPage",
      { "title":"Compositor", "comp": c,"d": d})
    })
    .catch (erro => {
      res.status(503).render("error", {"error":erro})
    })
});




module.exports = router;
