import { Button, Field, Form, Grid } from 'decentraland-ui'
import React from 'react'
import { FormOptions } from './types'

export function RenderForm(
  props: FormOptions & {
    disabled?: boolean
    setOptions?: Function
    start?: Function
  }
) {
  const { disabled, setOptions, start, ...options } = props
  return (
    <Form onSubmit={() => start()}>
      <Field
        name="content-server"
        value={options.contentServer}
        disabled={disabled}
        onChange={contentServer => setOptions({ ...options, contentServer: contentServer.target.value })}
        placeholder=""
        label="Content Server:"
      />
      <Field
        name="asset-bundle-server"
        value={options.assetBundleServer}
        placeholder=""
        disabled={disabled}
        onChange={assetBundleServer => setOptions({ ...options, assetBundleServer: assetBundleServer.target.value })}
        label="Asset Bundle Server:"
      />
      <Grid>
        <Grid.Row>
          <Grid.Column width={8}>
            <Field
              type="number"
              onChange={x => setOptions({ ...options, x: x.target.value })}
              name="startX"
              value={options.x}
              placeholder=""
              disabled={disabled}
              label="X Start:"
            />
          </Grid.Column>
          <Grid.Column width={8}>
            <Field
              type="number"
              onChange={y => setOptions({ ...options, y: y.target.value })}
              name="startY"
              value={options.y}
              placeholder=""
              disabled={disabled}
              label="Y Start:"
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8}>
            <Field
              fluid
              type="number"
              onChange={width => setOptions({ ...options, width: width.target.value })}
              value={options.width}
              name="width"
              placeholder=""
              disabled={disabled}
              label="Rectangle width:"
            />
          </Grid.Column>
          <Grid.Column width={8}>
            <Field
              onChange={height => setOptions({ ...options, height: height.target.value })}
              value={options.height}
              type="number"
              name="height"
              placeholder=""
              disabled={disabled}
              label="Rectangle height:"
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <p style={{ textAlign: 'center' }}>
        <Button disabled={disabled} primary>
          Start Scan
        </Button>
      </p>
    </Form>
  )
}
