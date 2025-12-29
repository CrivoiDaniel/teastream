import { PrismaService } from '@/src/core/prisma/prisma.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { SendMessageInput } from './inputs/send-message.input';
import { use } from 'react';
import { User } from '@/prisma/generated';
import { ChnangeChatSettingsInput } from './inputs/change-chat-settings.input';

@Injectable()
export class ChatService {
    public constructor(private readonly prismaService: PrismaService) { }

    public async findByStream(streamId: string) {
        const messages = await this.prismaService.chatMessage.findMany({
            where: {
                streamId
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                user: true
            }
        })
        return messages
    }

    public async sendMessage(
        userId: string,
        input: SendMessageInput
    ) {
        const { text, streamId } = input

        const stream = await this.prismaService.stream.findUnique({
            where: {
                id: streamId
            }
        })
        if (!stream) {
            throw new NotFoundException('Stream not found')
        }
        if (!stream.isLive) {
            throw new BadRequestException('Stream is not in live mode')
        }

        const meessage = await this.prismaService.chatMessage.create({
            data: {
                text,
                user: {
                    connect: {
                        id: userId
                    }
                },
                stream: {
                    connect: {
                        id: streamId
                    }
                }
            },
            include: {
                stream: true
            }
        })
        return meessage
    }

    public async changeSettings(user: User, input: ChnangeChatSettingsInput){
        const {
            isChatEnabled,
            isChatFollowersOnly,
            isChatPremiumFollowersOnly
        } = input

        const message = await this.prismaService.stream.update({
            where: {
                userId: user.id
            },
            data: {
                isChatEnabled, isChatFollowersOnly, isChatPremiumFollowersOnly
            }
        })
        return message
    }

}
