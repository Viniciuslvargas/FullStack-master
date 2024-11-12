import bcryptjs from "bcryptjs"
import { User } from "../db.js";
import jsonwebtoken from "jsonwebtoken";


const listaUser = async (req, res) => {
    try {
        const userExiste = await User.findAll();

        if (userExiste.length > 0) {
            const usuariosFiltrados = userExiste.map(user => ({
                nome: user.nome,
                email: user.email
            }));
            res.send(usuariosFiltrados);
        } else {
            res.status(404).send('Nenhum usuário encontrado');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar usuários');
    }
};

const GetUser = async (req, res) => {
    const user_id = req.params.id
    const user = await User.findOne({ where: { id: user_id } })
    res.send(user)
};

const deleteUser = async (req, res) => {
    const user_delete = req.params.id
    await User.destroy({
        where: {
          id: user_delete,
        },
      });
      res.send('deletado')
}

export { listaUser, GetUser, deleteUser };