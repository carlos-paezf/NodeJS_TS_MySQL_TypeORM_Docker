import { Request, Response } from 'express';
import { red } from 'colors';
import { CustomerService } from '../services/customer.service';
import { HttpResponse } from '../../shared/response/http.response';


/**
 * @author Carlos Páez
 */
export class CustomerController {
    constructor(
        private readonly _customerService: CustomerService = new CustomerService(),
        private readonly _httpResponse: HttpResponse = new HttpResponse()
    ) { }

    public findAllCustomers = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const data = await this._customerService.findAllCustomers()

            if (!data.length) return this._httpResponse.NotFound(res, 'No hay resultados')

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red('Error in CustomerController: '), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public findCustomerById = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const { id } = req.params

            const data = await this._customerService.findCustomerById(id)

            if (!data) return this._httpResponse.BadRequest(res, `No hay resultados para el id '${id}'`)

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red('Error in CustomerController: '), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public createCustomer = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const data = await this._customerService.createCustomer({ ...req.body })

            return this._httpResponse.Created(res, data)
        } catch (error) {
            console.log(red('Error in CustomerController: '), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public updateCustomer = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const { id } = req.params

            const data = await this._customerService.updateCustomer(id, { ...req.body })

            if (!data.affected) return this._httpResponse.BadRequest(res, 'No se han aplicado los cambios')

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red('Error in CustomerController: '), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }

    public deleteCustomer = async (req: Request, res: Response): Promise<unknown> => {
        try {
            const { id } = req.params

            const data = await this._customerService.deleteCustomer(id)

            if (!data.affected) return this._httpResponse.BadRequest(res, 'No se han aplicado los cambios')

            return this._httpResponse.Ok(res, data)
        } catch (error) {
            console.log(red('Error in CustomerController: '), error)
            return this._httpResponse.InternalServerError(res, error)
        }
    }
}