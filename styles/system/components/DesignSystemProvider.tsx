import { IdProvider } from '@radix-ui/react-id'
import React from 'react'

export const DesignSystemProvider: React.FC = ({ children }) => (
  <IdProvider>{children}</IdProvider>
)
