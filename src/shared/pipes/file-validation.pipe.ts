import {  type ArgumentMetadata, BadRequestException, Injectable, type PipeTransform } from "@nestjs/common";
import { ReadStream } from "fs";
import { validateFileFormat, validateFileSize } from "../utils/file.util";

@Injectable()
export class FileValidationPipe implements PipeTransform {
    public async transform(value:any, metadata: ArgumentMetadata) {

        if(!value.fileName) {
            throw new BadRequestException('File not upload')
        }
        const {fileName, createReadStream} = value

        const fileStram = createReadStream() as ReadStream

        const allowedFormats = ['jpg', 'jpeg', 'png', 'webp', 'gif']
        const isFileFormatValid = validateFileFormat(fileName, allowedFormats)

        if(!isFileFormatValid){
            throw new BadRequestException('Unsupported file format')
        }

        const isFileSizeValid = await validateFileSize(fileStram, 10*1024*1024) //10mb
        if(!isFileSizeValid){
            throw new BadRequestException('File is larger than 10 MB')
        }
        return value
    }
}