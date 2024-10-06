import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TicketsModule } from './tickets/tickets.module';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller'; // Import your AppController

@Module({
  imports: [AuthModule, TicketsModule, PrismaModule],
  controllers: [AppController], // Add AppController here
})
export class AppModule {}
