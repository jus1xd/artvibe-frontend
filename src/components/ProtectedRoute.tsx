import React from 'react'

type TProps = {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<TProps> = ({children}) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default ProtectedRoute