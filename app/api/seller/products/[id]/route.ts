import { NextResponse } from "next/server";

interface Params {
    params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: Params) {
    const { id } = await params;

    try {
        const res = await fetch(`http://localhost:4007/products/${id}`, {
            method: `GET`,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) throw new Error("Gagal mengambil data dari Java API");

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ message: "Server Error:" + error }, { status: 500 });
    }
}

export async function UPDATE(request: Request, { params }: Params) {
    const { id } = await params;

    try {
        const res = await fetch(`http://localhost:4007/products/${id}`, {
            method: `PUT`,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(await request.json()),
        });

        if (!res.ok) throw new Error("Gagal mengambil data dari Java API");

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ message: "Server Error:" + error }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: Params) {
    const { id } = await params;

    try {
        const res = await fetch(`http://localhost:4007/products/${id}`, {
            method: `DELETE`,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) throw new Error("Gagal mengambil data dari Java API");

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ message: "Server Error:" + error }, { status: 500 });
    }
}