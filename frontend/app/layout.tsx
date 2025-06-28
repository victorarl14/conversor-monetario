import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Conversor Monetario',
  description: 'Conversor de monedas con tasas oficiales venezolanas',
  generator: 'v1.0.0',
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