import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService) {}

  async createTicket(
    userId: number,
    data: { from: string; to: string; departureTime: Date; price: number },
  ) {
    return this.prisma.ticket.create({
      data: {
        userId,
        ...data,
      },
    });
  }

  async getTickets(userId: number) {
    return this.prisma.ticket.findMany({
      where: { userId },
    });
  }
}
