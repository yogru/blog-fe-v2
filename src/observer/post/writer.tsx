import React, {useState} from "react";
import {observer} from "mobx-react-lite";

import {PostService} from "@/domain/post/services";
import ToastEditor from "@/components/toast/editor";
import TagEditor from "@/observer/post/tag-editor";


type Props = {
    postService: PostService
}

// styles
const root: string = 'w-screen flex flex-col pt-16 pl-36 pr-36'
const item: string = 'flex mb-4 w-full'
const submit: string = 'block shadow-lg rounded w-32 h-10 bg-indigo-600 text-amber-50'
const title: string = 'rounded w-full h-12 border-2 p-4'

const PostWriterObserver = observer((props: Props) => {
    const ref = React.useRef<any>(null);
    const [titleString, setTitle] = useState<string>('')
    const postService = props.postService

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

    }

    return (
        <div className={root}>
            <div className={item}>
                <button className={submit}> 글 쓰기</button>
            </div>

            <div className={item}>
                <TagEditor postService={props.postService}/>
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
})


export default PostWriterObserver