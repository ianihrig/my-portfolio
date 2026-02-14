import "./globals.css";
import PanelShell from "./components/PanelShell";
import Image from "next/image";
import Link from "next/link";

import { Analytics } from "@vercel/analytics/next";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="relative">
        {/* <Link
          href="/"
          aria-label="Home"
          className="
            fixed left-6 top-4 z-[999]
            transition
          "
        >
          <Image
            src="/logo/iai-logo.svg"
            alt="IAI logo"
            width={80}
            height={80}
            priority
          />
        </Link> */}

        <PanelShell>{children}</PanelShell>
        <Analytics />
      </body>
    </html>
  );
}