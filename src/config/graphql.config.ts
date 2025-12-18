import { IS_DEV_ENV, isDev } from "@/src/shared/utils/is-dev.util";
import type { ApolloDriverConfig } from "@nestjs/apollo";
import { ConfigService } from "@nestjs/config";
import { join } from "path";

export function getGraphQLConfig(configService: ConfigService): ApolloDriverConfig {
  return {
    playground: isDev(configService) ? {
      settings: {
        'request.credentials': 'include', // ← ADAUGĂ ASTA
      }
    } : false,
    path: configService.getOrThrow<string>('GRAPHQL_PREFIX'),
    autoSchemaFile: join(process.cwd(), 'src/core/graphql/schema.gql'),
    sortSchema: true,
    context: (({ req, res }) => ({ req, res }))
  }
}