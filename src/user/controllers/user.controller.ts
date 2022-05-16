import { Request, Response } from "express";
import { red } from 'colors';
import { UserService } from "../services/user.service";


/**
 * @author Carlos Páez
 */
export class UserController {
    constructor(private readonly _userService: UserService = new UserService()) { }

    public async getAllUsers(req: Request, res: Response): Promise<unknown> {
        try {
            const data = await this._userService.findAllUsers()
            return res.status(200).json({
                ok: true, data
            })
        } catch (error) {
            console.log(red('Error in UserController: '), error)
            return res.status(500).json({
                ok: false, msg: 'Comuníquese con el Administrador'
            })
        }
    }

    public async getUserById(req: Request, res: Response): Promise<unknown> {
        try {
            const { id } = req.params
            const data = await this._userService.findUserById(id)

            return res.status(200).json({
                ok: true, data
            })
        } catch (error) {
            console.log(red('Error in UserController: '), error)
            return res.status(500).json({
                ok: false, msg: 'Comuníquese con el Administrador'
            })
        }
    }

    public async createUser(req: Request, res: Response): Promise<unknown> {
        try {
            const data = await this._userService.createUser({ ...req.body })

            return res.status(201).json({
                ok: true, data
            })
        } catch (error) {
            console.log(red('Error in UserController: '), error)
            return res.status(500).json({
                ok: false, msg: 'Comuníquese con el Administrador'
            })
        }
    }

    public async updateUser(req: Request, res: Response): Promise<unknown> {
        try {
            const { id } = req.params
            const data = await this._userService.updateUser(id, { ...req.body })

            return res.status(201).json({
                ok: true, data
            })
        } catch (error) {
            console.log(red('Error in UserController: '), error)
            return res.status(500).json({
                ok: false, msg: 'Comuníquese con el Administrador'
            })
        }
    }

    public async deleteUser(req: Request, res: Response): Promise<unknown> {
        try {
            const { id } = req.params
            const data = await this._userService.deleteUser(id)

            return res.status(200).json({
                ok: true, data
            })
        } catch (error) {
            console.log(red('Error in UserController: '), error)
            return res.status(500).json({
                ok: false, msg: 'Comuníquese con el Administrador'
            })
        }
    }
}