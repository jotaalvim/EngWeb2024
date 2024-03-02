var http  = require ('http')
var axios = require('axios')
var url   = require('url')
var fs    = require('fs')


function gera1Filme(dic,id) {

    for (i in dic) {
        if (id == dic[i]["_id"]["$oid"]) {  
            title = dic[i]["title"]
            year = dic[i]["year"]
            genres = dic[i]["genres"]
            cast = dic[i]["cast"]
        }

    }
    var html = `<html>
    <head> <meta charset="utf-8"/> 
    <title> Página </title>  
    <link rel="stylesheet" href="w3.css"/>
    </head> <body> 
    <div class="w3-container w3-yellow">
        <h1>Movie ${title}</h1>
    </div>   
    <h4>Year: ${year}</h4>
    <h4>Genres: ${genres}</h4>
    <h4>Casting: ${cast}</h4>
    <div class="w3-container w3-yellow">
    <address> Gerado por João Alvim 😎 </address> 
    </div>
    </body></html>`
    
    return html

}

function geraFilmes(dic) {
    
    var html = `<html>
    <head>
        <meta charset="utf-8"/>
        <title> Página </title>
        <link rel="stylesheet" href="w3.css"/>
    </head> <body>
    <div class = "w3-container w3-yellow">
    <h1>Lista de Filmes</h1>
    </div>   
    <table class="w3-table">
    <tr>  
        <th>Name </th>
        <th>Year</th>
        <!-- <th>Genres</th> -->
        </tr>
`
    for (i in dic) {
        html += `
              <tr>
            <!-- <td>${dic[i]["_id"]["$oid"]}</td> -->
            <td>     <a href="/filmes/${dic[i]["_id"]["$oid"]}">  ${dic[i]["title"]}  </a></td>
            <td>${dic[i]["year"]}</td>
            <!-- <td>${dic[i]["genres"]}</td> -->
             </tr>`
    }
    html += `</table>
    <div class = "w3-container w3-yellow">
    <address> Gerado por João Alvim 😎 </address> 
    </div></body></html>`


    return html
} 


http.createServer((req, res) => {    
    console.log(req.method + " " + req.url)


    var q = url.parse(req.url, true)

    if (q.pathname =="/filmes") {
        axios.get("http://localhost:3000/filmes")
            .then((resp) => {
                res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
                a = geraFilmes(resp.data)
                res.write(a)
                res.end()
            })
             .catch((erro) => {
                console.log("Error: "+erro)
                res.write("<p>"+erro+"</p>") 
                res.end()  
            })
    } else

    if (q.pathname.match(/\/filmes\/(\w+)/) && q.pathname != "/filmes/w3.css") {
        var id = q.pathname.match(/\/filmes\/(\w+)/)[1];
        axios.get("http://localhost:3000/filmes")
            .then((resp) => {
                res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
                a = gera1Filme(resp.data,id)
                res.write(a)
                res.end()
            })
             .catch((erro) => {
                console.log("Error: "+erro)
                res.write("<p>"+erro+"</p>") 
                res.end()  
            })
    }
    else if (q.pathname=='/w3.css') {
        fs.readFile('w3.css', function(erro,dados) {
            res.writeHead(200, {'Content-Type':'text/css'}); 
            res.write(dados)
            res.end()
        })
    }

    else {
        res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
        res.write("<p>Pedido não suportado: " + q.pathname + "</p>")
        res.end()
    }

}).listen(7777);

console.log("Server linstening in port 7777")