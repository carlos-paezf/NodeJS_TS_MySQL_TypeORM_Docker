import { Request, Response } from "express";
import { red } from 'colors';
import { UserService } from "../services/user.service";
import { HttpResponse } from "../../shared/response/http.response";
import { UpdateResult, DeleteResult } from 'typeorm';


/**
 * @author Carlos Páez
 */
export class UserController {
    constructor(
        private readonly _userService: UserService = new UserService(),
        private readonly _httpResponse: HttpResponse = new HttpResponse()
    ) { }

    public async getAllUsers(req: Request, res: Response): Promise<unknown> {
        try {
            const data = await this._userService.findAllUsers()
            
            if (!data.length) return this._httpResponse.NotFound(res, 'No hay resultados')
            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red('Error in UserController: '), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public async getUserById(req: Request, res: Response): Promise<unknown> {
        try {
            const { id } = req.params
            const data = await this._userService.findUserById(id)

            if (!data) return this._httpResponse.NotFound(res, `No hay resultados para el id '${id}'`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red('Error in UserController: '), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public async createUser(req: Request, res: Response): Promise<unknown> {
        try {
            const data = await this._userService.createUser({ ...req.body })

            return this._httpResponse.Created(res, data)
        } catch (error) {
            console.log(red('Error in UserController: '), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public async updateUser(req: Request, res: Response): Promise<unknown> {
        try {
            const { id } = req.params
            const data: UpdateResult = await this._userService.updateUser(id, { ...req.body })

            if (!data.affected) return this._httpResponse.BadRequest(res, 'No se han aplicado los cambios')

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red('Error in UserController: '), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public async deleteUser(req: Request, res: Response): Promise<unknown> {
        try {
            const { id } = req.params
            const data: DeleteResult = await this._userService.deleteUser(id)

            if (!data.affected) return this._httpResponse.BadRequest(res, `No se logro eliminar el id ${id}`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red('Error in UserController: '), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }
}