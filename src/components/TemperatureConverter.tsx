import ThemeButton from "./ThemeButton.tsx";
import MultiInputConverter from "./MultiInputConverter.tsx";
import useMode from "../hooks/Mode.tsx";
import ModeButton from "./ModeButton.tsx";
import OneInputConverter from "./OneInputConverter.tsx";

export const DP = 2

export default function TemperatureConverter() {
    const [mode, setMode] = useMode();

    return (
        <section className='card'>
            <div className='option'>
                <ThemeButton/>
                <ModeButton mode={mode} setMode={setMode}/>
            </div>
            <h2>Temperature Converter</h2>
            {mode === 'multi-input'
                ? <MultiInputConverter/>
                : <OneInputConverter/>
            }
        </section>
    )
}