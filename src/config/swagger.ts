import { DocumentBuilder } from '@nestjs/swagger'

export const swaggerConfig = () => {
  return (
    new DocumentBuilder()
      .setTitle('Starter Project Example')
      .setDescription('Nest js starter project ')
      .setVersion('1.0')
      .addTag('')
      // .addCookieAuth()
      .addBearerAuth()
      .build()
  )
}
