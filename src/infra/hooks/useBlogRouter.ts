import {useRouter} from 'next/navigation';
import {useCallback} from "react";

type Goto = "HOME" | "READ_POST"

type Props = {}

type UrlOption = {
    path: any
    param: any
}

function getBaseUrl(goto: Goto): string {
    switch (goto) {
        case "HOME":
        default:
            return '/'
        case "READ_POST":
            return "/post"
    }
}

export function useBlogRouter(props?: Props) {
    const router = useRouter()
    const push = useCallback(async (goto: Goto, opt?: any) => {
        const url = getBaseUrl(goto)
        return router.push(url)
    }, [router])

    const replace = useCallback(async (goto: Goto, opt?: any) => {
        const url = getBaseUrl(goto)
        return router.replace(url)
    }, [router])


    async function gotoPost(id: string, replace?: boolean) {
        const baseUrl: string = "/post"
        if (replace) {
            return router.replace(baseUrl + "/" + id)
        }
        return router.push(baseUrl + "/" + id)
    }

    async function gotoHome(replace?: boolean) {
        if (replace) {
            return router.replace('/')
        }
        return router.push("/")
    }

    async function gotoEditPost(postId: string, replace?: boolean) {
        const url = "/"
        if (replace) {
            return router.replace(url)
        }
        return router.push(url)
    }

    return {
        push, replace,
        gotoPost,
        gotoHome,
        gotoEditPost
    }
}
