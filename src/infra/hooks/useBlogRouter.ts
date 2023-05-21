import {useRouter} from 'next/navigation';
import {useCallback} from "react";

type Goto = "HOME"

type Props = {}

function getUrl(goto: Goto): string {
    switch (goto) {
        case "HOME":
        default:
            return '/'
    }
}

export function useBlogRouter(props?: Props) {
    const router = useRouter()
    const push = useCallback(async (goto: Goto) => {
        const url = getUrl(goto)
        return router.push(url)
    }, [router])

    const replace = useCallback(async (goto: Goto) => {
        const url = getUrl(goto)
        return router.replace(url)
    }, [router])

    return {push, replace}
}
