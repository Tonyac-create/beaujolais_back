import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose"

export type UserDocument = HydratedDocument<User>

@Schema({ collection: "user", timestamps: true, versionKey: false })
export class User {
    
    @Prop({ required: true, type: String})
    nickname: String

    @Prop({ unique: true, required: true, type: String })
    email: String

    @Prop({ required: true, type: String })
    password: String

    @Prop({ type: String })
    avatar?: String
}

export const userSchema = SchemaFactory.createForClass(User)