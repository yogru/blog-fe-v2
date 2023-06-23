import React, {useState} from "react";
import {observer} from "mobx-react-lite";

import {PostWriteStore} from "@/domain/post/store/PostWriteStore";
import ToastEditor from "@/components/base/toast/editor";
import TagEditor from "@/components/observing/post/tag-editor";
import useMySnackbar from "@/infra/hooks/useMySnackbar";
import {useBlogRouter} from "@/infra/hooks/useBlogRouter";


type Props = {
    postStore: PostWriteStore
}

// styles
const root: string = 'w-screen flex flex-col'
const item: string = 'flex mb-4 w-full'
const submit: string = 'block shadow-lg rounded w-32 h-10 bg-indigo-600 text-amber-50'
const title: string = 'rounded w-full h-12 border-2 p-4'

const PostWriterObserver = observer((props: Props) => {
    const ref = React.useRef<any>(null)
    const {upErrorSnackbar} = useMySnackbar()
    const {replace} = useBlogRouter()
    const [titleString, setTitle] = useState<string>('')
    const postService = props.postStore

    function onChangeTitle(e: any) {
        e.stopPropagation()
        const value = e.target.value
        setTitle(value)
        postService.onChangeTitle(value)
    }

    async function onSubmit(e: any) {
        e.stopPropagation()
        const editorIns = ref?.current?.getInstance()
        const contentMark = editorIns.getMarkdown()
        const ret = await postService.post(contentMark)
        upErrorSnackbar(ret)
        ret.success && await replace("HOME")
    }

    return (
        <div className={root}>
            <div className={item}>
                <button onClick={onSubmit} className={submit}> 글 쓰기</button>
            </div>

            <div className={item}>
                <TagEditor postService={props.postStore}/>
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