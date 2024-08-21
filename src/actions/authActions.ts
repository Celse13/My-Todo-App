"use server";

import { signOut } from "../../auth";

export const googleSignOut = async() => {
    await signOut({redirectTo: "/" });
}
