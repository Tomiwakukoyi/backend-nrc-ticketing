// src/tickets/dto/create-ticket.dto.ts

import { IsString, IsNumber, IsDate } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  from: string;

  @IsString()
  to: string;

  @IsDate()
  departureTime: Date;

  @IsNumber()
  price: number;
}
