import "reflect-metadata"
import { createServer } from "http"
import { Server, Socket } from "socket.io"
import { join } from "path"

import express from "express"
import "./database"

import { routes } from "./routes"

const app = express()

app.use(express.static(join(__dirname, "..", "public")))
app.set("views", join(__dirname, "..", "public"))
app.engine("html", require("ejs").renderFile)
app.set("view engine", "html")

app.get("/pages/client", (request, response) => {
  return response.render("html/client.html");
});

app.get("/pages/admin", (request, response) => {
  return response.render("html/admin.html");
});

const http = createServer(app)
const io = new Server(http)

io.on("connection", (socket: Socket) => {
  console.log("User", socket.id)
})

app.use(express.json())
app.use(routes)

export { http, io }