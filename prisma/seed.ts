import { PrismaClient } from "@prisma/client";
import { encryptPassword } from "~/data/users/passwordUtils.server";
const prisma = new PrismaClient();
async function main() {
  const password = await encryptPassword("password");
  // creating a single user
  const user = await prisma.user.upsert({
    where: { email: "admin@ppt.io" },
    update: {},
    create: {
      email: "admin@ppt.io",
      password,
    },
  });

  console.log({ user });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
