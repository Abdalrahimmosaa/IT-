import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService) {}

  async list() {
    return this.prisma.ticket.findMany({
      include: { requester: true, assignee: true, comments: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  async create(data: { title: string; description: string; requesterId: number }) {
    return this.prisma.ticket.create({
      data: {
        title: data.title,
        description: data.description,
        requesterId: data.requesterId
      },
      include: { requester: true }
    });
  }

  async find(id: number) {
    return this.prisma.ticket.findUnique({
      where: { id },
      include: { requester: true, assignee: true, comments: true }
    });
  }
}