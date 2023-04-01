import fs from "fs";
import path from "path";

const file_name = path.resolve(__dirname,'users.json')
    
export function findManyUsers(/* userIds: string[] */): any{
  const { users }  = (require(file_name));
  const result = users;
  //  users.filter((u: any) => userIds.includes(u.id));
  return result;
}

export function getUserById(userId: string): any{
  const { users }  = (require(file_name));
  const user = users.find((u: any) => u.id === userId);
  return user;
}

export async function createUser({ nickName }: any) {
  const { users }  = (require(file_name));
  const user = { id: String(users.length + 1), nickName };
  fs.writeFileSync(file_name, JSON.stringify({ users: [ ...users, user ] }, null, 4));
  return user;
}

export async function updateUser( userId: string, { nickName }: any) {
  const { users }: { users: any[]}  = (require(file_name));
  const user = getUserById(userId);
  const new_list = users.splice( users.findIndex(u=>u.id === userId), 1, { ...user, nickName})
  fs.writeFileSync(file_name, JSON.stringify(new_list, null, 4));
  return;
}

