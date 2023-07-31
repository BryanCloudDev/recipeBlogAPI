import { type Request, type Response } from 'express'
import { type ICustomRequest } from '../ICustomRequest'
import { type Recipe } from '../../models'

export interface IRecipeController {
  createRecipe: (req: Request, res: Response) => Promise<Response>
  deleteRecipeById: (req: Request, res: Response) => Promise<Response>
  getAllRecipes: (req: Request, res: Response) => Promise<Response>
  getRecipeById: (req: Request, res: Response) => Promise<Response>
  getRecipesByText: (req: Request, res: Response) => Promise<Response>
  updateRecipeById: (req: ICustomRequest<Recipe>, res: Response) => Promise<Response>
  uploadPhoto: (req: ICustomRequest<Recipe>, res: Response) => Promise<Response>
}
