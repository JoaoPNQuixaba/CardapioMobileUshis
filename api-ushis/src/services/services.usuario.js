import repositoryUsuario from "../repositores/repositores.usuario.js";
import bcrypt from 'bcrypt';
import jwt from '../token.js';

async function Inserir(nome, email, senha, cep, cidade, uf, bairro, endereco, numero) {
    
    
    
    const validarUsuario = await repositoryUsuario.ListarByEmail(email);

    if (validarUsuario.id_usuario)
        throw "Já existe uma conta criada com esse e-mail";

    const hashSenha = await bcrypt.hash(senha, 10);

    const usuario = await repositoryUsuario.Inserir(nome, email, hashSenha, cep, cidade, uf, 
        bairro, endereco, numero);

    usuario.token = jwt.CreateJWT(usuario.id_usuario);

    return usuario;
}
async function Login(email, senha) {
    
    const usuario = await repositoryUsuario.ListarByEmail(email);

    if (usuario.length == 0)
        return [];
    else {
        if (await bcrypt.compare(senha, usuario.senha)) {
            delete usuario.senha;
            usuario.token = jwt.CreateJWT(usuario.id_usuario);

            return usuario;
        }
        else
            return [];
    }
}

async function Perfil(id_usuario) {

    const usuario = await repositoryUsuario.ListarById(id_usuario);
    return usuario;
}

export default { Inserir, Login, Perfil};
