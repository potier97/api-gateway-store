import { Module } from '@nestjs/common';
import { ConfigurationsModule } from '@configdata/configurationsModule.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

//Importados
import { Configuration } from '@configdata/config.keys';

@Module({
  imports: [ConfigurationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: number;
  constructor(private readonly configService: ConfigService) {
    AppModule.port = this.configService.get<number>(Configuration.PORT);
  }
}
