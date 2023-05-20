'use client'
import React from "react";
import ToastEditor from "@/components/toast/editor";

type Props = {}


export default function PostWriter(props: Props) {
    const ref = React.useRef<any>(null);

    return (
        <div className={'w-screen flex flex-col pt-16 pl-36 pr-36'}>
            <div className={'flex mb-4 w-full'}>
                <div>
                    <button className={'rounded-full'}>
                        작성 하기
                    </button>
                </div>
            </div>

            <div className={'flex mb-4 w-full'}>
                <ToastEditor editorRef={ref}/>
            </div>
        </div>

    )
}

