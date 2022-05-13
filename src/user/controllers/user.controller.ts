import { Request, Response } from "express";

/**
 * @author Carlos Páez
 */
export class UserController {
    public getUser = (req: Request, res: Response) => {
        return res.status(200).json({
            ok: true,
            data: {
                user: "Carlos Páez"
            }
        })
    }
}