import { getRepository } from 'typeorm';
import { Project } from '../orm/entity/Project';
import { Whiteboard } from '../orm/entity/Whiteboard';

export const find = async projectId => {
  const repo = getRepository(Project);
  const project = await repo.findOne(projectId);
  return project.whiteboards;
};

export const save = async (projectId, base) => {
  const projectRepo = getRepository(Project);
  const whiteboardRepo = getRepository(Whiteboard);
  const project = await projectRepo.findOne(projectId);
  const whiteboard = {
    ...base,
    project
  } as Whiteboard;
  const newWhiteboard = await whiteboardRepo.save(whiteboard);

  return {
    id: newWhiteboard.id,
    name: newWhiteboard.name
  };
};

export const remove = async id => {
  const whiteboardRepo = getRepository(Whiteboard);
  return whiteboardRepo.remove(await whiteboardRepo.findOne(id));
};

export const update = async (id, base) => {
  const whiteboardRepo = getRepository(Whiteboard);
  const orig = await whiteboardRepo.findOne(id);
  const patched = {
    ...orig,
    ...base
  } as Whiteboard;
  return whiteboardRepo.save(patched);
};
