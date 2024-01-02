import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose"

export type UserDocument = HydratedDocument<User>

@Schema({ collection: "user", timestamps: true, versionKey: false })
export class User {

    @Prop({
        required: true,
        type: String,
        unique: true
    })
    nickname: string

    @Prop({
        unique: true,
        required: true,
        type: String
    })
    email: string

    @Prop({
        required: true,
        type: String
    })
    password: string

}

export const UserSchema = SchemaFactory.createForClass(User)