import {ViewItem, ViewResponse} from "@/infra/generic-view-type";
import React, { useState} from "react";
import {useSnackbar} from "notistack";
import {FAIL_TOP_MIDDLE_OPTION} from "@/infra/snackbar";
import ChipList from "@/components/chip/chip-list";

export type Props = {
    initChips: ViewItem []
    onAddChip: (chip: ViewItem) => Promise<ViewResponse>
    onDeleteChip: (chipId: string) => Promise<ViewResponse>
}


export default function ChipEditor(props: Props) {
    const [chips, setChips] = useState<ViewItem[]>(props.initChips)
    const [inputChip, setInputChip] = useState<string>('');
    const {enqueueSnackbar} = useSnackbar()

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputChip(event.target.value);
    };

    async function handleKeyup(event: React.KeyboardEvent) {
        if (event.key !== 'Enter') return
        if (inputChip.length < 2) {
            enqueueSnackbar("태그는 최소 2글자 이상만 가능합니다.", FAIL_TOP_MIDDLE_OPTION)
            return
        }
        if (inputChip === 'All') {
            enqueueSnackbar("추가할 수 없는 태그 이름 입니다.", FAIL_TOP_MIDDLE_OPTION)
            return
        }
        const ret = chips.find((chip) => chip.viewValue === inputChip)
        if (ret) {
            setInputChip('')
            return
        }

        const res = await props.onAddChip({id: inputChip, viewValue: inputChip})
        res.success && setChips([...chips, {id: inputChip, viewValue: inputChip}])
        res.success && setInputChip('')
        !res.success && enqueueSnackbar(res.errorMessage, FAIL_TOP_MIDDLE_OPTION)
    }

    async function handleDeleteChip(chipId: string) {
        const res = await props.onDeleteChip(chipId)
        res.success && setChips(chips.filter((c) => c.id !== chipId))
        !res.success && enqueueSnackbar(res.errorMessage, FAIL_TOP_MIDDLE_OPTION)
    }

    return (
        <div className={'flex flex-col w-full'}>
            <div>
                <ChipList chips={chips} onDeleteChip={handleDeleteChip}/>
            </div>
            <div>
                <input type={'text'}
                       onKeyUp={handleKeyup}
                       onChange={handleInputChange}
                       value={inputChip} placeholder={"tag"} className={'rounded w-full h-12 border-2 p-4'}/>
            </div>
        </div>
    )
}