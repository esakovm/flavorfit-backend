import { ConfigService } from '@nestjs/config';

export const isDevMode = (configService: ConfigService) => {
  return configService.get<string>('MODE') === 'development';
};
