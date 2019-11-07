import React from 'react'
import { editPoi } from './api'
import { Poi } from './Poi'
export function EditPoi(props) {
  return <Poi {...props} onFinish={(data: any) => editPoi(props.id, data, props.onFinish)} />;
}
