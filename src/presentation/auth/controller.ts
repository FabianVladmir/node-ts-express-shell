import { Request, Response } from "express";
import { CustomError, LoginUserDto, RegisterUserDto } from "../../domain";
import { AuthServices } from "../services/auth.services";

export class AuthController {
    //DI
    constructor(
        public readonly authServices: AuthServices
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.log(`${error}`);
        return res.status(500).json({ error: 'Internal server error' })
    }

    registerUser = (req: Request, res: Response) => {
        const [error, newRegisterUserDto] = RegisterUserDto.create(req.body);
        if (error) return res.status(400).json({ error })

        this.authServices.registerUser(newRegisterUserDto!)
            .then((user) => res.json(user))
            .catch(error => this.handleError(error, res))
    }

    loginUser = (req: Request, res: Response) => {
        const [error, loginUserDto] = LoginUserDto.create(req.body)
        if (error) return res.status(400).json({ error });

        this.authServices.loginUser(loginUserDto!)
            .then((user) => res.json(user))
            .catch(error => this.handleError(error, res))

    }

    validateUserEmail = (req: Request, res: Response) => {
        res.json('validateUserEmail User')
    }
}