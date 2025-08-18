import {useEffect, useState} from "react";
import {fromKelvin, parseInput, roundTo, toKelvin} from "../utils/temperature.ts";
import type {Unit} from "../types/types.ts";
import TempField from "./TempField.tsx";

const STORAGE_KEY = 'temp-converter:v1'

export default function MultiInputConverter() {
    const [cStr, setCStr] = useState('')
    const [fStr, setFStr] = useState('')
    const [kStr, setKStr] = useState('')


    const [kelvin, setKelvin] = useState<number | null>(null)

    const [errors, setErrors] = useState<{C?: string|null; F?: string|null; K?: string|null}>({})

    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY)
            if (!raw) return
            const {kelvin} = JSON.parse(raw)
            if (typeof kelvin === 'number' && kelvin > 0) {
                setKelvin(kelvin)
                setCStr(String(roundTo(fromKelvin(kelvin, 'C'))))
                setFStr(String(roundTo(fromKelvin(kelvin, 'F'))))
                setKStr(String(roundTo(fromKelvin(kelvin, 'K'))))
            }
        } catch { /* empty */ }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({kelvin}))
        } catch { /* empty */ }
    }, [kelvin]);

    const updateForm = (unit: Unit) => (raw: string) => {
        if (unit === 'C') setCStr(raw)
        if (unit === 'F') setFStr(raw)
        if (unit === 'K') setKStr(raw)

        const parsed = parseInput(raw)
        const nextErrors = {...errors, [unit]: null}

        if (parsed === null) {
            setKelvin(null)
            if (unit !== 'C') setCStr('')
            if (unit !== 'F') setFStr('')
            if (unit !== 'K') setKStr('')
            setErrors(nextErrors)
            return
        }

        const asKelvin = toKelvin(parsed, unit)
        if (asKelvin < 0) {
            nextErrors[unit] = 'Kelvin cannot be below 0'
            setErrors(nextErrors)
            return;
        }

        setErrors(nextErrors)
        setKelvin(asKelvin)

        setCStr(String(roundTo(fromKelvin(asKelvin, 'C'))))
        setFStr(String(roundTo(fromKelvin(asKelvin, 'F'))))
        setKStr(String(roundTo(fromKelvin(asKelvin, 'K'))))
    }

    return (
        <>
            <div className='grid'>
                <TempField label='Celsius' unit='C' value={cStr} onChange={updateForm('C')} error={errors.C ?? null}/>
                <TempField label='Fahrenheit' unit='F' value={fStr} onChange={updateForm('F')} error={errors.F ?? null}/>
                <TempField label='Kelvin' unit='K' value={kStr} onChange={updateForm('K')} error={errors.K ?? null}/>
            </div>

            <div className='action'>
                <button
                    type='button'
                    onClick={() => {
                        setKelvin(null)
                        setCStr('')
                        setFStr('')
                        setKStr('')
                    }}
                >
                    Reset
                </button>
            </div>

            {kelvin !== null && (
                <p className='badge'>
                    {fromKelvin(kelvin, 'C') >= 100 ? '💧 Boiling (at sea level)' :
                        fromKelvin(kelvin, 'C') <= 0 ? '❄️ Freezing (at sea level)' : '🌡️ Liquid water range'}
                </p>
            )
            }
        </>
    )
}