import {FailException} from "@/infra/errors";

export class LoginUserModel {
    email: string
    password?: string

    private constructor(email: string, password: string) {
        this.email = email
        this.password = password
    }

    static checkEmail(email: string): boolean {
        const emailReg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailReg.test(email)
    }

    static checkPassword(password: string): boolean {
        const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,30}$/
        return passwordReg.test(password)
    }

    static create(email: string, password: string): LoginUserModel {
        if (!LoginUserModel.checkEmail(email)) {
            throw new FailException("잘못된 이메일 형식")
        }
        if (!LoginUserModel.checkPassword(password)) {
            throw new FailException("잘못된 비밀번호 형식 [ 8~30 글자, 하나 이상의 문자와 숫자를 포함 해야 합니다 ]")
        }
        return new LoginUserModel(email, password)
    }

}

export class UserModel {
    readonly email: string
    readonly accessKey: string

    constructor(email: string, accessKey: string) {
        this.email = email
        this.accessKey = accessKey
    }

}