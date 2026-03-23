import { auth } from "./config/firebaseConfig";

const makeAdmin = async () => {
  const uid = "PASTE_ADMIN_UID_HERE";

  await auth.setCustomUserClaims(uid, {
    admin: true,
    role: "admin",
  });

  console.log("Admin role assigned successfully");
};

makeAdmin().catch(console.error);