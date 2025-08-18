import type {Unit} from "../types/types.ts";
import {DP} from "../components/TemperatureConverter.tsx";

export const roundTo = (x: number, dp = DP) => {
    return Math.round((x + Number.EPSILON) * 10 ** dp) / 10 ** dp;
}

export const toKelvin = (value: number, unit: Unit) => {
    switch (unit) {
        case 'C': return value + 273.15
        case 'F': return (value - 32) * 5/9 + 273.15
        case 'K': return value
    }
}

export const fromKelvin = (kelvin: number, unit: Unit) => {
    switch (unit) {
        case 'C': return kelvin - 273.15
        case 'F': return (kelvin - 273.15) * 9/5 +32
        case 'K': return kelvin
    }
}

export const parseInput = (s: string): number | null => {
    if (s.trim() === '') return null
    const x = Number(s.replace(',', '.'))
    return Number.isFinite(x) ? x : null
}