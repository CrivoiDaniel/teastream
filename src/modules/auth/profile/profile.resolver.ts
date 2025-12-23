import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import { Authorized } from '@/src/shared/decorators/authorized.decorator';
import type { User } from '@/prisma/generated';
import { Authorization } from '@/src/shared/decorators/auth.decorator';
import { FileValidationPipe } from '@/src/shared/pipes/file-validation.pipe';
import { ChangeProfileInfoInput } from './inputs/change-profile-info.input';
import { GraphQLUpload, FileUpload } from 'graphql-upload'; 

@Resolver('Profile')
export class ProfileResolver {
  public constructor(private readonly profileService: ProfileService) { }

  @Authorization()
  @Mutation(() => Boolean, { name: 'changeProfileAvatar' })
  public async changeAvatar(
    @Authorized() user: User,
    @Args('avatar', { type: () => GraphQLUpload }, FileValidationPipe) avatar: FileUpload) {
    this.profileService.changeAvatar(user, avatar)
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'removeProfileAvatar' })
  public async removeAvatar(
    @Authorized() user: User) {
    this.profileService.removeAvatar(user)
  }

  @Authorization()
  @Mutation(() => Boolean, { name: 'changeProfileInfo' })
  public async changeInfo(
    @Authorized() user: User,
    @Args('data') input: ChangeProfileInfoInput) {
    this.profileService.changeInfo(user, input)
  }
}
