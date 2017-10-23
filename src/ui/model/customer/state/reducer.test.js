import reducer from './'

jest.mock('./initial-state', () => { return { name: 'test-name' } })
jest.mock('../actions/types', () => { return { UPDATE_NAME: 'update' } })

describe('customer model', () => {
  describe('state', () => {
    it('will return initialState when no state or action passed in', () => {
      expect(reducer().name).toEqual('test-name')
    })

    it('will return passed in state when no action passed in', () => {
      expect(reducer(
        {name: 'updated-name'}
      ).name).toEqual('updated-name')
    })

    it('will return new name in state when action is UPDATE_NAME', () => {
      expect(reducer(
        {name: 'original-name'},
        {type: 'update', name: 'new-name'}
      ).name).toEqual('new-name')
    })
  })
})
