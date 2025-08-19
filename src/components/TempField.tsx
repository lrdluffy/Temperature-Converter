import type {Unit} from "../types/types.ts";
import ErrorTooltip from "./ErrorTooltip.tsx";
import {useRef} from "react";

type Props = {
    label: string,
    unit: Unit,
    value: string,
    onChange?: (next: string) => void,
    error?: string | null,
    isDisabled?: boolean
}

export default function TempField({label, unit, value, onChange, error, isDisabled = false}: Props) {
    const inputRef = useRef<HTMLInputElement>(null)

    return (
        <>
            <label className='field'>
                <span className='field-label'>{label} ({unit})</span>
                {onChange
                    ? <input
                        inputMode='decimal'
                        aria-invalid={!!error}
                        aria-describedby={error ? `${unit}-err` : undefined}
                        value={value}
                        onChange={event => onChange(event.target.value)}
                        placeholder={`Enter ${label.toLowerCase()}`}
                        disabled={isDisabled}
                        ref={inputRef}
                    />
                    :
                    <input
                        inputMode='decimal'
                        aria-invalid={!!error}
                        aria-describedby={error ? `${unit}-err` : undefined}
                        value={value}
                        placeholder={`Enter ${label.toLowerCase()}`}
                        disabled={isDisabled}
                        ref={inputRef}
                    />
                }
            </label>

            {error && <ErrorTooltip ref={inputRef} unit={unit} error={error}/> }
        </>
    )
}