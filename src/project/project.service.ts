/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as grpc from 'grpc';
import { Model } from 'mongoose';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ResponseHandlerService } from 'src/helper/response-handler.service';
import { Project } from './project.interface';
const GrpcStatus = grpc.status;

@Injectable()
export class ProjectService {
    private sentryService: any;
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        @InjectModel('Project') private projectModel: Model<Project>,
        private readonly responseHandlerService: ResponseHandlerService
    ) {}

    async createProject(createProjectDto) {
        try {
            // fetching global variables from platformConstant
            const createdProject = new this.projectModel(createProjectDto);

            const project = await createdProject.save();
            console.log('project', project);
            return {
                success: 'true',
                message: 'Project created',
                project: project
            };
        } catch (e) {
            await this.sentryService.captureException(e);
            await this.responseHandlerService.response(
                e,
                HttpStatus.CREATED,
                GrpcStatus.UNAUTHENTICATED,
                null
            );
        }
    }

    async getProjectById(getProjectByIdDto) {
        let getProject = null;
        try {
            // fetching project via userid
            getProject = await this.projectModel.findOne({
                _id: getProjectByIdDto._id
            });
        } catch (err) {
            await this.sentryService.captureException(err);
            await this.responseHandlerService.response(
                'project not found',
                HttpStatus.NOT_FOUND,
                GrpcStatus.NOT_FOUND,
                null
            );
        }
        // check if project exists
        if (!getProject) {
            await this.responseHandlerService.response(
                'project not found',
                HttpStatus.NOT_FOUND,
                GrpcStatus.NOT_FOUND,
                null
            );
        }
        return getProject;
    }

    async getAllProjectsById(getAllProjectsDto) {
        const matches: any = {};

        const sort: any = {};

        if (getAllProjectsDto.sortBy) {
            sort[getAllProjectsDto.sortBy] = getAllProjectsDto.sortOrder || -1;
        } else {
            sort['createdAt'] = -1;
        }

        const limit = parseInt(getAllProjectsDto.limit || 10);
        let offset = parseInt(getAllProjectsDto.offset || 10) - limit;
        if (offset < 0) {
            offset = 0;
        }
        try {
            // fetching projects and applying pagination
            var totalProjects = await this.projectModel.count(matches);
            var projects = await this.projectModel
                .find(matches, { password: false })
                .sort(sort)
                .skip(offset)
                .limit(limit);
        } catch (e) {
            await this.sentryService.captureException(e);
            await this.responseHandlerService.response(
                e,
                HttpStatus.NOT_FOUND,
                GrpcStatus.NOT_FOUND,
                null
            );
        }

        // check if projects exists
        if (projects.length === 0) {
            await this.responseHandlerService.response(
                'no projects found',
                HttpStatus.NOT_FOUND,
                GrpcStatus.NOT_FOUND,
                null
            );
        }

        projects = await Promise.all(
            projects.map(async (project) => {
                return project;
            })
        );
        console.log({ projects });

        return { totalProjects, projects: projects };
    }
    async editProject(editProjectDto) {
        try {
            var projectDetails = await this.projectModel.findOne({
                _id: editProjectDto._id
            });
            if (!projectDetails) {
                await this.responseHandlerService.response(
                    'project not found',
                    HttpStatus.NOT_FOUND,
                    GrpcStatus.NOT_FOUND,
                    null
                );
            } else {
                const updatedDetails =
                    await this.projectModel.findByIdAndUpdate(
                        editProjectDto._id,
                        editProjectDto
                    );
                return {
                    success: true,
                    message: 'project updated',
                    project: updatedDetails
                };
            }
        } catch (err) {
            await this.sentryService.captureException(err);
            await this.responseHandlerService.response(
                'project not found',
                HttpStatus.NOT_FOUND,
                GrpcStatus.NOT_FOUND,
                null
            );
        }
    }
}
