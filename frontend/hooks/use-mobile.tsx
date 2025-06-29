import { useEffect, useState } from "react";

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const MOBILE_BREAKPOINT = 768; // Usa el valor que corresponda en tu app
    const handleResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    handleResize(); // Ejecuta al montar
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
} 