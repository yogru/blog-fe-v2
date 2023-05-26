import {OptionsObject, useSnackbar} from "notistack";
import {Result} from "@/infra/generic-type";


export type Variant = "default" | "error" | "success" | "warning" | "info" | undefined

export type Horizontal = "left" | "center" | "right"

export type Vertical = "top" | "bottom"

type SnackBarOption = {
    variant: Variant,
    horizontal: Horizontal,
    vertical: Vertical
}


function translateToOptionsObject(t: SnackBarOption): OptionsObject {
    return {
        variant: t.variant,
        anchorOrigin: {
            horizontal: t.horizontal,
            vertical: t.vertical
        }
    }
}

export const SuccessTopCenter: SnackBarOption = {
    variant: "success",
    horizontal: 'center',
    vertical: 'top'
}

export const ErrorTopCenter: SnackBarOption = {
    variant: "error",
    horizontal: 'center',
    vertical: 'top'
}

export default function useMySnackbar() {
    const {enqueueSnackbar} = useSnackbar()


    /**
     * 기본적인 스낵바 함수
     * **/
    function upSnackbar(message: string, snackBarOption: SnackBarOption = ErrorTopCenter) {
        const opt: OptionsObject = translateToOptionsObject(snackBarOption)
        enqueueSnackbar(message, opt)
    }

    /**
     result instanceof FailResult 일 때만 스낵바를 띄운다.
     **/
    function upErrorSnackbar<T>(result: Result<T>, horizontal: Horizontal = "center", vertical: Vertical = "top") {
        if (result.success) return
        const opt: OptionsObject = translateToOptionsObject({
            variant: 'error',
            horizontal,
            vertical
        })
        enqueueSnackbar(result.errorMessage, opt)
    }


    /**
     * result instanceof SuccessResult 일 때만 스낵바를 띄운다.
     * **/
    function upSuccessSnackbar<T>(result: Result<T>, horizontal: Horizontal = "center", vertical: Vertical = "top") {
        if (!result.success) return
        const opt: OptionsObject = translateToOptionsObject({
            variant: 'success',
            horizontal,
            vertical
        })
        enqueueSnackbar(result.message!!, opt)
    }


    /**
     * result 따라 알맞은 스낵바를 띄운다.
     * **/
    function upResultSnackbar<T>(result: Result<T>, horizontal: Horizontal = "center", vertical: Vertical = "top") {
        if (!result.success) upErrorSnackbar(result, horizontal, vertical)
        else upSuccessSnackbar(result, horizontal, vertical)
    }

    return {
        upSnackbar,
        upErrorSnackbar,
        upSuccessSnackbar
    }
}