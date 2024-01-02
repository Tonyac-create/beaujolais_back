import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from 'mongoose'

@Schema({ timestamps: true, versionKey: false })
export class User {

    @Prop({ required: true, unique: true, type: String})
    nickname: string

    @Prop({ required: true, unique: true, type: String})
    email: string

    @Prop({ required: true, type: String})
    password: string

    @Prop()
    refreshToken: string
}

export type UserDocument = HydratedDocument<User>

export const UserSchema = SchemaFactory.createForClass(User)
