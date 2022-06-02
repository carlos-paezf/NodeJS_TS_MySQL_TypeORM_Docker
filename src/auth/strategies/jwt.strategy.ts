import { PayloadToken } from "../interfaces/auth.interface"
import { AuthService } from "../services/auth.service"
import { PassportUse } from '../utils/passport.use'
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt'


/**
 * @author Carlos Páez
 */
export class JWTStrategy extends AuthService {
    constructor() {
        super()
    }

    async validate(payload: PayloadToken, done: any) {
        return done(null, payload)
    }

    get use() {
        return PassportUse<JwtStrategy, StrategyOptions, (payload: PayloadToken, done: any) => Promise<PayloadToken>>(
            'jwt',
            JwtStrategy,
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: this.getEnvironment('JWT_SECRET_KEY')
            },
            this.validate
        )
    }
}