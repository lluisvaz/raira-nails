import { useEffect } from "react";
import { useLocation } from "wouter";

declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

const PIXEL_ID = "678401695262294";

export const MetaPixel = () => {
  const [location] = useLocation();

  useEffect(() => {
    // Inicialização do script do Meta Pixel
    if (!window.fbq) {
      (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod
            ? n.callMethod.apply(n, arguments)
            : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = "2.0";
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(
        window,
        document,
        "script",
        "https://connect.facebook.net/en_US/fbevents.js"
      );
    }
    
    // Garante que o init ocorra apenas uma vez, mas de forma independente do script tag
    if (window.fbq && !window.fbq.instance) {
      window.fbq("init", PIXEL_ID);
      window.fbq.instance = true;
    }
  }, []);

  useEffect(() => {
    // Dispara PageView em cada mudança de rota
    // O pixel carrega assincronamente, então verificamos se fbq existe
    if (typeof window !== 'undefined' && window.fbq && window.fbq.instance) {
      window.fbq("track", "PageView");
    }
  }, [location]);

  return null;
};

// Função auxiliar para disparar eventos customizados/padrão
export const trackPixelEvent = (eventName: string, options?: any) => {
  if (window.fbq) {
    window.fbq("track", eventName, options);
  }
};
