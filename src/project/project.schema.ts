/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as mongoose from 'mongoose';
import { Project } from './project.interface';

export const ProjectSchema = new mongoose.Schema<Project>(
  {
    customerName: {
      type: String,
      default:null
    },
    projectName: {
      type: String,
      default:null
    },
    projectEndDate: {
      type: String,
      default:null
    },
    projectStartDate: {
      type: String,
      default:null
    },
    projectStatus: {
      type: String,
      default:null
    },
    projectHealth: {
      type: String,
      default:null
    },
    accountManager: {
      type: String,
      default:null
    },
    resources: {
      type: String,
      default:null
    },
    comments: {
      type: String,
      default:null
    },
    priSecPM: {
      type: String,
      default:null
    },
    confluenceLink: {
      type: String,
      default:null
    },
    salesPerson:{
      type: String,
      default:null
    },
    department:{
      type: String,
      default:null
    },
    resourceName:{
      type: String,
      default:null
    },
    utilization:{
      type: String,
      default:null
    },
},
  {
    timestamps: true,
  },
);
export const project = mongoose.model('Project', ProjectSchema);
