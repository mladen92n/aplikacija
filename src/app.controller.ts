import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello Wordl!';
  }
  @Get('world')
  getWorld(): string {
    return 'Wordl!';
  }
 
}
