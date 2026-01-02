import { ConfigService } from "@nestjs/config";
import { TypeStripeAsyncOptions, TypeStripeOptions } from "../modules/libs/stripe/types/stripe.types";

export function getStripeConfig(configService: ConfigService): TypeStripeOptions{
    return {
        apiKey: configService.getOrThrow<string>('STRIPE_SECRET_KEY'),
        config: {
            apiVersion: '2025-12-15.clover'
        }

    }
}