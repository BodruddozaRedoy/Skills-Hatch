'use client'
import React from 'react'
import { useState } from 'react';
import CalendarComp from 'react-calendar';

export default function Calendar() {
    const [value, onChange] = useState<any>(new Date());
  return (
    <div className='bg-background p-5 rounded-lg'>
        <CalendarComp onChange={onChange} value={value} />
    </div>
  )
}
