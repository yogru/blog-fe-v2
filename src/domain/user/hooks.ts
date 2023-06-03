import {UserStore} from "@/domain/user/stores";
import {useEffect} from "react";


export const userStore = new UserStore()

export function useUserStore() {
    useEffect(() => {
        userStore.initialize().then()
    }, [])

    return {
        userStore
    }
}