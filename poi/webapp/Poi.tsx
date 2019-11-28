import { Button, Field, Grid, Modal } from 'decentraland-ui'
import React, { useState } from 'react'

export function Poi(props: any) {
  const id = props.id
  const [name, setName] = useState(props.name || '')
  const [description, setDescription] = useState(props.description || '')
  const [screenshot, setScreenshot] = useState(props.screenshot || '')
  const [x, setX] = useState(props.x || 0)
  const [y, setY] = useState(props.y || 0)

  return (
    <Modal open={true}>
      <Modal.Header>{id ? 'Edit submission' : 'Submit a scene'}</Modal.Header>
      <Modal.Content>
        <Field
          label='Name'
          id='name'
          value={name}
          onChange={ev => setName(ev.target.value)}
          placeholder='Cool scene #42'
        />
        <Field
          label='Screenshot'
          id='screenshot'
          value={screenshot}
          onChange={ev => setScreenshot(ev.target.value)}
          placeholder='https://some.domain.com/image.png'
        />
        <Field
          label='Description'
          id='description'
          value={description}
          onChange={ev => setDescription(ev.target.value)}
          placeholder='https://some.domain.com/image.png'
        />
        <Grid>
          <Grid.Column width='6'>
            <Field
              label='x'
              id='x'
              type='number'
              value={x}
              onChange={ev => setX(ev.target.value as any)}
              placeholder='-140'
            />
          </Grid.Column>
          <Grid.Column width='2'></Grid.Column>
          <Grid.Column width='6'>
            <Field
              label='y'
              id='y'
              type='number'
              value={y}
              onChange={ev => setY(ev.target.value as any)}
              placeholder='99'
            />
          </Grid.Column>
        </Grid>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={props.onCancel}>Cancel</Button>
        <Button primary onClick={() => props.onFinish({ name, description, screenshot, x, y })}>
          Submit
        </Button>
      </Modal.Actions>
    </Modal>
  )
}
