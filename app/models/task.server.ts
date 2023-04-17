
import type { Task } from "@prisma/client";
import { db } from "~/utils/db.server";

export function getTasks(): Promise<Task[]>{
  return db.task.findMany({ orderBy: {createdAt: 'desc'} });
}

export function getTaskById(taskId: string): any{
  return db.task.findFirst({ where: { id: taskId}, include: { punctuations: { include: { user: true }}} });
}

export async function createTask(dto: Pick<Task, "description">): Promise<Task> {
  const { description } = dto;
  const task = await db.task.create({ data: { description } });
  return task
}

export function punctuate({userId, taskId, punctuation}: any): Promise<any>{
  return db.taskPunctuations.upsert({
    where: { taskId_userId: { taskId, userId} },
    update: {
      value: punctuation,
    },
    create: {
      userId,
      taskId,
      value: punctuation,
    },
  });
}

export async function close({taskId}: any): Promise<void>{
  await db.task.update({ where:{ id: taskId }, data: { isClosed: true} });
  return;
}

export async function open({ taskId }: { taskId: string }): Promise<void> {
  await db.task.update({ where: { id: taskId }, data: { isClosed: false } });
  await db.taskPunctuations.deleteMany({ where: { taskId } });
  return;
}
