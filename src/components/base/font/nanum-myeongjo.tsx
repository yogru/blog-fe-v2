import React from "react";
import {Nanum_Myeongjo} from 'next/font/google'


const nanum_myeongjo = Nanum_Myeongjo({
    weight: ['400', '700', '800'],
    style: ['normal'],
    subsets: ['latin'],
    display: 'swap'
})
export default function NanumMyeongjoFont({children}: { children: React.ReactNode }) {
    return (
        <div className={nanum_myeongjo.className}>
            {children}
        </div>
    )
}