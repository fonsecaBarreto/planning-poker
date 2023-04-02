
import type { Task } from "@prisma/client";
import { db } from "~/utils/db.server";

export function getTasks(): any{
  return db.task.findMany({ orderBy: {createdAt: 'desc'} });
}

export function getTaskById(taskId: string): any{
  return db.task.findFirst({ where: { id: taskId} });
}

export function createTask(dto: Pick<Task, "description">) {
  const { description } = dto;
  return db.task.create({ data: { description, punctuation: 0 } });
}

