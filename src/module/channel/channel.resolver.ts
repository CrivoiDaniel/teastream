import { Args, Query, Resolver } from '@nestjs/graphql';
import { ChannelService } from './channel.service';
import { UserModel } from '@/src/modules/auth/account/models/user.model';
import { Authorization } from '@/src/shared/decorators/auth.decorator';
import { SubscriptionModel } from '@/src/modules/sponsorship/subscription/models/subscription.model';
import { Authorized } from '@/src/shared/decorators/authorized.decorator';
import { UserInputError } from '@nestjs/apollo';
import { User } from '@/prisma/generated';

@Resolver('Channel')
export class ChannelResolver {
  public constructor(private readonly channelService: ChannelService) { }

  @Query(() => [UserModel], { name: 'findRecommendedChannels' })
  public async findRecomended() {
    return this.channelService.findRecommended()
  }

  @Query(() => UserModel, { name: 'findChannelByUsername' })
  public async findByUsername(@Args('username') username: string) {
    return this.channelService.findByUsername(username)
  }

  @Query(() => Number, { name: 'findFollowersCountByChannel' })
  public async findFollowersCountByChannel(@Args('channelId') channelId: string) {
    return this.channelService.findFollowersCountByChannel(channelId)
  }

  @Authorization()
  @Query(() => [SubscriptionModel], { name: 'findSponsorsByChannel' })
  public async finSponsorsByChannel(@Args('channelId') channelId: string, user: User) {
    return this.channelService.findSponsorsByChannel(channelId)

  }
}
