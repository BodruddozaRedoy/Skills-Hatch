import React from 'react'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function Admin() {
  return (
    <ProtectedRoute>
      <div>Admin</div>
    </ProtectedRoute>
  )
}
