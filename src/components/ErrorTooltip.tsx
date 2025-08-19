import * as React from "react";
import {createPortal} from "react-dom";
import type {Unit} from "../types/types.ts";

export default function ErrorTooltip(
    {
        ref, unit, error
    }: {
        ref: React.RefObject<HTMLInputElement | null>, unit: Unit, error: string
    }) {

    const rect = ref.current?.getBoundingClientRect()

    if (rect === undefined) {
        return
    }

    const errorRoot = document.getElementById('error-root')!
    return createPortal(
        <small
            id={`${unit}-err`}
            className="field-error"
            style = {{
                position: 'absolute',
                top: rect.bottom + window.scrollY + 5,
                left: rect.left + window.scrollX - 5
            }}
        >
            {error}
        </small>,
        errorRoot
    )

}