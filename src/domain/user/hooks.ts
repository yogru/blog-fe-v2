import {LoginUserModel} from "@/domain/user/models";
import userRepository from '@/domain/user/repositories'
import useMyLocalStorage from "@/infra/hooks/useMyLocalStorage";
import {useCallback} from "react";
import {ViewResponse} from "@/infra/generic-type";


export function useLogin() {
    const {setItem} = useMyLocalStorage({key: 'accessKey'})
    async function login(email: string, password: string): Promise<ViewResponse> {
        try {
            const userLoginModel = LoginUserModel.create(email, password);
            return userRepository.login(userLoginModel).then((model => {
                setItem(model.accessKey)
                return new ViewResponse(true)
            })).catch(fail => {
                    return new ViewResponse(false)
                }
            )
        } catch (err) {
            return new ViewResponse(false)
        }
    }
    return login
}


export function useAccessKey() {
    const {value} = useMyLocalStorage({key: 'accessKey'})
    const __isValid = useCallback((key: string) => {
        if (!key) return false
        return key !== '';
    }, [])
    return {accessKey: value, isValid: __isValid(value)}
}

