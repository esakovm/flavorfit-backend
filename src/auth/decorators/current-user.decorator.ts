import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import type { IRequestWithUser, TCurrentUser } from '../auth.interface';

export const CurrentUser = createParamDecorator(
  (data: keyof TCurrentUser, ctx: ExecutionContext) => {
    let user: TCurrentUser | null | undefined = null;

    if (ctx.getType() === 'http') {
      user = ctx.switchToHttp().getRequest<IRequestWithUser>().user;
    } else {
      const context = GqlExecutionContext.create(ctx);
      user = context.getContext<{ req: IRequestWithUser }>().req.user;
    }

    if (!user) {
      return null;
    }

    return data ? user[data] : user;
  },
);
