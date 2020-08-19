import { Router } from 'express';

import SessionsController from '../controllers/SessionsController';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post('/', sessionsController.create);

export default sessionsRouter;

/* Faz a autenticação dos usuários, ou seja, a cada "login"
  é considerado como uma nova sessão
  Está interligado com o serviço AuthenticateUserService */
