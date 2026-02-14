import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { CommentCreateInput } from './inputs/comment.input';
import { CommentModel } from './models/comment.model';
import { ReactionService } from './reaction.service';

@Resolver()
export class ReactionResolver {
  constructor(private readonly reactionService: ReactionService) {}

  @Mutation(() => CommentModel, { name: 'createComment' })
  @Auth()
  create(
    @CurrentUser('id') userId: string,
    @Args('input') input: CommentCreateInput,
  ) {
    return this.reactionService.create(userId, input);
  }

  @Mutation(() => CommentModel, { name: 'updateComment' })
  @Auth()
  update(
    @CurrentUser('id') userId: string,
    @Args('commentId') commentId: string,
    @Args('input') input: CommentCreateInput,
  ) {
    return this.reactionService.update(userId, commentId, input);
  }

  @Mutation(() => CommentModel, { name: 'deleteComment' })
  @Auth()
  delete(
    @CurrentUser('id') userId: string,
    @Args('commentId') commentId: string,
  ) {
    return this.reactionService.delete(userId, commentId);
  }

  @Mutation(() => Boolean, { name: 'likeComment' })
  @Auth()
  like(
    @CurrentUser('id') userId: string,
    @Args('commentId') commentId: string,
  ) {
    return this.reactionService.like(userId, commentId);
  }
}
