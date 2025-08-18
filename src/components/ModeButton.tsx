import type {Modes} from "../types/types.ts";

export default function ModeButton(
    {
        mode,
        setMode
    }: {
        mode: Modes,
        setMode: (mode: Modes) => void
    }) {
    return (
        <button
            className='btn-mode'
            type='button'
            onClick={() => setMode(
                mode === 'multi-input' ? 'one-input' : 'multi-input'
            )}
        >
            {mode === 'multi-input' ? 'Multi-Input' : 'One-Input'}
        </button>
    )
}