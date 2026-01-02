import type { SponsorshipPlan, User } from "@/prisma/generated";
import type { SessionMetadata } from "@/src/shared/types/session-metadata.types";

export const MESSAGES = {
  welcome:
    `<b>👋 Welcome to TeaStream Bot!</b>\n\n` +
    `To receive notifications and improve your platform experience, let's link your Telegram account with TeaStream.\n\n` +
    `Click the button below and go to the <b>Notifications</b> section to complete the setup.`,

  authSuccess: `🎉 You have successfully authorized and your Telegram account is linked with TeaStream!\n\n`,

  invalidToken: '❌ Invalid or expired token.',
  profile: (user: User, followersCount: number) =>
    `<b>👤 User profile:</b>\n\n` +
    `Username: <b>${user.username}</b>\n` +
    `Email: <b>${user.email}</b>\n` +
    `Followers count: <b>${followersCount}</b>\n` +
    `About me: <b>${user.bio || 'Not specified'}</b>\n\n` +
    `🔧 Click the button below to go to profile settings.`,

  follows: (user: User) =>
    `📺 <a href="https://teastream.ru/${user.username}">${user.username}</a>`,
  resetPassword: (token: string, metadata: SessionMetadata) =>
    `<b>🔒 Password Reset</b>\n\n` +
    `You requested a password reset for your account on the <b>TeaStream</b> platform.\n\n` +
    `To create a new password, please follow this link:\n\n` +
    `<b><a href="https://teastream.ru/account/recovery/${token}">Reset Password</a></b>\n\n` +
    `📅 <b>Request date:</b> ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}\n\n` +
    `🖥️ <b>Request information:</b>\n\n` +
    `🌍 <b>Location:</b> ${metadata.location.country}, ${metadata.location.city}\n` +
    `📱 <b>Operating system:</b> ${metadata.device.os}\n` +
    `🌐 <b>Browser:</b> ${metadata.device.browser}\n` +
    `💻 <b>IP address:</b> ${metadata.ip}\n\n` +
    `If you did not make this request, simply ignore this message.\n\n` +
    `Thank you for using <b>TeaStream</b>! 🚀`,
  deactivate: (token: string, metadata: SessionMetadata) =>
    `<b>⚠️ Account Deactivation Request</b>\n\n` +
    `You have initiated the process of deactivating your account on the <b>TeaStream</b> platform.\n\n` +
    `To complete the operation, please confirm your request by entering the following confirmation code:\n\n` +
    `<b>Confirmation Code: ${token}</b>\n\n` +
    `📅 <b>Request date:</b> ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}\n\n` +
    `🖥️ <b>Request information:</b>\n\n` +
    `🌍 <b>Location:</b> ${metadata.location.country}, ${metadata.location.city}\n` +
    `📱 <b>Operating system:</b> ${metadata.device.os}\n` +
    `🌐 <b>Browser:</b> ${metadata.device.browser}\n` +
    `💻 <b>IP address:</b> ${metadata.ip}\n\n` +
    `<b>What happens after deactivation?</b>\n\n` +
    `1. You will be automatically logged out and lose access to your account.\n` +
    `2. If you do not cancel the deactivation within 7 days, your account will be <b>permanently deleted</b> with all your information, data, and subscriptions.\n\n` +
    `<b>⌛ Please note:</b> If you change your mind within 7 days, you can contact our support to restore access to your account until the moment of its full deletion.\n\n` +
    `After the account is deleted, it will be impossible to restore it, and all data will be lost without any possibility of recovery.\n\n` +
    `If you changed your mind, simply ignore this message. Your account will remain active.\n\n` +
    `Thank you for using <b>TeaStream</b>! We are always happy to see you on our platform and hope you stay with us. 🚀\n\n` +
    `Sincerely,\n` +
    `The TeaStream Team`,

  accountDeleted:
    `<b>⚠️ Your account has been completely deleted.</b>\n\n` +
    `Your account has been fully wiped from the Teastream database. All your data and information have been permanently removed. ❌\n\n` +
    `🔒 You will no longer receive notifications on Telegram or via email.\n\n` +
    `If you wish to return to the platform, you can register at the following link:\n` +
    `<b><a href="https://teastream.ru/account/create">Register on TeaStream</a></b>\n\n` +
    `Thank you for being with us! We will always be happy to see you on the platform. 🚀\n\n` +
    `Sincerely,\n` +
    `The TeaStream Team`,

  streamStart: (channel: User) =>
    `<b>📡 A broadcast has started on the ${channel.displayName} channel!</b>\n\n` +
    `Watch here: <a href="https://teastream.ru/${channel.username}">Go to broadcast</a>`,

  newFollowing: (follower: User, followersCount: number) =>
    `<b>You have a new follower!</b>\n\nThis is user <a href="https://teastream.ru/${follower.username}">
  ${follower.displayName}</a>\n\nTotal number of followers on your channel: ${followersCount}`,

  newSponsorship: (plan: SponsorshipPlan, sponsor: User) =>
    `<b>🎉 New sponsor!</b>\n\n` +
    `You have received a new sponsorship for the plan <b>${plan.title}</b>.\n` +
    `💰 Amount: <b>${plan.price} ₽</b>\n` +
    `👤 Sponsor: <a href="https://teastream.ru/${sponsor.username}">${sponsor.displayName}</a>\n` +
    `🗓 Date: <b>${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</b>\n\n` +
    `Thank you for your work and support on the TeaStream platform!`,
  enableTwoFactor:
    `🔐 Ensure your security!\n\n` +
    `Enable two-factor authentication in <a href="https://teastream.ru/dashboard/settings">account settings</a>.`,
  verifyChannel:
    `<b>🎉 Congratulations! Your channel is verified</b>\n\n` +
    `We are pleased to inform you that your channel is now verified, and you have received an official badge.\n\n` +
    `The verification badge confirms the authenticity of your channel and improves viewer trust.\n\n` +
    `Thank you for being with us and continuing to grow your channel with TeaStream!`
}