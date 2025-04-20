"use client"
import React from 'react'
import ContextProvider from './ContextProvider'
import { KindeProvider } from '@kinde-oss/kinde-auth-nextjs';

export default function KindeProviders({ children }: any) {
    return (
        <KindeProvider>
            {children}
        </KindeProvider>
    )
}
