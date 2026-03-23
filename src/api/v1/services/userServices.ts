import { auth } from "../../../config/firebaseConfig";

export type UserRole = "admin" | "user";

export const getUserDetails = async (uid: string) => {
  const userRecord = await auth.getUser(uid);

  return {
    uid: userRecord.uid,
    email: userRecord.email,
    emailVerified: userRecord.emailVerified,
    disabled: userRecord.disabled,
    customClaims: userRecord.customClaims || {},
    metadata: userRecord.metadata,
  };
};

export const setUserRole = async (uid: string, role: UserRole) => {
  const claims =
    role === "admin"
      ? { admin: true, role: "admin" }
      : { admin: false, role: "user" };

  await auth.setCustomUserClaims(uid, claims);

  return {
    uid,
    claims,
  };
};