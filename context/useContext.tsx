"use client"
import { createContext, useState } from "react";

export const GeneralContext = createContext(0)

export const Provider = ({children}:any) => {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    console.log(sidebarOpen)
    const value:any = {
        sidebarOpen, 
        setSidebarOpen
    }
    return (
        <GeneralContext.Provider value={value}>
            {children}
        </GeneralContext.Provider>
    )
}