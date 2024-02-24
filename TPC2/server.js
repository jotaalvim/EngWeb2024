var http  = require ('http')
var axios = require('axios')
var url   = require('url')

http.createServer((req, res) => {    
    console.log(req.method + " " + req.url)
                                      //text/plain
    res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'}); // envia a resposta

    var q = url.parse(req.url, true)


    if (q.pathname =="/escola") {
        axios.get("http://localhost:3000/cursos")

            .then((resp) => {
                var data = resp.data
                res.write("<h1> Escola de Música</h1>")
                res.write( "<h6> <a href=\"instrumentos\"> Lista de Instrumentos </a>  </h6> ")
                res.write( "<h6> <a href=\"cursos\"> Lista de Cursos </a>   </h6> ")



                res.end()
            })
             .catch((erro) => {
                console.log("Error: "+erro)
                res.write("<p>"+erro+"</p>") 
                res.end()  
            })
    } else
    if (q.pathname =="/instrumentos") {

        axios.get("http://localhost:3000/instrumentos")

             .then((resp) => {
                var data = resp.data
                res.write("<h1> Escola de Escola de Música </h1>")
                res.write("<ul>")
                for (i in data) {
                    res.write( "<li> <a href=" 
                                     + data[i].id+".html"
                                     + ">" + data[i]["#text"] 
                                     + " - " 
                                     + data[i].id+"</li>")
                }
                res.write( "</ul>")
                res.write( "<h6><a href=\"/escola\"> VOLTAR </a></h6>")
                res.end()
            })
             .catch((erro) => {
                console.log("Error: "+erro)
                res.write("<p>"+erro+"</p>")
                res.end()  
            })
    } else
    if (q.pathname =="/cursos") {
        axios.get("http://localhost:3000/cursos")

             .then((resp) => {
                var data = resp.data
                res.write("<h1> Cursos da Escola de Música</h1>")
                res.write("<ul>")
                for (i in data) {
                    res.write( "<li> <a href=" 
                                     + data[i].id+".html"
                                     + ">" 
                                     + data[i].designacao 
                                     + " - " 
                                     + data[i].id 
                                     + "</li>") 
                }
                res.write( "</ul>")
                res.write( "<h6><a href=\"/escola\"> VOLTAR </a></h6>")
                res.end()
            })
             .catch((erro) => {
                console.log("Error: "+erro)
                res.write("<p>"+erro+"</p>") 
                res.end()  
            })
    } else
    // PESSOAS POR CURSO
    if (req.url.match(/\/C(B|S)\d+/)) {
        var curso = req.url.match(/\/(C(B|S)\d+)\.html/)[1];
        axios.get("http://localhost:3000/alunos?curso="+curso)

             .then((resp) => {
                var data = resp.data
                res.write("<h1> Curso --" + curso + "-- NOME</h1>")
                res.write("<ul>")
                for (i in data) {
                    res.write( "<li>"
                                     + data[i].nome  + "</li>"
                                     + "<ul>" 
                                     + "<li>Data de nascimento: " + data[i].dataNasc
                                     + "</li>"
                                     + "<li>Id :"+ data[i].id + "</li>"
                                     + "<li>Ano de Curso :"+ data[i].anoCurso + "</li>"
                                     + "</ul>"
                                     + "</li>") 
                }
                res.write( "</ul>")
                res.write( "<h6><a href=\"/cursos\"> VOLTAR </a></h6>")
                res.end()
            })
             .catch((erro) => {
                console.log("Error: "+erro)
                res.write("<p>"+erro+"</p>") 
                res.end()  
            })
        
    }
    else {
    res.end();
    }
}).listen(7777);

console.log("Server linstening in port 7777")