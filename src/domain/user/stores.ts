import {flow, makeAutoObservable, runInAction} from "mobx";
import userRepository, {AccessToken} from '@/domain/user/repositories'
import {CustomError} from "@/infra/errors";
import {Result} from "@/infra/generic-type";


class LoginFail extends CustomError {
    constructor(message: string) {
        super("LoginFail", message);
    }
}

export class LoginStore {

    isLogin: boolean
    email: string
    password: string

    constructor() {
        this.isLogin = false
        this.email = ''
        this.password = ''
        makeAutoObservable(this)
    }

    onChangePassword(password: string) {
        this.password = password
    }

    onChangeEmail(email: string) {
        this.email = email
    }

    async login(): Promise<Result<null>> {
        try {
            this.checkEmail()
            this.checkPassword()
            const res = await userRepository.login(this.email, this.password)
            localStorage.setItem('accessKey', res.accessToken)
            runInAction(() => {
                this.isLogin = true
            })
            return {success: true, data: null}
        } catch (e) {
            return CustomError.catchAndReturnFail(e)
        }
    }

    private checkEmail() {
        const emailReg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailReg.test(this.email)) {
            throw new LoginFail("잘못된 이메일 형식")
        }
    }

    private checkPassword() {
        const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,30}$/
        if (!passwordReg.test(this.password)) {
            throw new LoginFail("잘못된 비밀번호 형식 [ 8~30 글자, 하나 이상의 문자와 숫자를 포함 해야 합니다 ]")
        }
    }
}


export const loginStore = new LoginStore()


export class UserStore {
    constructor(
        public isLoaded: boolean = false,
        public writerName: string | null = null,
        public accessKey: string | null = null
    ) {
        makeAutoObservable(this)
    }

    get isLogin() {
        return this.accessKey !== null
    }

    async initialize() {
        let accessKey: string | null = null
        // 일단 간단하게 구현.
        if (typeof window !== 'undefined') {
            accessKey = window.localStorage.getItem("accessKey")
        }

        runInAction(() => {
            this.isLoaded = true
            this.accessKey = accessKey
        })
    }
}