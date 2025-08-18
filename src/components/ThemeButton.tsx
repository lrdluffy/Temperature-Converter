import {useEffect, useState} from "react";

const THEME_KEY = 'theme:v1'

export default function ThemeButton() {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        try {
            const raw = localStorage.getItem(THEME_KEY)
            if (!raw) return
            const {theme} = JSON.parse(raw)
            if (typeof theme === 'string' && (theme === 'light' || theme === 'dark')) {
                setTheme(theme)
            }
        } catch { /* empty */ }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem(THEME_KEY, JSON.stringify({theme}))
            document.documentElement.setAttribute('data-theme', theme)
        } catch { /* empty */ }
    }, [theme]);

    return (
        <button
            className='btn-theme'
            type='button'
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
            {theme === 'light' ? '☀️' : '🌕'}
        </button>
    )
}