import { types, updateName } from './'

describe('customer model', () => {
  describe('actions', () => {
    describe('update-name', () => {
      it('returns an FSA with the payload of the name parameter', () => {
        expect(updateName('new test name').payload)
          .toEqual('new test name')
      })

      it('returns an FSA with the UPDATE_NAME type', () => {
        expect(updateName('new test name').type)
          .toEqual(types.UPDATE_NAME)
      })
    })
  })
})
