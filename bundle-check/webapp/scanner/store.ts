import { action } from 'typesafe-actions'
import { configureStore } from 'dcl/kernel/core/store'

export const START = 'Start'
export const UPDATE_OK = 'Update - bundle complete'
export const UPDATE_EMPTY = 'Update - empty parcel'
export const UPDATE_PROBLEM = 'Update - problem'
export const END = 'Finished'

export const start = action(START)
export const end = action(END)
export const updateOk = action(UPDATE_OK)
export const updateEmpty = action(UPDATE_EMPTY)
export const updateProblem = action(UPDATE_PROBLEM)

const kit = configureStore()
kit.start()

export const store: any = kit.store