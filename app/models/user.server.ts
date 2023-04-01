const usuarios: any[] = [];

export function getUserById(userId: string): any{
  return { id: "asdas", nickName: "asdad" };
}

export async function createUser({ nickName }: any) {
  const user = { id: String(usuarios.length + 1), nickName };
  usuarios.push(user);
  return user;
}
