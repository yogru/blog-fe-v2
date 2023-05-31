'use client'

import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';

import {Viewer} from '@toast-ui/react-editor';
import {useEffect, useState} from "react";
import {MyTheme} from "@/infra/hooks/useMyTheme";

export interface Props {
    theme?: MyTheme
    content: string;
}

export default function ToastViewer(props: Props) {
    const content = props.content || ''
    const [count, setCount] = useState<number>(1)

    useEffect(() => {
        setCount(count + 1)
    }, [content])

    useEffect(() => {
        setCount(count + 1)
    }, [props.theme])

    return (
        <div key={count}>
            <Viewer theme={props.theme || 'light'} initialValue={content}/>
        </div>
    )
}
