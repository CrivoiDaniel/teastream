import { PrismaService } from '@/src/core/prisma/prisma.service';
import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginInput } from './inputs/login.input';
import { verify } from 'argon2';
import  type { Request } from 'express';
import { resolve } from 'path';
import { ConfigService } from '@nestjs/config';
import { getSessionMetadata } from '@/src/shared/utils/session-metadata.util';

@Injectable()
export class SessionService {
    public constructor(private readonly prismaService: PrismaService, private readonly configService: ConfigService){}

    public async login(req: Request, input: LoginInput, userAgent: string) {
        const {login, password} = input

        const user = await this.prismaService.user.findFirst({
            where: {
                OR: [
                    {username:{equals:login}},
                    {email:{equals:login}}
                ]
            }
        })
        if (!user) {
            throw new NotFoundException('User not found')
        }

        const isValidPassword = await verify(user.password, password)
        if(!isValidPassword){
            throw new UnauthorizedException('Wrong password')
        }

        const metadata = getSessionMetadata(req, userAgent)

        return new Promise((resolve, reject) => {
            req.session.createdAt = new Date()
            req.session.userId = user.id
            req.session.metadata = metadata

            req.session.save(err => {
                if(err) {
                    return reject(new  InternalServerErrorException('The session could not be saved'))
                }
                resolve(user)
            })
        })
    }
    public async logout(req: Request) {
       return new Promise((resolve, reject) => {
            req.session.destroy(err => {
                if(err) {
                    return reject(new  InternalServerErrorException('Failed to end the session'))
                }
                req.res.clearCookie(this.configService.getOrThrow<string>('SESSION_NAME'))
                resolve(true)
            })
        })
    }
}
// if (req.res) {
//                     req.res.clearCookie(this.configService.getOrThrow<string>('SESSION_NAME'))
//                 }
//                 resolve(true)