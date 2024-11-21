import jwt from "../token.js";
import serviceUsuario from "../services/services.usuario.js";


async function Login(req, res) {

    const { email, senha } = req.body;

    const usuario = await serviceUsuario.Login(email, senha);

    if (usuario.length == 0)
        res.status(401).json({ error: "E-mail ou senha inválida" });
    else
        res.status(200).json(usuario);
}

async function Inserir(req, res) {

    try {
        const { nome, email, senha, cep, cidade, uf, bairro, endereco, numero} = req.body;
        
        const usuario = await serviceUsuario.Inserir(nome, email, senha, cep, cidade, uf, bairro, endereco, numero);
        usuario.token = jwt.CreateJWT(usuario.id_usuario);
        res.status(201).json(usuario);
    } catch (error) {
        res.status(500).json({ error });
    }
}

async function Perfil(req, res) {
    try {
        const id_usuario = req.id_usuario;
        const usuario = await serviceUsuario.Perfil(id_usuario);
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ error });
    }
}

export default { Login, Inserir, Perfil };
