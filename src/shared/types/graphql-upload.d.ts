declare module 'graphql-upload' {
  import { ReadStream } from 'fs';

  export const graphqlUploadExpress: any;
  export const GraphQLUpload: any;

  export interface FileUpload {
    fileName: string;
    mimeType: string;
    encoding: string;
    createReadStream(): ReadStream;
  }
}
