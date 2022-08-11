import { DocumentBuilder } from '@nestjs/swagger'

export const swaggerConfig = () => {
  return (
    new DocumentBuilder()
      .setTitle('Citibank Hackathon 2022')
      .setDescription('Api documentation for citihack')
      .setVersion('1.0')
      .addTag('')
      .addBearerAuth()
      .build()
  )
}
