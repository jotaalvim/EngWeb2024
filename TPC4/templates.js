exports.compositoresListPage = function(slist, d){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Cmpositores Management</title>
        </head>
        <body>
            <div class="w3-card-4">

                <header class="w3-container w3-yellow">
                    <h1>Compositores List
                    <a class="w3-btn w3-round w3-grey" href="/compositores/registo">+</a>
                    </h1>
                    
                </header>
        
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Id</th><th>Name</th><th>Período</th>
                            <th>Actions</th>
                        </tr>
                `
    for(let i=0; i < slist.length ; i++){
        pagHTML += `
                <tr>
                    <td>${slist[i].id}</td>
                    <td>
                        <a href="/compositores/${slist[i].id}">
                            ${slist[i].nome}
                        </a>
                    </td>
                    <td>${slist[i].periodo}</td>
                    <td>
                        [<a href="/compositores/edit/${slist[i].id}">Edit</a>][<a href="/compositores/delete/${slist[i].id}">Delete</a>]
                    </td>
                </tr>
        `
    }

    pagHTML += `
            </table>
            </div>
                <footer class="w3-container w3-yellow">
                    <h5>Generated by Rubik 2024 in ${d}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}


exports.compositorFormPage = function(d){
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>compositores Form</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-yellow">
                    <h2>Compositores Form</h2>
                </header>
            
                <form class="w3-container" method="POST">
                    <fieldset>
                        <legend>Metadata</legend>
                        <label>Id</label>
                        <input class="w3-input w3-round" type="text" name="id"/>
                        <label>Nome</label>
                        <input class="w3-input w3-round" type="text" name="nome"/>
                        <label>Período</label>
                        <input class="w3-input w3-round" type="text" name="periodo"/>
                        <label>Data Nascimento</label>
                        <input class="w3-input w3-round" type="text" name="dataNasc"/>
                        <label>Data Obito</label>
                        <input class="w3-input w3-round" type="text" name="dataObito"/>
                        <label>Biografia</label>
                        <input class="w3-input w3-round" type="text" name="bio"/>
                    </fieldset>

      
                    <br/>
                    <button class="w3-btn w3-yellow w3-mb-2" type="submit">Register</button>
                </form>

                <footer class="w3-container w3-yellow">
                    <h5>Generated by EngWeb2023 in ${d} - [<a href="/">Return</a>]</h5>
                </footer>
            
            </div>
    `
}

exports.compositorFormEditPage = function(a, d){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Student Form</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-yellow">
                    <h2>Student Form</h2>
                </header>
            
                <form class="w3-container" method="POST">
                    <fieldset>
                        <legend>Metadata</legend>
                        <label>Id</label>
                        <input class="w3-input w3-round" type="text" name="id" readonly value="${a.id}"/>
                        <label>Name</label>
                        <input class="w3-input w3-round" type="text" name="nome" value="${a.nome}"/>
                        <label>Período</label>
                        <input class="w3-input w3-round" type="text" name="periodo" value="${a.periodo}"/>
                        <label>Data Nascimento</label>
                        <input class="w3-input w3-round" type="text" name="dataNasc" value="${a.dataNasc}"/>
                        <label>Data Obito</label>
                        <input class="w3-input w3-round" type="text" name="dataObito" value="${a.dataObito}"/>
                        <label>Biografia</label>
                        <input class="w3-input w3-round" type="text" name="bio" value="${a.bio}"/>
                    </fieldset>

            
                    `

    //for(i=1; i < 9; i++){
    //    var tpc = "tpc" + i
    //    if(tpc in a){
    //        pagHTML += `<input class="w3-check" type="checkbox" name="tpc${i}" value="1" checked/>
    //                    <label>TPC${i}</label>
    //                    `
    //    }
    //    else{
    //        pagHTML += `<input class="w3-check" type="checkbox" name="tpc${i}" value="1"/>
    //                    <label>TPC${i}</label>
    //                    `
    //    }
    //}                

    pagHTML += `

                    <br/>
                    <button class="w3-btn w3-yellow w3-mb-2" type="submit">Register</button>
                </form>

                <footer class="w3-container w3-yellow">
                    <h5>Generated by EngWeb2023 in ${d} - [<a href="/">Return</a>]</h5>
                </footer>
            
            </div>
    `
    return pagHTML
}

// ---------------Compositores's Page--------------------------------
// Change and adapt to current dataset...
exports.compositorePage = function( comp, d ){
    var pagHTML = `
    <html>
    <head>
        <title>Compositor: ${comp.id}</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-yellow">
                <h1>Compositor ${comp.id}</h1>
            </header>

            <div class="w3-container">
                <ul class="w3-ul w3-card-4" style="width:50%">
                    <li><b>Nome: </b>      ${comp.nome}</li>
                    <li><b>Número: </b>    ${comp.id}</li>
                    <li><b>Período: </b>   ${comp.periodo}</li>
                    <li><b>dataNasc: </b>  ${comp.dataNasc}</li>
                    <li><b>dataObito: </b> ${comp.dataObito}</li>
                    <li><b>Biografia: </b> ${comp.bio}</li>
                </ul>
            </div>

            `

    pagHTML +=     `
            <footer class="w3-container w3-yellow">
                <address>Gerado por joao alvim 😎 :: RPCW2024 em ${d} - [<a href="/">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `
    return pagHTML
}


exports.compositorFormEditPage = function(a, d){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Compositor Form</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-yellow">
                    <h2>Compositor Form</h2>
                </header>
            
                <form class="w3-container" method="POST">
                    <fieldset>
                        <legend>Metadata</legend>
                        <label>Id</label>
                        <input class="w3-input w3-round" type="text" name="id" readonly value="${a.id}"/>
                        <label>Name</label>
                        <input class="w3-input w3-round" type="text" name="nome" value="${a.nome}"/>
                        <label>Período</label>
                        <input class="w3-input w3-round" type="text" name="periodo" value="${a.periodo}"/>
                        <label>Data Nascimento</label>
                        <input class="w3-input w3-round" type="text" name="dataNasc" value="${a.dataNasc}"/>
                        <label>Data Obito</label>
                        <input class="w3-input w3-round" type="text" name="dataObito" value="${a.dataObito}"/>
                        <label>Biografia</label>
                        <input class="w3-input w3-round" type="text" name="bio" value="${a.bio}"/>
                    </fieldset>

            
                    `

    //for(i=1; i < 9; i++){
    //    var tpc = "tpc" + i
    //    if(tpc in a){
    //        pagHTML += `<input class="w3-check" type="checkbox" name="tpc${i}" value="1" checked/>
    //                    <label>TPC${i}</label>
    //                    `
    //    }
    //    else{
    //        pagHTML += `<input class="w3-check" type="checkbox" name="tpc${i}" value="1"/>
    //                    <label>TPC${i}</label>
    //                    `
    //    }
    //}                

    pagHTML += `

                    <br/>
                    <button class="w3-btn w3-yellow w3-mb-2" type="submit">Register</button>
                </form>

                <footer class="w3-container w3-yellow">
                    <h5>Generated by EngWeb2023 in ${d} - [<a href="/">Return</a>]</h5>
                </footer>
            
            </div>
    `
    return pagHTML
}




exports.periodosListPage = function(slist, d){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Periodos Management</title>
        </head>
        <body>
            <div class="w3-card-4">

                <header class="w3-container w3-yellow">
                    <h1>Periodos List
                    <a class="w3-btn w3-round w3-grey" href="/periodos/registo">+</a>
                    </h1>
                    
                </header>
        
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Período</th>
                        </tr>
                `
    var periodos = []
    for (i in slist) {
        g = slist[i]["periodo"]
        if (!periodos.includes(g)) {
            periodos.push(g)    
        } 
    }

    for(let i=0; i < periodos.length ; i++){
        pagHTML += `
                <tr>
                    <td>
                        <a href="/periodos/${periodos[i]}">
                            ${periodos[i]}
                        </a>
                    </td>
                    <td>
                        [<a href="/compositores/edit/${slist[i].id}">Edit</a>][<a href="/compositores/delete/${slist[i].id}">Delete</a>]
                    </td>
                </tr>
        `
    }

    pagHTML += `
            </table>
            </div>
                <footer class="w3-container w3-yellow">
                    <h5>Generated by Rubik 2024 in ${d}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}




exports.periodosPageId = function(slist,id, d){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Cmpositores Management</title>
        </head>
        <body>
            <div class="w3-card-4">

                <header class="w3-container w3-yellow">
                    <h1>Período ${id}
                    <!-- <a class="w3-btn w3-round w3-grey" href="/periodos/registo">+</a> -->
                    </h1>
                    
                </header>
        
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Id</th><th>Name</th><th>Período</th>
                            <th>Actions</th>
                        </tr>
                `
    for(let i=0; i < slist.length ; i++){
        pagHTML += `
                <tr>
                    <td>${slist[i].id}</td>
                    <td>
                        <a href="/compositores/${slist[i].id}">
                            ${slist[i].nome}
                        </a>
                    </td>
                    <td>${slist[i].periodo}</td>
                    <td>
                        [<a href="/compositores/edit/${slist[i].id}">Edit</a>][<a href="/compositores/delete/${slist[i].id}">Delete</a>]
                    </td>
                </tr>
        `
    }

    pagHTML += `
            </table>
            </div>
                <footer class="w3-container w3-yellow">
                    <h5>Generated by Rubik 2024 in ${d}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}













// -------------- Error Treatment ------------------------------
exports.errorPage = function(errorMessage, d){
    return `
    <p>${d}: Error: ${errorMessage}</p>
    `
}