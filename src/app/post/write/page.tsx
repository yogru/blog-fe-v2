'use client'

import PostWriterContainer from "@/container/post/writer-container";
import React from "react";
import {SnackbarProvider} from "notistack";

export default function PostWritePage() {
    return (
        <SnackbarProvider maxSnack={3}>
            <PostWriterContainer/>
        </SnackbarProvider>
    )
}