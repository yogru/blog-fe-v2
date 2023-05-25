import {ViewItem, ViewResponse} from "@/infra/generic-type";
import React, {useState, useReducer} from "react";

import ChipList from "@/components/chip/chip-list";
import {PostService} from "@/domain/post/services";

type Props = {
    postService: PostService
}

export default function ChipEditor(props: Props) {
    const [inputString, setInputString] = useState<string>('')

    const postService = props.postService
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setInputString(value)
    };

    async function handleKeyup(event: React.KeyboardEvent) {
        if (event.key !== 'Enter') return
        await postService.addTag(inputString)
        setInputString('')
    }

    async function handleDeleteChip(chipId: string) {
        // const action = await props.onDeleteChip(chipId)
        // dispatch(action)
        // action.success && props.onChangeChips(state.chips)
    }

    return (
        <div className={'flex flex-col w-full'}>
            <div>
                <ChipList chips={postService.tags()} onDeleteChip={handleDeleteChip}/>
            </div>
            <div>
                <input type={'text'}
                       className={'rounded w-full h-12 border-2 p-4'}
                       onKeyUp={handleKeyup}
                       onChange={handleInputChange}
                       value={inputString}
                       placeholder={"tag"}
                />
            </div>
        </div>
    )
}