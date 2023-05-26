import restCall from "@/infra/rest-call";
import env from "@/infra/env";
import {CustomError, EnvironmentError} from "@/infra/errors";

export class AccessToken {
    constructor(public accessKey: string) {
    }
}

export interface LoginRestResult {
    accessToken: string
    refreshToken: string
    grantType: string
}


export class LoginFail extends CustomError {
    constructor() {
        super("LoginFail", "로그인 실패 했습니다. ");
    }
}

export class LogoutError extends CustomError {
    constructor() {
        super("LogoutError", "로그아웃 된 상태 입니다.");
    }
}


export class UserRepository {

    public async login(email: string, password: string): Promise<LoginRestResult> {
        const url = env.backUrl + "/user/login"
        const res = await restCall.post<{ username: string, password: string }, LoginRestResult>(url, {
            username: email,
            password: password
        })
        if (res.ok) {
            return res.data!!
        }
        throw new LoginFail()
    }

    public getAccessKey() {
        if (typeof window !== 'undefined') {
            const ret = window.localStorage.getItem("accessKey")
            if (ret === null) {
                throw new LogoutError()
            }
            return ret
        }
        throw new EnvironmentError()
    }
}

const userRepository = new UserRepository()
export default userRepository