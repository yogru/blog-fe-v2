export class LocalStorage {

    getItem(key: string): string | null {
        if (typeof window !== 'undefined') {
            return window.localStorage.getItem(key)
        }
        throw new Error("window is undefined")
    }

    setItem(key: string, value: string) {
        if (typeof window !== 'undefined') {
            return window.localStorage.setItem(key, value)
        }
        throw new Error("window is undefined")
    }
}

export const localStorage = new LocalStorage()