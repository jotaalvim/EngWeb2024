// alunos_server.js
// EW2024 : 04/03/2024
// by jcr

var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');

var templates = require('./templates')          // Necessario criar e colocar na mesma pasta
var static = require('./static.js')             // Colocar na mesma pasta

// colocar w3.css e imagens no publick/

// Aux functions
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

// Server creation

var compositoresServer = http.createServer((req, res) => {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET":

                // GET /compositores --------------------------------------------------------------------
                if (req.url == "/" || req.url == "/compositores") {
                    axios.get("http://localhost:3000/compositores?_sort=nome")
                        .then (resp=> {
                            var alunos = resp.data
                            res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
                            res.write(templates.compositoresListPage(alunos, d))
                            res.end()
                        })
                        .catch (erro => {
                            res.writeHead(503, {'Content-Type':'text/html; charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de compositores: " + erro + "</p>")
                            res.end()
                        })
                }
                
                // GET /compositores/:id --------------------------------------------------------------------
                else if (/\/compositores\/(C)[0-9]+$/i.test(req.url)) {
                    id = req.url.split("/")[2]
                    axios.get("http://localhost:3000/compositores/" + id)
                        .then (resp=> {
                            var comp = resp.data
                            res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
                            res.write(templates.compositorePage(comp, d))
                            res.end()
                        })
                        .catch (erro => {
                            res.writeHead(503, {'Content-Type':'text/html; charset=utf-8'})
                            res.write("<p>Não foi possível obter a informação do aluno: " + id +"  "+ erro + "</p>")
                            res.end()
                        
                        })
                }


                // GET /compositores/registo --------------------------------------------------------------------
                else if (req.url == "/compositores/registo") {
                    
                    res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
                    res.write(templates.compositorFormPage( d))
                    res.end()
                }
                
               
                // GET /compositores/edit/:id --------------------------------------------------------------------
               
                else if (/\/compositores\/edit\/(C)[0-9]+$/i.test(req.url)) {
                    id = req.url.split("/")[3]
                    
                    axios.get("http://localhost:3000/compositores/" + id)
                        .then (resp=> {
                            var aluno = resp.data
                            res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
                            res.write(templates.compositorFormEditPage(aluno, d))
                            res.end()
                        })
                        .catch (erro => {
                            res.writeHead(503, {'Content-Type':'text/html; charset=utf-8'})
                            res.write("<p>Não foi possível obter a informação do aluno: " + id +"  "+ erro + "</p>")
                            res.end()
                        
                     })
                }
                
                // GET /compositores/delete/:id --------------------------------------------------------------------
                else if (/\/compositores\/delete\/(C)[0-9]+$/i.test(req.url)) {
                    id = req.url.split("/")[3]
                    axios.delete("http://localhost:3000/compositores/" + id)
                        .then (resp=> {
                            res.writeHead(201, {'Content-Type':'text/html; charset=utf-8'})
                            res.write("<p>registo apagado"+id +"</p>" )
                            res.end()
                        })
                        .catch (erro => {
                            res.writeHead(510, {'Content-Type':'text/html; charset=utf-8'})
                            res.write("<p>Não foi possível eliminar aluno: " + id +"  "+ erro + "</p>")
                            res.end()
                        
                     })

                }

                // GET /periodos --------------------------------------------------------------------
                else if (req.url == "/periodos") {
                    axios.get("http://localhost:3000/compositores")
                        .then (resp=> {
                            var comp = resp.data
                            res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
                            res.write(templates.periodosListPage(comp, d))
                            res.end()
                        })
                        .catch (erro => {
                            res.writeHead(503, {'Content-Type':'text/html; charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de compositores: " + erro + "</p>")
                            res.end()
                        })
                }


                // GET /periodos/:id --------------------------------------------------------------------
                else if (/\/periodos\/([\w0-9]+)$/i.test(req.url)) {
                    id = req.url.split("/")[2]


                    axios.get("http://localhost:3000/compositores?periodo=" + id)
                        .then (resp=> {
                            var comp = resp.data

                            
                            res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
                            res.write(templates.periodosPageId(comp, id, d))
                            res.end()
                        })
                        .catch (erro => {
                            res.writeHead(514, {'Content-Type':'text/html; charset=utf-8'})
                            res.write("<p>Não foi possível obter a informação do periodo: " + id +"  "+ erro + "</p>")
                            res.end()
                        
                        })
                }


                // GET ? -> Lancar um erro
                else {
                    res.writeHead (501,{'Content-Type': 'text/html; charset=utf-8'})
                    res.write("<p> GET request não suportado:" + req.url + "</p>")
                    res.end()
                }
                break
            case "POST":
                // POST /compositores/registo --------------------------------------------------------------------
                
                if (req.url == "/compositores/registo") {
                    collectRequestBodyData(req, result => {
                        if (result) {
                            axios.post("http://localhost:3000/compositores/" ,result)
                            .then ( resp => {
                                res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
                                res.write("<p> registo inserido" + JSON.stringify(resp.data) + "</p>")
                                res.end()
                            })
                            .catch (erro => {
                                res.writeHead(503, {'Content-Type':'text/html; charset=utf-8'})
                                res.write(templates.errorPage("não foi possivel editar",d))
                                res.end()
                            })
                        }
                     })
                }

                // POST /compositores/edit/:id --------------------------------------------------------------------
                else if (/\/compositores\/edit\/(C)[0-9]+$/i.test(req.url)) {
                    id = req.url.split("/")[3]
                    collectRequestBodyData(req, result => {
                        if (result) {
                            console.log(result)
                            axios.put("http://localhost:3000/compositores/" + result.id,result)
                            .then ( resp => {
                                var aluno = resp.data
                                res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
                                res.write("<p> registo alterado</p>")
                                res.end()
                            })
                            .catch (erro => {
                                res.writeHead(503, {'Content-Type':'text/html; charset=utf-8'})
                                res.write(templates.errorPage("não foi possivel editar",d))
                                res.end()
                            })
                        }
                     })
                }

                //FIXME
                // /periodos
                // /periodos/{id}
                 




                // POST ? -> Lancar um erro
                else {
                    res.writeHead (501,{'Content-Type': 'text/html; charset=utf-8'})
                    res.write("<p> POST request não suportado:" + req.url + "</p>")
                    res.end()
                }
                break;    
            default: 
                // Outros metodos nao sao suportados
                res.writeHead (500,{'Content-Type': 'text/html; charset=utf-8'})
                res.write("<p> Método: " + req.method + " nao suportado. </p>")
                res.end()
                break;
        }
    }
})

compositoresServer.listen(7777, () => {
    console.log("Servidor à escuta na porta 7777...")
})



