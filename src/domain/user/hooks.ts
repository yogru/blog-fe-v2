import {LoginUserModel} from "@/domain/user/models";
import {useSnackbar} from "notistack";
import {catchErrorToSnackbar} from "@/infra/snackbar";
import userRepository from '@/domain/user/repositories'



export function useLogin() {
    const {enqueueSnackbar} = useSnackbar();
    async function login(email: string, password: string) {
        try {
            const userLoginModel = LoginUserModel.create(email, password);
            return userRepository.login(userLoginModel).then((model => {
                return model
            })).catch(fail => catchErrorToSnackbar(fail, enqueueSnackbar))
        } catch (err) {
            catchErrorToSnackbar(err, enqueueSnackbar)
        }
    }
    return login
}


