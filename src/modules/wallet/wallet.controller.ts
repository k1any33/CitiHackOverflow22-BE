import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Inject,
  Logger,
  LoggerService,
  InternalServerErrorException,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { WalletService } from './wallet.service'
import { CreateWalletDto } from './dto/create-wallet.dto'
import { UpdateWalletDto } from './dto/update-wallet.dto'
import { RequestWithUser } from 'src/modules/auth/types/request-with-user'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { DeleteWalletReponseDto } from './dto/delete-wallet.response.dto'
import { WalletResponseDto } from './dto/wallet.reponse.dto'

@ApiTags('Wallet')
@Controller('wallet')
export class WalletController {
  constructor(
    private readonly walletService: WalletService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  @Post()
  @ApiResponse({ status: HttpStatus.OK, type: WalletResponseDto })
  @ApiBearerAuth()
  async create(
    @Req() req: RequestWithUser,
    @Body() createWalletDto: CreateWalletDto,
  ): Promise<WalletResponseDto | HttpException> {
    const result = await this.walletService
      .create(req.user.userId, createWalletDto)
      .catch(({ message }) => {
        this.logger.error(`Error in creating wallet`, {
          method: 'post',
          errorMessage: message,
        })
        throw new InternalServerErrorException('Error in creating wallet')
      })
    return result.data!
  }

  @Get(':walletId')
  @ApiResponse({ status: HttpStatus.OK, type: WalletResponseDto })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'You are not allowed to view this resource',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'This wallet does not exist',
  })
  @ApiBearerAuth()
  async findOne(
    @Req() req: RequestWithUser,
    @Param('walletId') walletId: string,
  ): Promise<WalletResponseDto | HttpException> {
    const result = await this.walletService
      .findOne(req.user.userId, walletId)
      .catch(({ message }) => {
        this.logger.error(`Error in finding wallet of this id: ${walletId}`, {
          method: 'get',
          errorMessage: message,
        })
        throw new InternalServerErrorException('Error in finding wallet')
      })
    if (!result.success) {
      throw new HttpException(result.message, result.statusCode)
    }
    return result.data!
  }

  @Patch(':walletId')
  @ApiResponse({ status: HttpStatus.OK, type: WalletResponseDto })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'You are not allowed to view this resource',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'This wallet does not exist',
  })
  @ApiBearerAuth()
  async update(
    @Req() req: RequestWithUser,
    @Param('walletId') walletId: string,
    @Body() updateWalletDto: UpdateWalletDto,
  ): Promise<WalletResponseDto | HttpException> {
    const result = await this.walletService
      .update(req.user.userId, walletId, updateWalletDto)
      .catch(({ message }) => {
        this.logger.error(`Error in updating wallet of this id: ${walletId}`, {
          method: 'patch',
          errorMessage: message,
        })
        throw new InternalServerErrorException('Error in updating wallet')
      })
    if (!result.success) {
      throw new HttpException(result.message, result.statusCode)
    }
    return result.data!
  }

  @Delete(':walletId')
  @ApiResponse({ status: HttpStatus.OK, type: DeleteWalletReponseDto })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'You are not allowed to view this resource',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'This wallet does not exist',
  })
  @ApiBearerAuth()
  async deleteOne(
    @Req() req: RequestWithUser,
    @Param('walletId') walletId: string,
  ): Promise<DeleteWalletReponseDto | HttpException> {
    const result = await this.walletService
      .deleteOne(req.user.userId, walletId)
      .catch(({ message }) => {
        this.logger.error(`Error in deleting wallet of this id: ${walletId}`, {
          method: 'delete',
          errorMessage: message,
        })
        throw new InternalServerErrorException('Error in deleting wallet')
      })
    if (!result.success) {
      throw new HttpException(result.message, result.statusCode)
    }
    return {
      message: `Delete wallet of id: ${walletId} is successful`,
      deletedCount: 1,
    }
  }
}
