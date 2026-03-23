import { auth } from "./config/firebaseConfig";

const makeAdmin = async () => {
  const uid = "qf15w8TcmIP5pQBQ2ug7AVSHeny2";

  await auth.setCustomUserClaims(uid, {
    admin: true,
    role: "admin",
  });

  console.log("Admin role assigned successfully");
};

makeAdmin().catch(console.error);