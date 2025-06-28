import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Hacer petición al backend NestJS
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'}/currency/convert`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const result = await response.json()

    if (result.success) {
      return NextResponse.json(result)
    }

    return NextResponse.json(result, { status: 400 })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Error al procesar la solicitud" }, { status: 500 })
  }
} 