import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import { format, LoggerOptions, transports } from 'winston'

export default () => ({
  port: process.env.PORT || 8080,
  mongouri: process.env.MONGO_URI || 'mongodb://localhost:27017',
  secretKey: process.env.SECRET_KEY || 'secretive key',
  jwtExpiry: process.env.JWT_EXPIRY_SECONDS || 86400,
  log: {
    options: {
      level: process.env.LOG_LEVEL ?? 'log',
      format: format.combine(
        format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
        format.align(),
        format.printf(
          (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`,
        ),
      ),
      transports: [
        new transports.Console({
          handleExceptions: true,
        }),
      ],
    } as LoggerOptions,
    provider: WINSTON_MODULE_NEST_PROVIDER,
  },
})
