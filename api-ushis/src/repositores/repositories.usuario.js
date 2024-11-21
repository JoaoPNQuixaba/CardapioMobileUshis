import { execute } from "../database/sqlite.js";

async function Inserir(nome, email, senha, cep, cidade, uf, bairro, endereco, numero) {

    const sql = `insert into usuario(nome, email, senha,
     cep, cidade, uf, bairro, endereco, numero, dt_cadastro) 
            values(?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP) returning id_usuario`;

    let usuario = await execute(sql, [nome, email, senha,
         cep, cidade, uf, bairro, endereco, numero]);

    return usuario[0];
}

async function ListarByEmail(email) {

    const sql = `select id_usuario,senha, nome, email, cep, cidade,
    uf, bairro, endereco, numero, dt_cadastro
    from usuario    
    where email = ?`;

    const usuario = await execute(sql, [email]);

    if (usuario.length == 0)
        return [];
    else
        return usuario[0];
}
async function ListarById(id_usuario) {

    const sql = `select id_usuario, nome, email, cep, cidade,
    uf, bairro, endereco, numero, dt_cadastro
    from usuario    
    where id_usuario = ?`;

    const usuario = await execute(sql, [id_usuario]);

    if (usuario.length == 0)
        return [];
    else
        return usuario[0];
}

export default {Inserir, ListarByEmail, ListarById};