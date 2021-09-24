import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { IngredientsService } from '../ingredients/ingredients.service';

@ValidatorConstraint({ name: 'IngredientExistsValidation', async: true })
@Injectable() // this is needed in order to the class be injected into the module
export class IngredientExistsValidation implements ValidatorConstraintInterface {
  constructor(private ingredientsService: IngredientsService) { }

  async validate(text: string) {
    try {
      await this.ingredientsService.findOne(text);
    } catch (error) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `The Ingredient that you informed was not found. Please, inform the atleast 1 valid Ingredient _id to register new Product to database. `;
  }
}