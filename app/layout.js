import './globals.css'
import { Secular_One } from 'next/font/google'

const inter = Secular_One({ 
  weight: '400',
  subsets: ['latin'],
 })

export const metadata = {
  title: 'Coin App',
  description: 'Coin App',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
