import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService) { }

    async login(email: string, password: string) {
        let user: any = await this.prisma.user.findFirst({
            where: {
                email: email
            }
        })
        
        if(!user) return {statusCode: 404, message: 'User not found'}

        const isMatch = await bcrypt.compare(password, user.password);
        
        if(isMatch){
            let userData = {
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                roles: ['admin']
            }

            let data = { 
                user: userData,
                token: {
                    access_token: this.jwt.sign(userData),
                    refresh_token: this.generateShortRefreshToken()
                }
            }
            
            return {statusCode: 200, message: 'Login Success', data: data};
        }else{
            return {
                statusCode: 401,
                message: 'Wrong password'
            }
        }
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

    

    generateShortRefreshToken(){
        return randomBytes(16).toString('hex'); // 64 karakter hex
    }

}