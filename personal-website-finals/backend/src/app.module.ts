import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // This allows Nest.js to read your .env file
    ConfigModule.forRoot({
      isGlobal: true, // Makes the config available everywhere in your app
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}