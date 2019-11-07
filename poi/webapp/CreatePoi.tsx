import React from 'react'
import { createPoi } from './api'
import { Poi } from './Poi'
export function CreatePoi(props) {
  return <Poi {...props} onFinish={(data: any) => createPoi(data, props.onFinish)} />;
}
