import http from "http";

const numeroRequisicao = []

http.createServer((req, res)=>{
    if(req.method === "POST" && req.url === "/"){
        numeroRequisicao.push(numeroRequisicao.length + 1)
        console.log("Numero de requisições", numeroRequisicao.reverse())
        res.end("Criado com sucesso")
    }
}).listen(3000)
