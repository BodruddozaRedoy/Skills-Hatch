import React from 'react'

export default function LoadingScreen() {
    return (
        <div className='h-screen w-screen bg-transparent backdrop-blur-lg flex items-center justify-center'>
            <img className='w-20' src="/images/loading.gif" alt="" />
        </div>
    )
}
