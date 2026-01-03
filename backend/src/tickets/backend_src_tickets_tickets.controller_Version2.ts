import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Controller('tickets')
export class TicketsController {
  constructor(private tickets: TicketsService) {}

  @Get()
  async list() {
    return this.tickets.list();
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.tickets.find(Number(id));
  }

  @Post()
  async create(@Body() body: { title: string; description: string }, @Req() req: Request) {
    // Basic auth parsing: pull requesterId from JWT
    const auth = req.headers['authorization'] || '';
    const token = (auth as string).split(' ')[1];
    let requesterId = 0;
    if (token) {
      try {
        const payload: any = jwt.decode(token);
        requesterId = Number(payload.sub);
      } catch (e) {}
    }
    const ticket = await this.tickets.create({ title: body.title, description: body.description, requesterId });
    return ticket;
  }
}