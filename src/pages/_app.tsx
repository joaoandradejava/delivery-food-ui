import { UsuarioProvider } from "@/contexts/usuario-context";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UsuarioProvider>
      <main className={montserrat.className}>
        <Component {...pageProps} />;
      </main>
    </UsuarioProvider>
  );
}
