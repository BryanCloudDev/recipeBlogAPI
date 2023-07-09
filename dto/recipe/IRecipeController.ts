import { type Request, type Response } from 'express'

export default interface IRecipeController {
  createRecipe: (req: Request, res: Response) => Promise<Response>
  deleteRecipe: (req: Request, res: Response) => Promise<Response>
  getAllRecipes: (req: Request, res: Response) => Promise<Response>
  getRecipeById: (req: Request, res: Response) => Promise<Response>
  getRecipesByText: (req: Request, res: Response) => Promise<Response>
}
