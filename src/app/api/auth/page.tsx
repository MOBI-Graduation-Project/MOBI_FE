import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { code } = body;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    },
  );

  const data = await res.json();
  return NextResponse.json(data);
}
