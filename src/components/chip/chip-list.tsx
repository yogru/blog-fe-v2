import {ViewItem} from "@/infra/generic-type";
import ChipItem from "@/components/chip/chip-item";
import {useCallback, useEffect} from "react";

export type Props = {
    chips: ViewItem[]
    blackList?: string[]

    onDeleteChip?: (chipId: string) => Promise<void>
    onClickChip?: (chipId: string) => Promise<void>
    onChangeChips?: (chips: ViewItem[]) => void
}


export default function ChipList(props: Props) {
    const blackList = props.blackList || ['All']
    const chips = filterBlackList(props.chips, blackList)

    useEffect(() => {
        props.onChangeChips?.(chips)
    }, [chips])

    const handleDeleteChip = useCallback(async (chipId: string) => {
        await props.onDeleteChip?.(chipId)
    }, [props.chips])

    const handleOnClickChip = useCallback(async (chipId: string) => {
        await props.onClickChip?.(chipId)
    }, [props.chips])

    return (
        <ul className={"flex flex-wrap list-none p-0 m-0"}>
            {chips.map(chip =>
                <ChipItem key={chip.id} chip={chip}
                          onClickChip={props.onClickChip ? handleOnClickChip : undefined}
                          onDeleteChip={props.onDeleteChip ? handleDeleteChip : undefined}
                />)}
        </ul>
    )
}


function filterBlackList(it: ViewItem [], blackList: string[]) {
    const dict = blackList.reduce((acc: any, black) => {
        acc[black] = true
        return acc
    }, {} as any)
    return it.filter(item => {
        return !dict[item.id];
    })
}