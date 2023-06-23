import {useRouter} from 'next/navigation';
import {useCallback} from "react";

type Goto = "HOME" | "READ_POST"


function getBaseUrl(goto: Goto): string {
    switch (goto) {
        case "HOME":
        default:
            return '/'
        case "READ_POST":
            return "/post"
    }
}

export function useBlogRouter() {
    const router = useRouter()
    const push = useCallback(async (goto: Goto, opt?: any) => {
        const url = getBaseUrl(goto)
        return router.push(url)
    }, [router])

    const replace = useCallback(async (goto: Goto, opt?: any) => {
        const url = getBaseUrl(goto)
        return router.replace(url)
    }, [router])

    async function goto(url: string, replace?: boolean) {
        if (replace) {
            await router.replace(url)
        }
        await router.push(url)
    }

    async function gotoPost(id: string, replace?: boolean) {
        const url: string = "/post/" + id
        await goto(url, replace)
    }

    async function gotoHome(replace?: boolean) {
        await goto("/", replace)
    }

    async function gotoSeriesList(replace?: boolean) {
        await goto("/series", replace)
    }


    async function gotoEditPost(postId: string, replace?: boolean) {
        const url = "/"
        await goto(url, replace)
    }

    async function gotoWritePost(replace?: boolean) {
        const url = "/post/write"
        await goto(url, replace)
    }

    async function gotoLogin(replace?: boolean) {
        const url = "/login"
        await goto(url, replace)
    }

    async function gotoPostListTag(tags: string[] = [], replace?: boolean) {
        const url = "/post/tags"
        await goto(url, replace)
    }

    async function gotoSeriesWrite(replace?: boolean) {
        const url = "/series/write"
        await goto(url, replace)
    }

    return {
        push, replace,
        gotoSeriesList,
        gotoPost,
        gotoHome,
        gotoEditPost,
        gotoWritePost,
        gotoLogin,
        gotoPostListTag,
        gotoSeriesWrite
    }
}
