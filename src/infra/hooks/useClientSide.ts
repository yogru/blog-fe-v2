import {useEffect, useState} from "react";

/***
 * 클라이언트 환경인지 확인한다.
 */
export default function useClientSide() {
    const [isClient, setClient] = useState<boolean>(false)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setClient(true)
        } else {
            setClient(false)
        }
    }, [window])

    return {isClient}
}