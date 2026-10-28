import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

// Pas de font custom ?
const geistSans = Geist({
     variable: "--font-geist-sans",
     subsets: ["latin"],
})

const geistMono = Geist_Mono({
     variable: "--font-geist-mono",
     subsets: ["latin"],
})
// Bien gérer les Metadata pour le SEO et pour l'UX
export const metadata: Metadata = {
     title: "Mael Social Media",
     description: "Boostez votre présence en ligne chez Mael Social Media",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
     return (
          <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
               <body className="min-h-full flex flex-col">{children}</body>
          </html>
     )
}
