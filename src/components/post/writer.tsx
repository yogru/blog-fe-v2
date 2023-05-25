'use client'

import React, {useState} from "react";
import ToastEditor from "@/components/toast/editor";
import ChipEditor from "@/components/chip/chip-editor";
import postService, {PostService} from "@/domain/post/services";

type Props = {
    postService: PostService
}

export default function PostWriter(props: Props) {
    const ref = React.useRef<any>(null);
    const [titleString, setTitle] = useState<string>('')

    function onChangeTitle(e: any) {
        e.stopPropagation()
        const value = e.target.value
        setTitle(value)
        postService.changeTitle(value)
    }

    async function onSubmit(e: any) {
        e.stopPropagation()
        const editorIns = ref?.current?.getInstance();
        const contentMark = editorIns.getMarkdown()
        // const act = await props.onSubmitPost(state.title, contentMark, state.tags)
        // dispatch(act)
    }

    return (
        <div className={root}>
            <div className={item}>
                <button className={submit}> 글 쓰기</button>
            </div>

            <div className={item}>
                <ChipEditor postService={props.postService}/>
            </div>

            <div className={item}>
                <input type="text"
                       value={titleString}
                       onChange={onChangeTitle}
                       className={title} placeholder="제목 입력 해주세요"/>
            </div>

            <div className={[item, 'h-screen'].join(' ')}>
                <ToastEditor editorRef={ref}/>
            </div>
        </div>
    )
}


// styles
const root: string = 'w-screen flex flex-col pt-16 pl-36 pr-36'
const item: string = 'flex mb-4 w-full'
const submit: string = 'block shadow-lg rounded w-32 h-10 bg-indigo-600 text-amber-50'
const title: string = 'rounded w-full h-12 border-2 p-4'