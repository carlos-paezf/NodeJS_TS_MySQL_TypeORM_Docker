import { compare } from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { ConfigServer } from "../../config/config"
import { UserEntity } from '../../user/entities/user.entity'
import { UserService } from "../../user/services/user.service"
import { PayloadToken } from '../interfaces/auth.inteface'


/**
 * @author Carlos Páez
 */
export class AuthService extends ConfigServer {
    constructor(
        private readonly _userService: UserService = new UserService(),
        private readonly _jwtInstance = jwt
    ) { super() }

    public async validateUser(emailOrUsername: string, password: string): Promise<UserEntity | null> {
        const userByEmail = await this._userService.findUserByEmail(emailOrUsername)
        const userByUsername = await this._userService.findUserByUsername(emailOrUsername)

        if (userByUsername) {
            const isMatch = await compare(password, userByUsername.password)
            isMatch && userByUsername
        }
        if (userByEmail) {
            const isMatch = await compare(password, userByEmail.password)
            isMatch && userByEmail
        }

        return null
    }

    public sign(payload: jwt.JwtPayload, secret: any) {
        return this._jwtInstance.sign(payload, secret)
    }

    public async generateJWT(user: UserEntity): Promise<{accessToken: string, user: UserEntity}> {
        const userQuery = await this._userService.findUserWithRole(user.id, user.role)

        const payload: PayloadToken = {
            role: userQuery!.role,
            sub: userQuery!.id
        }

        if (userQuery) {
            user.password = 'Not Permission'
        }

        return {
            accessToken: this.sign(payload, this.getEnvironment('JWT_SECRET_KEY')),
            user
        }
    }
}