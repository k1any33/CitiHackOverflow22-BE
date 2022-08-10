import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type WalletDocument = Wallet & Document

@Schema({
  collection: 'wallets',
  versionKey: false,
  _id: true,
  timestamps: true,
})
export class Wallet {
  @Prop({ unique: true, required: true, type: String })
  walletId: string

  @Prop({ required: true, type: String })
  userId: string

  @Prop({ required: true, type: String })
  walletName: string

  @Prop({ required: true, type: String })
  walletDescription: string

  @Prop({ required: false, type: String })
  walletLogo?: string
}

export const WalletSchema = SchemaFactory.createForClass(Wallet)
