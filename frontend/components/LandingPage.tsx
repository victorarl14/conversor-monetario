"use client";
import CurrencyConverter from "@/components/currency-converter";
import ExchangeRatesDisplay from "@/components/exchange-rates-display";
import { TrendingUp, Shield, Clock, Globe } from "lucide-react";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white shadow-sm border-b dark:bg-gray-900 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">Cambio Oficial</h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">Tasas oficiales del BCV</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 mr-12">
              <div className="flex items-center space-x-1">
                <Shield className="h-4 w-4 text-green-600" />
                <span>Oficial</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
          {/* Conversor principal */}
          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Conversor de Monedas</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Convierte cualquier moneda a bolívares venezolanos usando las tasas oficiales del BCV
              </p>
            </div>
            <CurrencyConverter />
          </div>

          {/* Panel de tasas */}
          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Tasas Actuales</h2>
              <p className="text-gray-600 dark:text-gray-300">Consulta las tasas de cambio oficiales actualizadas</p>
            </div>
            <ExchangeRatesDisplay />
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-white/80 border border-gray-200 rounded-lg shadow-lg dark:bg-gray-900 dark:border-gray-700 dark:shadow-2xl">
            <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-4 dark:bg-blue-900">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Tiempo Real</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Tasas actualizadas constantemente según el BCV oficial</p>
          </div>

          <div className="text-center p-6 bg-white/80 border border-gray-200 rounded-lg shadow-lg dark:bg-gray-900 dark:border-gray-700 dark:shadow-2xl">
            <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-4 dark:bg-green-900">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Confiable</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Basado en las tasas oficiales del Banco Central de Venezuela</p>
          </div>

          <div className="text-center p-6 bg-white/80 border border-gray-200 rounded-lg shadow-lg dark:bg-gray-900 dark:border-gray-700 dark:shadow-2xl">
            <div className="bg-purple-100 p-3 rounded-full w-fit mx-auto mb-4 dark:bg-purple-900">
              <Globe className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Múltiples Monedas</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Convierte USD, EUR, GBP, CNY y más a bolívares</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16 dark:bg-black dark:text-gray-300">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <TrendingUp className="h-5 w-5" />
            <span className="font-semibold">Cambio Oficial</span>
          </div>
          <p className="text-gray-400 text-sm">Conversor de monedas basado en tasas oficiales venezolanas</p>
          <p className="text-gray-500 text-xs mt-2 dark:text-gray-400">
            © {mounted ? currentYear : "2024"} Cambio Oficial. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
} 