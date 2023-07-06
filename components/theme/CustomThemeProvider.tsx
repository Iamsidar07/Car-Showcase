'use client'
import { ThemeProvider } from "next-themes"
import { ReactNode, useEffect, useState } from "react"


const CustomThemeProvider = ({ children }: { children: ReactNode }) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <>{children}</>
    }
    return (
        <ThemeProvider enableSystem={true} attribute="class">{children}</ThemeProvider>
    )
}

export default CustomThemeProvider