from xmldt import XmlDt, toxml
import re
import sys
import os 

def funtor(e,t,d="") : e.tag = t; e.c = d + e.c ; return e.xml

class proc (XmlDt):
    def número(s, e): 
        t = "h1"      if e.parent.tag == "meta" else "h3"
        p = "Rua Nº " if e.parent.tag == "meta" else "Casa Nº "
        return funtor(e, t, p)

    def nome       (s, e): return funtor(e,"h1")
    def corpo      (s, e): return funtor(e,"body")
    def para       (s, e): return funtor(e,"p")
    def lugar      (s, e): return funtor(e,"b")
    def lista_casas(s, e): return funtor(e,"ul") 
    def legenda    (s, e): return funtor(e,"h4", "Fig. : ")  
    def enfiteuta  (s, e): return funtor(e,"li", "Inquilino: ")  
    def foro       (s, e): return funtor(e,"li", "Pensão: ")  
    def desc       (s, e): return funtor(e,"li", "Descrição: ")  
    def imagem     (s, e): e.tag = "img" ; e['src'] = e['path'] ; return e.xml
todos = []
for f in os.listdir("../texto"):
    name,_ = os.path.splitext(f)
    path = f'../htmls/{name}.html'
    with open(path,'w') as h:
        content = "<style> figura { text-align: center; } img { max-width: 100%; height: auto; } </style> " + proc(filename=f"../texto/{f}")   
        h.write( content)
        a = re.findall(r'<h1>Rua Nº (\d+)</h1><h1>(.*)</h1>',content)[0]
        todos.append((int(a[0]), f'{a[0]}: {a[1]}',path[3:]))
        
html = ' <!DOCTYPE html> <html lang="en"> <head> <title>Aula 1</title> <meta charset="utf-8"> </head> <body> <h1> Ruas de Braga </h1> <ul>'
fim = "</ul> </body> </html>"

for _,nome,path in sorted(todos, key=lambda k : k[0]):
    html += f"<li> <a href={path}> {nome} </li>"

    with open('../mapa.html','w') as m:
        m.write(html + fim)
