interface UserRecord {
  uid: string;
  email: string;
  role: "admin" | "user";
}

const users: UserRecord[] = [
  {
    uid: "admin-001",
    email: "admin@example.com",
    role: "admin",
  },
  {
    uid: "user-001",
    email: "user@example.com",
    role: "user",
  },
];

export const getUserDetails = async (
  uid: string
): Promise<UserRecord | undefined> => {
  return users.find((user) => user.uid === uid);
};

export const setUserRole = async (
  uid: string,
  role: "admin" | "user"
): Promise<UserRecord | undefined> => {
  const user = users.find((item) => item.uid === uid);

  if (!user) {
    return undefined;
  }

  user.role = role;
  return user;
};