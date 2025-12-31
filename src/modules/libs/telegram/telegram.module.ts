import { Global, Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getTelegrafConfig } from '@/src/config/telegraf.config';
import { TelegrafModule } from 'nestjs-telegraf';

@Global()
@Module({
  imports: [
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getTelegrafConfig,
      inject: [ConfigService]
    })
  ],
  providers: [TelegramService],
  exports: [TelegramService]
})
export class TelegramModule {}
