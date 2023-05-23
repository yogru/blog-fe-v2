import {ViewItem, ViewResponse} from "@/infra/generic-view-type";
import React, {useState, useReducer} from "react";

import ChipList from "@/components/chip/chip-list";

type State = {
    chips: ViewItem []
    inputString: string
}

export type AddChipAction = {
    success: boolean
    type: "addChip",
    item: ViewItem
}

export type DeleteChipAction = {
    success: boolean
    type: "deleteChip",
    itemId: string
}

export type changeInputAction = {
    type: "changeInput",
    value: string
}

export type Action = AddChipAction | changeInputAction | DeleteChipAction

export type Props = {
    initChips: ViewItem []
    onAddChip: (chip: ViewItem) => Promise<AddChipAction>
    onDeleteChip: (chipId: string) => Promise<DeleteChipAction>
}


function changeInput(state: State, action: Action): State {
    if (action.type !== "changeInput") return state
    return {
        inputString: action.value,
        chips: state.chips
    }
}

function addChip(state: State, action: Action): State {
    if (action.type !== "addChip") return state
    if (!action.success) return state

    if (state.chips.find((item) => item.id === action.item.id)) {
        return state
    }
    return {
        inputString: '',
        chips: [...state.chips, new ViewItem(action.item.id!!, action.item.viewValue!!)]
    }
}

function deleteChip(state: State, action: Action): State {
    if (action.type !== "deleteChip") return state
    if (!action.success) return state
    return {
        inputString: '',
        chips: state.chips.filter((item) => item.id !== action.itemId)
    }
}

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "addChip":
            return addChip(state, action)
        case "deleteChip":
            return deleteChip(state, action)
        case "changeInput":
            return changeInput(state, action)
        default:
            return state
    }
}

export default function ChipEditor(props: Props) {
    const [state, dispatch] = useReducer(reducer, {
        inputString: '',
        chips: props.initChips
    })
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        dispatch({type: "changeInput", value})
    };

    async function handleKeyup(event: React.KeyboardEvent) {
        if (event.key !== 'Enter') return
        const action = await props.onAddChip({id: state.inputString, viewValue: state.inputString})
        dispatch(action)
    }

    async function handleDeleteChip(chipId: string) {
        const action = await props.onDeleteChip(chipId)
        dispatch(action)
    }

    return (
        <div className={'flex flex-col w-full'}>
            <div>
                <ChipList chips={state.chips} onDeleteChip={handleDeleteChip}/>
            </div>
            <div>
                <input type={'text'}
                       className={'rounded w-full h-12 border-2 p-4'}
                       onKeyUp={handleKeyup}
                       onChange={handleInputChange}
                       value={state.inputString}
                       placeholder={"tag"}
                />
            </div>
        </div>
    )
}