import {EnqueueSnackbar, OptionsObject} from "notistack";
import {FailException} from "@/infra/errors";

export const FAIL_TOP_MIDDLE_OPTION: OptionsObject = {
    variant: 'error',
    anchorOrigin: {
        horizontal: "center",
        vertical: "top"
    }
}


export function catchErrorToSnackbar(e: unknown, enq: EnqueueSnackbar, opt: OptionsObject = FAIL_TOP_MIDDLE_OPTION) {
    // @ts-ignore
    if (e && e.message) {
        // @ts-ignore
        enq(e.message, opt)
    }
}