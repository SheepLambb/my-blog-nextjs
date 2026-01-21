import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { Orbitron, Inter, Noto_Sans_SC } from "next/font/google";
import ThemeToggle from "@/app/components/ThemeToggle";
import ThreeBackground from "@/app/components/ThreeBackground";

const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoSansSC = Noto_Sans_SC({ 
  subsets: ["latin"], 
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-sc"
});

export const metadata: Metadata = {
  title: "Sheeplamb's Space",
  description: "Frontier Tech & Science Blog",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning className={`${orbitron.variable} ${inter.variable} ${notoSansSC.variable}`}>
      <body>
        {/* ✅ NEW: 3D Sci-Fi Particle Aperture Background */}
        <ThreeBackground />

        {/* Subtle texture overlays */}
        <div className="bg-grid opacity-20" /> {/* Reduced opacity for cleaner look */}
        
        <div className="container">
          <div className="nav">
            <div className="brand">
              <div className="logo" />
              <div>
                <div className="brand-title">
                  <span>Neon</span> Blog
                </div>
                <div className="brand-sub">Blue · Purple · Universe UI</div>
              </div>
            </div>

            <div className="nav-actions">
              <Link className="btn btn-primary" href="/">首页</Link>
              <a className="btn" href="/api/posts" target="_blank" rel="noreferrer">API</a>
              <a className="btn" href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
              <ThemeToggle />
            </div>
          </div>

          {children}
        </div>
      </body>
    </html>
  );
}
