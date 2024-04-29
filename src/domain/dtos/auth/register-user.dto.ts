import { regularExps } from "../../../config";

export class RegisterUserDto {
    private constructor (
        public name:string,
        public email:string,
        public password:string
    ){}

    static create(object: { [key:string ]:any }) : [string?, RegisterUserDto?] {
        const {name, email, password} = object;

        if (!name || name.length === 0) {
            return ['Name is required'];
        }
        if (!email || email.length === 0 || !regularExps.email.test(email) ) {
            return ['Invalid email format'];
        }
        if (!password || password.length < 8) {
            return ['Password must be at least 8 characters long'];
        }
    
        return [undefined, new RegisterUserDto(name, email, password)];

    }
}