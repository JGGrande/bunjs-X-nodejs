import { Database } from "bun:sqlite";

const db = new Database(":memory:", { create: true });
db.run("CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, cargo TEXT)");


const server = Bun.serve({
    port: 3000,
    async fetch(req) {
        const url = new URL(req.url);
        if (url.pathname === "/user" && req.method === "POST") {
            const body = await req.json()
            
            db.run(
                "INSERT INTO users (name, cargo) VALUES (? , ?)",
                body.name,
                body.cargo
            );

            console.log("Inseriu")

            return new Response("Salvado");
        }
        if(req.method === "GET" && url.pathname === "/count"){
            const usersCount = db.query("SELECT COUNT(*) AS count FROM users").get()
            return Response.json({
                usersCount
            })
        }
      return new Response("Bun!");
    },
  });
  
  console.log(`Listening on http://localhost:${server.port} ...`);