import type {Modes} from "../types/types.ts";
import {useEffect, useState} from "react";

const MODE_KEY = 'mode:v1'

export default function useMode() {
    const [mode, setMode] = useState<Modes>('multi-input')

    useEffect(() => {
        try {
            const raw = localStorage.getItem(MODE_KEY)
            if (!raw) return
            const {mode} = JSON.parse(raw)
            if (typeof mode === 'string' && (mode === 'one-input' || mode === 'multi-input')) {
                setMode(mode as Modes)
            }
        } catch { /* empty */ }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem(MODE_KEY, JSON.stringify({mode}))
        } catch { /* empty */ }
    }, [mode]);

    return [mode, setMode] as const;
}