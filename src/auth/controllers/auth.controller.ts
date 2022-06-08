import { Request, Response } from "express"
import { AuthService } from "../services/auth.service"
import { red } from 'colors';
import { HttpResponse } from "../../shared/response/http.response";
import { UserEntity } from "../../user/entities/user.entity";

/**
 * @author Carlos Páez
 */
export class AuthController extends AuthService {
    constructor(
        private readonly _httpResponse: HttpResponse = new HttpResponse()
    ) {
        super()
    }

    login = async (req: Request, res: Response) => {
        try {
            const userEncode = req.user as UserEntity
            const encode = await this.generateJWT(userEncode)

            if (!encode) {
                return this._httpResponse.Unauthorized(res, 'No tienes permisos')
            }

            res.header('Content-Type', 'application/json')
            res.cookie('accessToken', encode.accessToken, { maxAge: 6000 * 60 })
            res.write(JSON.stringify(encode))
            res.end()
        } catch (error) {
            console.log(red('Error in AuthController: '), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }
}