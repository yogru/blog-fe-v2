'use client'

import React from "react";
import ToastEditor from "@/components/toast/editor";

type Props = {}


export default function PostWriter(props: Props) {
    const ref = React.useRef<any>(null);

    return (
        <div className={'w-screen flex flex-col pt-16 pl-36 pr-36'}>
            <div className={'flex mb-4 w-full'}>
                <button className={'block w-full bg-indigo-600 text-sky-400'}>
                    작성 하기 1
                </button>
            </div>

            <div className={'flex mb-4 w-full'}>
                <ToastEditor editorRef={ref}/>
            </div>
        </div>

    )
}

