import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function MyCourseCardSkeleton() {
    return (
        <Skeleton className='bg-muted flex justify-between items-center w-full h-46 p-5'>
            <div className='flex gap-5 h-full'>
                <Skeleton className='bg-muted-foreground w-60 h-full' />
                <div className='space-y-4'>
                    <Skeleton className='w-80 h-8 bg-muted-foreground' />
                    <Skeleton className='w-18 h-5 bg-muted-foreground' />
                    <Skeleton className='w-28 h-5 bg-muted-foreground' />
                    <Skeleton className='w-36 h-5 bg-muted-foreground' />
                </div>
            </div>
            <div className='space-y-4'>
                <Skeleton className='w-60 h-8 bg-muted-foreground' />
                <Skeleton className='w-40 h-8 bg-muted-foreground' />

            </div>

        </Skeleton>
    )
}
