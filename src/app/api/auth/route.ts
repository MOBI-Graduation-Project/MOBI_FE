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
  const text = await res.text();

  try {
    const data = JSON.parse(text);
    return NextResponse.json(data);
  } catch (err) {
    console.error("JSON parse error:", err);
    return NextResponse.json(
      { error: "Invalid JSON response", raw: text.slice(0, 200) },
      { status: 500 },
    );
  }
}
