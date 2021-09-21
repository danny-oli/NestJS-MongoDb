import { Injectable } from '@nestjs/common';
import { Ingredient } from './interfaces/Ingredient.interface';

@Injectable()
export class IngredientService {
  private readonly Ingredient: Ingredient[] = [
    {
      id: '001',
      name: 'Café',
      quantity: 10,
      measurement: 'Kg',
      value: 5.99,
    },
    {
      id: '002',
      name: 'Quejo',
      quantity: 32,
      measurement: 'Kg',
      value: 9.99,
    },
  ];

  findAll(): Ingredient[] {
    return this.Ingredient;
  }
}
