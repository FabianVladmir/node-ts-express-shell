import { JwtTokenAdapter, bcryptAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";

export class AuthServices {
    constructor(

    ) { }

    public async registerUser(registerUserDto: RegisterUserDto) {
        const existUser = await UserModel.findOne({ email: registerUserDto.email });
        if (existUser) {
            throw CustomError.badRequest('Email already exist')
        }

        try {
            const user = new UserModel(registerUserDto);
            

            //encrypt
            user.password = bcryptAdapter.hash(registerUserDto.password)
            await user.save();

            //JWT

            //send email

            const userEntity = UserEntity.fromObject(user);
            const { password, ...restBody } = userEntity.props;
            return {
                user: restBody,
                token: 'ABC'
            };


        } catch (error) {
            throw CustomError.internalServer
        }        
    }

    public async loginUser(loginUserDto: LoginUserDto){
        // findOne
        const userUniqueEmail = await UserModel.findOne({
            email: loginUserDto.email
        })

        if(!userUniqueEmail){
            throw CustomError.notFound("That email not found");
        }
        // hasMatch
        const passwordIsValid = bcryptAdapter.compare(loginUserDto.password, userUniqueEmail.password);
        if(!passwordIsValid){
            throw CustomError.unAuthorized('Incorrect username or password')
        }

        //jwt
        // const token = jwt.sign({ id: user._id }, 'your_jwt_secret', {
        //     expiresIn: 86400 // expires in 24 hours
        // });

        const token = await JwtTokenAdapter.generateToken({id: userUniqueEmail.id});
        if(!token) {
            throw CustomError.internalServer('Error while creating JWT')
        }

        const {password, ...userWithoutPassword} = userUniqueEmail.toObject();
        return {
            
            user: userWithoutPassword,
            token: token
        }
    }
}