import { FakeContentProvider, FakeLAND, getDeploymentAndValidate } from './deploymentExample'
import { secondTestIdentity, testIdentity } from './testIdentity'

describe('Fake LAND & Content provider example', () => {
  it('LANDOwnership is a trusted source of information.', () => {
    expect(JSON.parse(getDeploymentAndValidate(FakeLAND, FakeContentProvider, 0, 0))).toEqual({
      x: 0,
      y: 0,
      content: `This is the content of land 0,0, owned by ${testIdentity.address} and signed by ${secondTestIdentity.address}`
    })
  })
})
