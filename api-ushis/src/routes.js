import { Router } from "express"
import controllerUsuario from "./controllers/controller.usuario.js";
import jwt from "./token.js"

const router = Router();


router.post("/usuarios/login", controllerUsuario.Login)
router.post("/usuarios", controllerUsuario.Inserir);

export default router;