/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ProjectService } from './project.service';

@Controller()
export class ProjectController {
    constructor(private projectService: ProjectService) {}

    @GrpcMethod('ProjectService', 'createProject')
    async createProject(createProjectDto) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return await this.projectService.createProject(createProjectDto);
    }
    @GrpcMethod('ProjectService', 'getProjectById')
    async getProjectById(getProjectByIdDto) {
        return await this.projectService.getProjectById(getProjectByIdDto);
    }
    @GrpcMethod('ProjectService', 'getAllProjectsById')
    async getAllProjectsById(getAllProjectsByIdDto) {
        return await this.projectService.getAllProjectsById(
            getAllProjectsByIdDto
        );
    }
    @GrpcMethod('ProjectService', 'editProject')
    async editProject(editProjectDto) {
        return await this.projectService.editProject(editProjectDto);
    }
}
