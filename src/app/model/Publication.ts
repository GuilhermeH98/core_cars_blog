import { Category } from './Category';
import { User } from './User';

export interface Publication{
    id: number;
	title: string;
	content: string;
	photoKey: string;
	categoryDTO: Category;
	calendar: Date;
	userDTO: User;
	photoLink: string
}