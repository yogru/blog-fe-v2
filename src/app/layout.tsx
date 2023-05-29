import './output.css'

import {Inter, Nanum_Myeongjo} from 'next/font/google'

const inter = Inter({subsets: ['latin']})
const nanum_myeongjo = Nanum_Myeongjo({
    weight: ['400', '700'],
    style: ['normal'],
    subsets: ['latin'],
    display: 'swap'
})
export const metadata = {
    title: 'Home',
    description: 'Blog Home',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className + " " + nanum_myeongjo.className}>
            {children}
        </body>
        </html>
    )
}
