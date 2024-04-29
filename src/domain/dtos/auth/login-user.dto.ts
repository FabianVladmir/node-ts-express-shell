import { regularExps } from "../../../config";

export class LoginUserDto {
    private constructor(
        public email:string,
        public password:string
    ){}

    static create(object: { [key:string ]:any }) : [string?, LoginUserDto?] {
        const {email, password} = object;

        
        if (!email || email.length === 0 || !regularExps.email.test(email) ) {
            return ['Invalid email format'];
        }
        if (!password || password.length < 8) {
            return ['Password must be at least 8 characters long'];
        }
    
        return [undefined, new LoginUserDto( email, password)];

    }
}