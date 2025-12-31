import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { NotificationService } from './notification.service';
import { Authorized } from '@/src/shared/decorators/authorized.decorator';
import { User } from '@/prisma/generated';
import { NotificationModel } from './models/notification.model';
import { Authorization } from '@/src/shared/decorators/auth.decorator';
import { ChangeNotificationsSettingsResponse } from './models/notifications-settings.model';
import { ChangesNotificationsSettingsInput } from './inputs/change-notifications-settings.input';


@Resolver('Notification')
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) {}

  @Authorization()
  @Query(() => Number, {name: 'findNotificationsUnreadCount'})
  public async findUnreadCount(@Authorized() user: User) {
    return this.notificationService.findUnreadCount(user)
  }

  @Authorization()
  @Query(() => [NotificationModel], {name: 'findNotificationsByUser'})
  public async findByUser(@Authorized() user: User) {
    return this.notificationService.findByUser(user)
  }


    @Authorization()
    @Mutation(() => ChangeNotificationsSettingsResponse, {name: 'changeNotificationsSettings'})
  public async changeSettings(@Authorized() user: User, @Args('data') input: ChangesNotificationsSettingsInput) {
    return this.notificationService.changeSettings(user, input)
  }
}
