import {useEffect, useState} from "react";


export default function useMyTimer({second}: { second: number }) {
    const [isEndTimer, setIsEndTimer] = useState<boolean>(false)

    useEffect(() => {
        if (second) {
            const timerHandle = setTimeout(() => {
                setIsEndTimer(true)
            }, 1000 * second)

            return () => {
                clearTimeout(timerHandle)
            }
        }
    }, [second])

    return {isEndTimer}
}