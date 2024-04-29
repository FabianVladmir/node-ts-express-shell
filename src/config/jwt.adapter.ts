import jwt from 'jsonwebtoken'
import { envs } from './envs';
const JWT_SEED = envs.JWT_SEED

export const JwtTokenAdapter = {
    generateToken:  async (payload: any, duration: string = '1h') => {
        return new Promise((resolve) => {

            jwt.sign(payload, JWT_SEED , {expiresIn: duration}, (err, token ) => {
                if (err) return resolve(null);

                resolve(token)
            });
        });       
        
    },

    validateToken: (token: string) => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, JWT_SEED, (err, decoded) => {
                if (err) {
                    reject(err); // Rejects the promise if token is invalid or expired
                } else {
                    resolve(decoded); // Resolves the promise with the decoded token payload if valid
                }
            });
        });
    }
}