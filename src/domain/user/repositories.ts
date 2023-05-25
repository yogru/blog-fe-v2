import {LoginUserModel, UserModel} from "@/domain/user/models";
import restCall from "@/infra/rest-call";
import env from "@/infra/env";
import {FailException} from "@/infra/errors";


export class UserRepository {
    public async login(user: LoginUserModel): Promise<UserModel> {
        const url = env.backUrl + "/user/login"
        const res = await restCall.post(url, {username: user.email, password: user.password})
        if (res.ok) {
            const accessToken = res.data['accessToken']
            return new UserModel(user.email, accessToken)
        }
        return Promise.reject(new FailException(res.message!!))
    }

    public getAccessKey() {
        if (typeof window !== 'undefined') {
            const ret = window.localStorage.getItem("accessKey")
            if (ret === null) {
                throw new Error("로그인 정보가 없습니다.")
            }
            return ret
        }
        throw new Error("서버에서 호출 되었습니다.")
    }

}

const userRepository = new UserRepository()
export default userRepository