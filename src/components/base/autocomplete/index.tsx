import React, {useEffect, useRef} from 'react'
import {Autocomplete} from "@mui/material";
import TextField from "@mui/material/TextField";
import {ViewItem} from "@/infra/generic-type";

export interface AutocompleteProps {
    noOptionsText?: string
    load: (keyword: string) => Promise<ViewItem[]>
    onSelect: (item: ViewItem) => void
}


export default function AutocompleteBasic(props: AutocompleteProps) {
    const [keyword, setKeyword] = React.useState<string>('')
    const [opt, setOpt] = React.useState<ViewItem[]>([])
    const autoClear = useRef(null);

    useEffect(() => {
        props.load(keyword).then((ret) => {
            setOpt(ret)
        })
    }, [keyword, props])


    return (
        <Autocomplete
            inputValue={keyword}
            ref={autoClear}
            fullWidth
            disablePortal
            id={"auto_basic"}
            isOptionEqualToValue={(opt1, opt2) => opt1.id === opt2.id}
            getOptionLabel={(option) => option.viewValue}
            onInputChange={(event, value, reason) => {
                if (reason === 'reset' || reason === 'clear') {
                    setKeyword('')
                } else {
                    setKeyword(value)
                }
            }}
            onChange={(event, value, reason) => {
                if (reason === "selectOption") {
                    props.onSelect(value as ViewItem)
                    setKeyword('')
                }
            }}
            options={opt}
            noOptionsText={props.noOptionsText || "목록이 존재 하지 않습니다."}
            renderInput={(params) => <TextField
                {...params}
            />}
        />
    );
}