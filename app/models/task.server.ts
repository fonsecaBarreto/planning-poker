
import type { Task } from "@prisma/client";
import { db } from "~/utils/db.server";

export function getTasks(): Promise<Task[]>{
  return db.task.findMany({ orderBy: {createdAt: 'desc'} });
}

export function getTaskById(taskId: string): any{
  return db.task.findFirst({ where: { id: taskId}, include: { punctuations: { include: { user: true }}} });
}

export function createTask(dto: Pick<Task, "description">): Promise<any> {
  const { description } = dto;
  return db.task.create({ data: { description } });
}

export function punctuate({userId, taskId, punctuation}: any): Promise<any>{
  return db.taskPunctuations.create({ data: { userId, taskId, value: punctuation } });
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
