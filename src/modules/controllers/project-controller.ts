import { Project, ProjectModel } from "@models/project";
import success from "@modules/responses/success";
import PaginateService from "@modules/services/paginate";
import { Router } from "express";
import mongoose from "mongoose";
import BaseController from "./base-controller";

export class ProjectController extends BaseController {
    listen(router: Router): void {
  
      //Get project by ID
      router.get("/:id", async (req, res, next) => {
        const project = await this.byId(req.params.id);
        res.send({
          sucess: true,
          data: project,
        });
        next()
      });

      //Get project
      router.get("/", async (req, res, next) => {
        const projects = ProjectModel.find();
  
        res.send(success(await PaginateService.paginate(req, ProjectModel, projects)));
        next()
      });
    }
    
    public byId(_id: string) {
        return ProjectModel.findOne<Project>({ _id: new mongoose.Types.ObjectId(_id) });
    }
  }