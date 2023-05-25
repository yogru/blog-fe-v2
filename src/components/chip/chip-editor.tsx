import {ViewItem} from "@/infra/generic-type";
import React, {useState} from "react";

import ChipList from "@/components/chip/chip-list";

export type Props = {
    chips: ViewItem[]
    addChip: (item: ViewItem) => Promise<void>
    deleteChip: (id: string) => Promise<void>
}

export default function ChipEditor(props: Props) {
    const [inputString, setInputString] = useState<string>('')
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setInputString(value)
    };

    async function handleKeyup(event: React.KeyboardEvent) {
        if (event.key !== 'Enter') return
        await props.addChip(new ViewItem(inputString, inputString))
        setInputString('')
    }

    async function handleDeleteChip(chipId: string) {
        await props.deleteChip(chipId)
    }

    return (
        <div className={'flex flex-col w-full'}>
            <div>
                <ChipList chips={props.chips} onDeleteChip={handleDeleteChip}/>
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