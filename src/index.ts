import { AppModule } from './app.module'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule } from '@nestjs/swagger'
import { swaggerConfig } from './config/swagger'
import configuration from './config/configuration'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const config = configuration()
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: ['citi-hackoverflow22-lmgowbvrx-auyongtingting.vercel.app', 'http://localhost:3000'],
  })

  app.setGlobalPrefix('api/v1')
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  app.useLogger(app.get(config.log.provider))

  // Handle exceptions through filter
  // const httpAdapter = app.get(HttpAdapterHost)
  // app.useGlobalFilters(new AllExceptionsFilter(httpAdapter))

  const document = SwaggerModule.createDocument(app, swaggerConfig())
  SwaggerModule.setup('api-docs', app, document)
  await app.listen(config.port)
}
bootstrap()
