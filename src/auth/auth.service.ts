import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService) { }

    login(username: string, password: string) {
        let data = { 
            user: {
                id: 1,
                roles: ['admin']
            }
        }
        return {
            access_token: this.jwt.sign(data),
            data: data
        };
    }

    async validateBasic(username: string, password: string) {
        const auth = username == process.env.BASIC_USERNAME && password == process.env.BASIC_PASSWORD
        return auth ? true : false
    }

    async loginJwt(user: { id: number; email: string }) {
        return {
            access_token: this.jwt.sign({ email: user.email, sub: user.id }),
        };
    }

}