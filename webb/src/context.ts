import React from 'react'
import { store } from './store'

const _context: any = React.createContext(store)

export const context = _context
