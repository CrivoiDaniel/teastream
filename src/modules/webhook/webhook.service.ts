import { PrismaService } from '@/src/core/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { LivekitService } from '../libs/livekit/livekit.service';

@Injectable()
export class WebhookService {
    public constructor(
        private readonly prismaService: PrismaService,
        private livekitService: LivekitService) {}
    
    public async receiveWebhookLivekit(body: string, authorization: string) {

        const event = await this.livekitService.receiver.receive(
            body, 
            authorization, 
            true // sunt unele probleme de siguranta cu true , daca la voi merge f[r[ true atunc isal scoateti]]
        ) 

        if(event.event === 'ingress_started'){
            console.log('STREAM STARTED:', event.ingressInfo.url)
            await this.prismaService.stream.update({
                where: {
                    ingressId: event.ingressInfo.ingressId
                },
                data: {
                    isLive: true
                }
            })

        }
        if(event.event === 'ingress_ended') {
            await this.prismaService.stream.update({
                where: {
                    ingressId: event.ingressInfo.ingressId
                },
                data: {
                    isLive: false
                }
            })
        }

    }
}
