import bcrypt from "bcryptjs";

const password = process.argv[2];
if (!password) {
  console.error("Uso: node scripts/hash-password.mjs \"sua-senha\"");
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 12);
console.log(hash);
