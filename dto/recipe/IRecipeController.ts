import { type Request, type Response } from 'express'
import { type ICustomRequest } from '../ICustomRequest'

export interface IRecipeController {
  createRecipe: (req: Request, res: Response) => Promise<Response>
  deleteRecipeById: (req: Request, res: Response) => Promise<Response>
  getAllRecipes: (req: Request, res: Response) => Promise<Response>
  getRecipeById: (req: Request, res: Response) => Promise<Response>
  getRecipesByText: (req: Request, res: Response) => Promise<Response>
  updateRecipeById: (req: ICustomRequest, res: Response) => Promise<Response>
}
