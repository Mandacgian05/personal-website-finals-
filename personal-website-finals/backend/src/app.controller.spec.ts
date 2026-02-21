import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('guestbook')
  async getMessages() {
    return await this.appService.getMessages();
  }

  @Post('guestbook')
  async postMessage(@Body() dto: { name: string; message: string }) {
    return await this.appService.postMessage(dto.name, dto.message);
  }
}