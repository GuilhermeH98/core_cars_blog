import { Brand } from './brand';
import { Fuel } from './Fuel';

export interface Car{
  id: number;
  name: string;
  model: string;
  year: number;
  fipe: number;
  fuel: Fuel;
  brand: Brand;
  photoKey: string;
	photoLink: string;
}
