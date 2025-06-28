import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Al Cambio VE - Conversor de Monedas',
  description: 'Aplicación para convertir monedas en tiempo real',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
} 