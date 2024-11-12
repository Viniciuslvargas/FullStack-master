import  Express  from "express";
import { login, registro } from "../controller/controller_auth.js";


const rotas = Express.Router()

rotas.post('/login', login )
rotas.post('/registro', registro )


export{rotas}