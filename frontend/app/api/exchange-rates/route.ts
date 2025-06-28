import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Hacer petición al backend NestJS
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'}/currency/exchange-rates`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const result = await response.json()

    if (result.success) {
      return NextResponse.json(result)
    }

    return NextResponse.json(result, { status: 400 })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Error al obtener las tasas de cambio" }, { status: 500 })
  }
} 