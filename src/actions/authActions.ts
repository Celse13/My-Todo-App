import db from "@/database/drizzle";
import { userSchema } from "@/database/userSchema";
import bcrypt from "bcrypt";

const registerUser = async (email: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.insert(userSchema).values({ email, password: hashedPassword });
};

const loginUser = async (email: string, password: string) => {
    const user = await db.select().from(userSchema).where(userSchema.email.equals(email)).single();
    if (user && await bcrypt.compare(password, user.password)) {
        return user;
    }
    throw new Error("Invalid email or password");
};

export { registerUser, loginUser };
