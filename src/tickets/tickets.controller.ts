import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('tickets')
@ApiBearerAuth()
@Controller('tickets')
export class TicketsController {
  constructor(private ticketsService: TicketsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new ticket' })
  @ApiResponse({ status: 201, description: 'Ticket successfully created' })
  async createTicket(
    @Request() req,
    @Body()
    body: { from: string; to: string; departureTime: Date; price: number },
  ) {
    return this.ticketsService.createTicket(req.user.userId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all tickets for the logged-in user' })
  @ApiResponse({ status: 200, description: 'Returns all tickets for the user' })
  async getTickets(@Request() req) {
    return this.ticketsService.getTickets(req.user.userId);
  }
}
