import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable } from '@nestjs/common';

const ObjectId = require('mongodb').ObjectId;

@Injectable()
export class UsersStrategy extends PassportStrategy(Strategy) {
    async validate(id: string) {
        if (!ObjectId.IsValid(id))
            throw new BadRequestException("Id informed is not a valid ObjectIc!");
        return true;

    }
}