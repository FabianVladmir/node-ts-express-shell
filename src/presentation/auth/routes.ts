import { Router } from 'express';
import { AuthController } from './controller';
import { AuthServices } from '../services/auth.services';




export class AuthRoutes {


  static get routes(): Router {

    const router = Router();
    const authService = new AuthServices();
    const controller = new AuthController(authService);
    // Define the routes
    router.post('/login', controller.loginUser );
    router.post('/register', controller.registerUser );
    router.get('/validate-email/:token', controller.validateUserEmail );



    return router;
  }


}

