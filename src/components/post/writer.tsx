'use client'

import React, {useReducer} from "react";
import ToastEditor from "@/components/toast/editor";
import {ViewItem} from "@/infra/generic-view-type";
import ChipEditor, {AddChipAction, DeleteChipAction} from "@/components/chip/chip-editor";

type Props = {
    onAddChip: (chip: ViewItem) => Promise<AddChipAction>
    onDeleteChip: (chipId: string) => Promise<DeleteChipAction>
    onSubmitPost: (title: string, body: string, tags: ViewItem[]) => Promise<SubmitAction>
}

export default function PostWriter(props: Props) {
    const [state, dispatch] = useReducer(reduce, {title: '', tags: []})
    const ref = React.useRef<any>(null);

    function onChangeTitle(e: any) {
        e.stopPropagation()
        dispatch({type: "changeTitle", value: e.target.value})
    }

    async function onSubmit(e: any) {
        e.stopPropagation()
        const editorIns = ref?.current?.getInstance();
        const contentMark = editorIns.getMarkdown()
        const act = await props.onSubmitPost(state.title, contentMark, state.tags)
        dispatch(act)
    }

    function onChangeChips(chips: ViewItem[]) {
        dispatch({type: "changeTags", chips})
    }


    return (
        <div className={root}>
            <div className={item}>
                <button className={submit}> 글 쓰기</button>
            </div>

            <div className={item}>
                <ChipEditor
                    initChips={[]}
                    onAddChip={props.onAddChip}
                    onDeleteChip={props.onDeleteChip}
                    onChangeChips={onChangeChips}
                />
            </div>

            <div className={item}>
                <input type="text"
                       value={state.title}
                       onChange={onChangeTitle}
                       className={title} placeholder="제목 입력 해주세요"/>
            </div>

            <div className={[item, 'h-screen'].join(' ')}>
                <ToastEditor editorRef={ref}/>
            </div>
        </div>
    )
}

// action , state
type State = {
    title: string,
    tags: ViewItem[]
}
type ChangeTitleAction = {
    type: "changeTitle",
    value: string
}

type ChangeTagsAction = {
    type: "changeTags",
    chips: ViewItem[]
}

export type SubmitAction = {
    type: "submit",
    title: string,
    content: string
}

export type Action = ChangeTitleAction | ChangeTagsAction | SubmitAction


// reduce
function changeTitle(state: State, action: Action) {
    if (action.type !== "changeTitle") return state
    return {
        title: action.value,
        tags: state.tags
    }
}

function changeChips(state: State, action: Action) {
    if (action.type !== "changeTags") return state
    return {
        title: state.title,
        tags: [...action.chips]
    }
}

function reduce(state: State, action: Action) {
    switch (action.type) {
        case "changeTitle":
            return changeTitle(state, action)
        case "changeTags":
            return changeChips(state, action)
        default:
            return state
    }
}


// styles
const root: string = 'w-screen flex flex-col pt-16 pl-36 pr-36'
const item: string = 'flex mb-4 w-full'
const submit: string = 'block shadow-lg rounded w-32 h-10 bg-indigo-600 text-amber-50'
const title: string = 'rounded w-full h-12 border-2 p-4'