import TempField from "./TempField.tsx";
import {useState} from "react";
import type {Unit} from "../types/types.ts";
import {fromKelvin, parseInput, roundTo, toKelvin} from "../utils/temperature.ts";

export default function OneInputConverter() {

    const [unit, setUnit] = useState<Unit>('K')
    const [value, setValue] = useState<number | '' | '+' | '-'>(0)
    const [validValue, setValidValue] = useState<boolean>(true);

    const UnitLabels: Record<Unit, string> = {
        'C': 'Celsius',
        'F': 'Fahrenheit',
        'K': 'Kelvin',
    }

    const setInput = (input: string) => {
        const parsed = parseInput(input)
        if (parsed) {
            setValue(parsed)
            setValidValue(true)
        } else if (input.length === 0) {
            setValue('')
        } else {
            if (input.startsWith('-')) {
                if (input.length === 1) {
                    setValue('-')
                }
                else {
                    setValue(Number(input))
                }
            } else if (input.startsWith('+')) {
                if (input.length === 1) {
                    setValue('+')
                } else {
                    setValue(Number(input))
                }
            } else {
                setValue(0)
            }
        }
    }

    const asKelvin = roundTo(toKelvin(validValue ? value as number : 0, unit))

    return (
        <>
            <TempField label={UnitLabels[unit]} unit={unit} value={String(value)} onChange={setInput}/>
            <select value={unit} onChange={event => setUnit(event.target.value as Unit)}>
                <option value='C' onSelect={() => setUnit('C')}>Celsius</option>
                <option value='F' onSelect={() => setUnit('F')}>Fahrenheit</option>
                <option value='K' onSelect={() => setUnit('K')}>Kelvin</option>
            </select>

            <button
                type='button'
                onClick={() => {
                    setValue(0)
                }}
            >
                Reset
            </button>

            {unit !== 'C' &&
                <TempField label={UnitLabels['C']} unit={'C'} value={String(roundTo(fromKelvin(asKelvin, 'C')))}
                           isDisabled={true}/>}
            {unit !== 'F' &&
                <TempField label={UnitLabels['F']} unit={'F'} value={String(roundTo(fromKelvin(asKelvin, 'F')))}
                           isDisabled={true}/>}
            {unit !== 'K' &&
                <TempField label={UnitLabels['K']} unit={'K'} value={String(roundTo(fromKelvin(asKelvin, 'K')))}
                           isDisabled={true}/>}

            {asKelvin !== null && (
                <p className='badge'>
                    {fromKelvin(asKelvin, 'C') >= 100 ? '💧 Boiling (at sea level)' :
                        fromKelvin(asKelvin, 'C') <= 0 ? '❄️ Freezing (at sea level)' : '🌡️ Liquid water range'}
                </p>
            )
            }
        </>
    )
}