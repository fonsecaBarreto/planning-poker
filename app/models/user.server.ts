
import { db } from "~/utils/db.server";

export function findManyUsers(/* userIds: string[] */): any{
  return [];
}

export function getUserById(userId: string): any{
  return db.user.findFirst({ where: { id: userId} });
}

export function createUser({ nickName }: any) {
  return db.user.create({ data: { nickName } });
}

