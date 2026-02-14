import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommentCreateInput, CommentUpdateInput } from './inputs/comment.input';

@Injectable()
export class ReactionService {
  constructor(private readonly prisma: PrismaService) {}

  async like(userId: string, recipeId: string) {
    const existingLike = await this.prisma.like.findUnique({
      where: {
        recipeId_userId: {
          recipeId,
          userId,
        },
      },
    });

    if (existingLike) {
      await this.prisma.like.delete({
        where: { id: existingLike.id },
      });
      return false;
    } else {
      await this.prisma.like.create({
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
          recipe: {
            connect: {
              id: recipeId,
            },
          },
        },
      });

      return true;
    }
  }

  create(userId: string, data: CommentCreateInput) {
    return this.prisma.comment.create({
      data: {
        text: data.text,
        user: {
          connect: { id: userId },
        },
        recipe: {
          connect: { id: data.recipeId },
        },
      },
    });
  }

  async update(userId: string, commentId: string, data: CommentUpdateInput) {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment || comment.userId !== userId) {
      throw new ForbiddenException('Comment not found or unauthorized');
    }

    return this.prisma.comment.update({
      where: { id: commentId },
      data: {
        text: data.text,
      },
      include: {
        user: true,
      },
    });
  }

  async delete(userId: string, commentId: string) {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment || comment.userId !== userId) {
      throw new ForbiddenException('Comment not found or unauthorized');
    }

    return this.prisma.like.delete({
      where: { id: commentId },
    });
  }
}
