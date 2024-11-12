import bcryptjs from "bcryptjs"
import { User } from "../db.js";
import jsonwebtoken from "jsonwebtoken";

const registro = async (req, res) => {
    const { nome, sobrenome, email, senha, telefone } = req.body
    console.log(req.body)
    if (!nome || !sobrenome || !email || !senha || !telefone) {
        res.send('voce deve preencher todos itens')
    }
    const userExiste = await User.findOne({ where: { email: email } })
    if (userExiste) {
        res.send('usuario ja existe')
        return
    }


    const senhaCriptografada = bcryptjs.hashSync(senha, 10)



    const usuarioCriado = await User.create({ nome, sobrenome, email, senha: senhaCriptografada, telefone })

    res.send('ta funcioano')
}


const login = async (req, res) => {
    const { email, senha, } = req.body
    if (!email || !senha) {
        res.send('voce deve preencher todos itens')
    }
    const userExiste = await User.findOne({ where: { email: email } })
    if (!userExiste) {
        res.send('Este usuario não existe')
        return
    }

    const senhaValida = bcryptjs.compareSync(senha, userExiste.senha)
    if(!senhaValida){
        res.send('senha invalida')
        return
    }
    const token = jsonwebtoken.sign(

        {"nome_completo": `${userExiste.nome} ${userExiste.sobrenome}`,
        "email": userExiste.email,
        "status": userExiste.status
    
    },
    "chavecriptografia",
    {expiresIn: 1000*60*60*24*30}


    )


    res.send({
        msg: "ok usuario logado",
        tokenJWT: token 
    })
}
export {registro, login}