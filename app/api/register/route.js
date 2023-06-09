import bcrypt from "bcrypt";

import client from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request) {

    try {     
        const body = await request.json();
    
        const { email, name, password } = body;
    
        if (!email || !name || !password) {
            return new NextResponse("Missing info", {status: 400});
        }
    
        const hashedPassword = await bcrypt.hash(password, 12);
    
        const user = await client.user.create({
            data: {
                email,
                name,
                hashedPassword
            }
        });
    
        return NextResponse.json(user);
    } catch (error) {
        console.log(error, "registration error");
        return new NextResponse("Internal error", { status: 500 });
    }

}