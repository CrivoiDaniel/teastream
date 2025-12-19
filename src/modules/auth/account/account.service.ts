import { PrismaService } from '@/src/core/prisma/prisma.service';
import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserInput } from './inputs/create-user.input';
import { hash } from 'argon2';
import { VerificationService } from '../verification/verification.service';

@Injectable()
export class AccountService {
    public constructor(
            private readonly prismaService: PrismaService,
            private readonly verificationServie: VerificationService
        ){}
        
    public async me(id: string){
        const user = await this.prismaService.user.findUnique({
            where: {
                id
            }
        })
        return user
    }

    public async create(input: CreateUserInput){

        const {username, email, password} = input;

        const isUsernameExists = await this.prismaService.user.findUnique({
            where: {
                username
            }
        })
        if(isUsernameExists) {
            throw new ConflictException("This name is already used.")
        }
        const isEmailExists = await this.prismaService.user.findUnique({
            where: {
                email
            }
        })
        if(isEmailExists) {
            throw new ConflictException("This email is already used.")
        }

        const user = await this.prismaService.user.create({
            data: {
                username,
                email,
                password: await hash(password),
                displayName: username
            }
        })
        
        await this.verificationServie.sendVerificationToken(user)
        return true

    }
}
