'use client'

import React from "react";
import ToastEditor from "@/components/toast/editor";
import {ViewItem, ViewResponse} from "@/domain/infra/generic-view-type";
import ChipEditor from "@/components/chip/chip-editor";

type Props = {
    onAddChip: (chip: ViewItem) => Promise<ViewResponse>
    onDeleteChip: (chipId: string) => Promise<ViewResponse>
}
const root: string = 'w-screen flex flex-col pt-16 pl-36 pr-36'
const item: string = 'flex mb-4 w-full'
const submit: string = 'block shadow-lg rounded w-32 h-10 bg-indigo-600 text-amber-50'
const title: string = 'rounded w-full h-12 border-2 p-4'

export default function PostWriter(props: Props) {
    const ref = React.useRef<any>(null);

    return (
        <div className={root}>
            <div className={item}>
                <button className={submit}> 글 쓰기</button>
            </div>

            <div className={item}>
                <ChipEditor initChips={[]} onAddChip={props.onAddChip} onDeleteChip={props.onDeleteChip}/>
            </div>

            <div className={item}>
                <input type="text" className={title} placeholder="제목 입력 해주세요"/>
            </div>

            <div className={[item, 'h-screen'].join(' ')}>
                <ToastEditor editorRef={ref}/>
            </div>
        </div>
    )
}

