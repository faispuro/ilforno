import { CreatePizzaDto } from './create-pizza.dto';

export class UpdatePizzaDto implements Partial<CreatePizzaDto> {
  orderNumber?: number;
  name?: string;
  price?: number;
  description?: string;
  tagBadge?: string;
  image?: string;
  available?: boolean;
}