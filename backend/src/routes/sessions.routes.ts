import { Router } from 'express';

import AuthenticateUserService from "../services/AuthenticateUserService";

const sessionsRouter = Router();

sessionsRouter.post('/', async ( request, response) =>{
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService;

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user, token });

});

export default sessionsRouter;

/* Faz a autenticação dos usuários, ou seja, a cada "login"
  é considerado como uma nova sessão
  Está interligado com o serviço AuthenticateUserService */
