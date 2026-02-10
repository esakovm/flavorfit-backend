import { ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigService } from '@nestjs/config';
import type { IGQLContext } from 'src/app.interface';

export const getGraphQLConfig = (
  configService: ConfigService,
): ApolloDriverConfig => ({
  autoSchemaFile: true,
  playground: configService.get<string>('MODE') === 'development',
  context: ({ req, res }: IGQLContext): IGQLContext => ({ req, res }),
  sortSchema: true,
});
