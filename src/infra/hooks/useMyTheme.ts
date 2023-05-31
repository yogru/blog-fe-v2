import {useEffect, useState} from "react";
import {EnvironmentError} from "@/infra/errors";

export type MyTheme = "dark" | "light"

export default function useMyTheme() {

    const [theme, setStateTheme] = useState<MyTheme>('light')

    useEffect(() => {
        if (typeof window !== undefined) {
            const nextTheme = window.localStorage.getItem("theme") as MyTheme || "light"
            setTheme(nextTheme)
            setStateTheme(nextTheme)
        }
    }, [])

    function removeTheme() {
        if (typeof window !== undefined) {
            if (document.documentElement.classList.contains("dark")) {
                document.documentElement.classList.remove('dark');
            }
            if (document.documentElement.classList.contains("light")) {
                document.documentElement.classList.remove('light');
            }
        }
        //   throw new EnvironmentError()
    }

    function setTheme(t: MyTheme) {
        if (typeof window !== undefined) {
            window.localStorage.setItem("theme", t)
            removeTheme()
            document.documentElement.classList.add(t);
            setStateTheme(t)
        }
        //  throw new EnvironmentError()
    }

    return {
        theme,
        setTheme
    }
}