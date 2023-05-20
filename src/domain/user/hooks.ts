import {LoginUserModel} from "@/domain/user/models";
import {useSnackbar} from "notistack";
import {catchErrorToSnackbar} from "@/infra/snackbar";
import userRepository from '@/domain/user/repositories'
import useMyLocalStorage from "@/infra/hooks/useMyLocalStorage";


export function useLogin() {
    const {enqueueSnackbar} = useSnackbar();
    const {setItem} = useMyLocalStorage({key: 'accessKey'})
    async function login(email: string, password: string) {
        try {
            const userLoginModel = LoginUserModel.create(email, password);
            return userRepository.login(userLoginModel).then((model => {
                setItem(model.accessKey)
                return model
            })).catch(fail => catchErrorToSnackbar(fail, enqueueSnackbar))
        } catch (err) {
            catchErrorToSnackbar(err, enqueueSnackbar)
        }
    }
    return login
}


