import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const body: Auth = await req.json();
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  try {
    let results;
    if (body.type === "login") {
      const response = await fetch(`${backendUrl}/auth.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: body.email,
          password: body.password,
          type: body.type,
        }),
      });
      results = await response.json();
    } else if (body.type === "register") {
      const response = await fetch(`${backendUrl}/auth.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: body.email,
          password: body.password,
          confirmPassword: body.confirmPassword,
          upline: body.upline,
          username: body.username,
          type: body.type,
          phone: body.phone,
          name: body.name,
          country: body.country
        }),
      });
      results = await response.json();
    }

    if (!results) {
      return NextResponse.json(
        { status: "Error", message: "No response from backend" },
        { status: 500 }
      );
    }

    // Create token
    const token = jwt.sign(
      { userID: results.userID },
      process.env.JWT_SECRET as string,
    );

    // Create response
    const res = NextResponse.json(
      { status: results.status, message: results.message, userID: results.userID, token },
      { status: 200 }
    );

    res.cookies.set({
      name: "susyr7q3ycugfWDFF",
      value: token,
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return res;
  } catch (error) {
    console.error("AuthError", error);
    return NextResponse.json(
      { status: "Error", message: "An error occurred while authenticating" },
      { status: 400 }
    );
  }
}