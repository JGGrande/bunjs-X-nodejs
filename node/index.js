import sqlite3 from "sqlite3";
import http from "http";


const numeroRequisicao = []

const db = new sqlite3.Database(":memory:");

db.serialize(()=>{
    db.run('CREATE TABLE users (id INT, name TEXT, cargo TEXT)');
})

http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/') {
      let body = '';
  
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
  
      req.on('end', () => {
        const formData = JSON.parse(body);
  
        if (!formData.name || !formData.cargo) {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('Nome e cargo são obrigatórios.');
          return;
        }
  
        db.run('INSERT INTO users (name, cargo) VALUES (?, ?)', [formData.name, formData.cargo], function (err) {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Erro ao inserir no banco de dados.');
            return;
          }
  
          res.writeHead(201, { 'Content-Type': 'text/plain' });
          res.end(`Usuário inserido com sucesso. ID: ${this.lastID}`);
        });
      });
    } else if (req.method === 'GET' && req.url === '/users/count') {
      db.get('SELECT COUNT(*) AS count FROM users', (err, row) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Erro ao contar registros no banco de dados.');
          return;
        }
  
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ count: row.count }));
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Página não encontrada.');
    }
  }).listen(3000);

console.log("Server rodando na 3000")