import { CreateTicketDto } from './dto/create-ticket.dto';

@ApiTags('tickets')
@ApiBearerAuth()
@Controller('tickets')
export class TicketsController {
  constructor(private ticketsService: TicketsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new ticket' })
  @ApiResponse({ status: 201, description: 'Ticket successfully created' })
  async createTicket(@Request() req, @Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.createTicket(req.user.userId, createTicketDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all tickets for the logged-in user' })
  @ApiResponse({ status: 200, description: 'Returns all tickets for the user' })
  async getTickets(@Request() req) {
    return this.ticketsService.getTickets(req.user.userId);
  }
}
