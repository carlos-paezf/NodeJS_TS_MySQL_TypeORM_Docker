import { Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { red } from 'colors';

export class ProductController {
    constructor(private readonly _productService: ProductService = new ProductService()) { }

    public async getAllProducts(req: Request, res: Response): Promise<unknown> {
        try {
            const data = await this._productService.findAllProducts()

            return res.status(200).json({
                ok: true, data
            })
        } catch (error) {
            console.log(red('Error in ProductController: '), error)
            return res.status(500).json({
                ok: false, msg: 'Comuníquese con el Administrador'
            })
        }
    }

    public async getProductById(req: Request, res: Response): Promise<unknown> {
        try {
            const { id } = req.params

            const data = await this._productService.findProductById(id)
            return res.status(200).json({
                ok: true, data
            })
        } catch (error) {
            console.log(red('Error in ProductController: '), error)
            return res.status(500).json({
                ok: false, msg: 'Comuníquese con el Administrador'
            })
        }
    }

    public async createProduct(req: Request, res: Response): Promise<unknown> {
        try {
            const data = await this._productService.createProduct({ ...req.body })

            return res.status(201).json({
                ok: true,
                data
            })
        } catch (error) {
            console.log(red('Error in ProductController: '), error)
            return res.status(500).json({
                ok: false, msg: 'Comuníquese con el Administrador'
            })
        }
    }

    public async updateProduct(req: Request, res: Response): Promise<unknown> {
        try {
            const { id } = req.params

            const data = await this._productService.updateProduct(id, { ...req.body })

            return res.status(200).json({
                ok: true, data
            })
        } catch (error) {
            console.log(red('Error in ProductController: '), error)
            return res.status(500).json({
                ok: false, msg: 'Comuníquese con el Administrador'
            })
        }
    }

    public async deleteProduct(req: Request, res: Response): Promise<unknown> {
        try {
            const { id } = req.params

            const data = await this._productService.deleteProduct(id)

            return res.status(200).json({
                ok: true, data
            })
        } catch (error) {
            console.log(red('Error in ProductService: '), error)
            return res.status(500).json({
                ok: false, msg: 'Comuníquese con el Administrador'
            })
        }
    }
}