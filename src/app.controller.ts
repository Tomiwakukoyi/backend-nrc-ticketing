import { Controller, Get } from '@nestjs/common';

@Controller() // This will handle requests to `/`
export class AppController {
  @Get() // This handles the GET requests to the root path `/`
  getHello(): string {
    return 'Hello, welcome to NRC Ticketing!';
  }
}
