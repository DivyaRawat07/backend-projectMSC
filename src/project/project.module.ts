import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResponseHandlerService } from 'src/helper/response-handler.service';
import { ProjectController } from './project.controller';
import { ProjectSchema } from './project.schema';
import { ProjectService } from './project.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Project', schema: ProjectSchema }])
    ],
    controllers: [ProjectController],
    providers: [ProjectService, ResponseHandlerService],
    exports: [ProjectService, ResponseHandlerService]
})
export class ProjectModule {}
