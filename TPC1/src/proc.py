from xmldt import XmlDt, toxml
import re
import sys
import os 

class proc (XmlDt):
    def número(s, e): 
        e.tag = "h3" 
        if e.parent.tag == "meta":
            e.tag = "h1"; e.c = "Rua  Nº " + e.c 
        else:
            e.tag = "h3"; e.c = "Casa Nº " + e.c 
        return e.xml
    def nome(s, e)  :      e.tag = "h1"  ; return e.xml
    def corpo(s, e):       e.tag = "body"; return e.xml
    def para(s, e):        e.tag = "p"   ; return e.xml
    def lugar(s, e):       e.tag = "b"   ; return e.xml
    def lista_casas(s, e): e.tag = "ul"  ; return e.xml 
    def imagem(s, e):      e.tag = "img" ; e['src'] = e['path'] ; return e.xml
    def legenda(s, e):     e.tag = "h4"  ; e.c = "Fig. : "    + e.c ; return e.xml
    def enfiteuta(s, e):   e.tag = "li"  ; e.c = "Inquilino: " + e.c; return e.xml 
    def foro(s, e):        e.tag = "li"  ; e.c = "Pensao: "    + e.c; return e.xml
    def desc(s, e):        e.tag = "li"  ; e.c = "Descrição: " + e.c; return e.xml

todos = []
for f in os.listdir("../texto"):
    name,_ = os.path.splitext(f)
    path = f'../htmls/{name}.html'
    with open(path,'w') as h:
        content = "<style> figura { text-align: center; } img { max-width: 100%; height: auto; } </style> " + proc(filename=f"../texto/{f}")   
        h.write( content)
        a = re.findall(r'<h1>Rua  Nº (\d+)</h1><h1>(.*)</h1>',content)[0]
        todos.append((int(a[0]), f'{a[0]}: {a[1]}',path[3:]))
        
print (todos)
    
html = ' <!DOCTYPE html> <html lang="en"> <head> <title>Aula 1</title> <meta charset="utf-8"> </head> <body> <h1> Ruas de Braga </h1> <ul>'
fim = "</ul> </body> </html>"

for _,nome,path in sorted(todos, key=lambda k : k[0]):
    html += f"<li> <a href={path}> {nome} </li>"

    with open('../mapa.html','w') as m:
        m.write(html + fim)
