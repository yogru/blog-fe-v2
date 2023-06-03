'use client'

import React from "react";
import {SnackbarProvider} from "notistack";


import PostWriteTemplate from "@/components/template/post-write";


export default function PostWritePage() {

    return (
        <SnackbarProvider maxSnack={3}>
            <PostWriteTemplate />
        </SnackbarProvider>
    )
}