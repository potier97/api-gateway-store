import { Module } from '@nestjs/common';
import { ConfigurationsModule } from '@configdata/configurationsModule.module';
import { ConfigService } from '@nestjs/config';

//Importados
import { Configuration } from '@configdata/config.keys';
import { BrokerModule } from '@broker/broker.module';
import { AuthController } from '@controllers/auth/auth.controller';
import { BuyController } from '@controllers/buy/buy.controller';
import { ClientController } from '@controllers/client/client.controller';
import { DetailController } from '@controllers/detail/detail.controller';
import { InvoiceController } from '@controllers/invoice/invoice.controller';
import { PayModeController } from '@controllers/pay-mode/pay-mode.controller';
import { ProductController } from '@controllers/product/product.controller';
import { UserController } from '@controllers/user/user.controller';
import { AppController } from './app.controller';

@Module({
  imports: [BrokerModule, ConfigurationsModule],
  controllers: [
    AuthController,
    BuyController,
    ClientController,
    DetailController,
    InvoiceController,
    PayModeController,
    ProductController,
    UserController,
    AppController,
  ],
  providers: [],
})
export class AppModule {
  static port: number;
  constructor(private readonly configService: ConfigService) {
    AppModule.port = this.configService.get<number>(Configuration.PORT);
  }
}
