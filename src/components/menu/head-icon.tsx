import {MyTheme} from "@/infra/hooks/useMyTheme";

function SunIcon(props: {
    onClick: (theme: MyTheme) => void
}) {
    return (
        <svg onClick={() => props.onClick("light")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
             stroke-width="1.5"
             stroke="currentColor" className="w-10 h-10">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/>
        </svg>
    )
}

function MoonIcon(props: {
    onClick: (theme: MyTheme) => void
}) {
    return (
        <svg onClick={() => props.onClick("dark")} xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 24 24"
             fill="currentColor" className="w-10 h-10">
            <path fill-rule="evenodd"
                  d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                  clip-rule="evenodd"/>
        </svg>
    )
}

export function ThemeToggleIcon(props: {
    theme: MyTheme,
    onClick: (theme: MyTheme) => void
}) {
    return (
        <div>
            {props.theme === 'light' ? <SunIcon onClick={props.onClick}/> : <MoonIcon onClick={props.onClick}/>}
        </div>
    )
}


export function TagIcon(props: {
    onClick: () => Promise<void>
}) {

    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
             className="w-10 h-10">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"/>
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z"/>
        </svg>
    )
}


export function SeriesIcon(props: {
    onClick: () => Promise<void>
}) {
    return (
        <svg onClick={async () => props.onClick()} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
             stroke-width="1.5" stroke="currentColor"
             className="w-10 h-10">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/>
        </svg>
    )
}