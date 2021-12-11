import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { Environments } from './environment';
import envConfig from './env-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: Environments[process.env.NODE_ENV] || `.env`,
      load: [envConfig],
      isGlobal: true,
      expandVariables: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        //Conexión a postgress
      }),
    }),
  ],
  exports: [ConfigModule],
})
export class ConfigurationsModule {}
