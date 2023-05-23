import {OptionsObject, useSnackbar} from "notistack";


type SnackBarOption = {
    variant: "default" | "error" | "success" | "warning" | "info" | undefined,
    horizontal: "left" | "center" | "right"
    vertical: "top" | "bottom"
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
    function upSnackbar(message: string, snackBarOption: SnackBarOption = ErrorTopCenter) {
        const opt: OptionsObject = translateToOptionsObject(snackBarOption)
        enqueueSnackbar(message, opt)
    }

    return {upSnackbar}
}