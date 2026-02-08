import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import type { IRequestWithUser } from '../auth.interface';
import { ForbiddenError } from '@nestjs/apollo';
import { Role } from 'prisma/generated/prisma/enums';

export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext<{ req: IRequestWithUser }>().req.user;

    if (user?.role !== Role.ADMIN) {
      throw new ForbiddenError(
        "You don't have permission to access this resource",
      );
    }

    return true;
  }
}
