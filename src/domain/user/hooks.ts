import {LoginStore} from "@/domain/user/stores";
import {useEffect} from "react";


const loginStore: LoginStore = new LoginStore()

export function useLoginStore() {
    useEffect(() => {
        loginStore.initialize().then()
    }, [])

    return {
        loginStore
    }
}

