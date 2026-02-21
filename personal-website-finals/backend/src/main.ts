import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('api'); 

  app.enableCors({
    origin: true, 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  // Check if we are in a local/Codespace environment
  if (process.env.NODE_ENV !== 'production') {
    await app.listen(3000, '0.0.0.0');
    console.log('Server is running on port 3000');
  } else {
    // This part is for Vercel deployment
    await app.init();
    return app.getHttpAdapter().getInstance();
  }
}

// For Codespaces/Local execution
const server = bootstrap();

// For Vercel execution
export default server;