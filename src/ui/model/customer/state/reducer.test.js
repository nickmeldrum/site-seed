import reducer from './reducer'
import initialState from './initial-state'

jest.mock('../actions/types', () => ({ UPDATE_NAME: 'update' }))

describe('customer model', () => {
  describe('state', () => {
    it('will return passed in state when irrelevant action passed in', () => {
      expect(reducer(
        initialState.set('name', 'a-name'),
        {type: 'irrelevant'}
      ).name).toEqual('a-name')
    })

    it('will return new name in state when action is UPDATE_NAME', () => {
      expect(reducer(
        initialState.set('name', 'a-name'),
        {type: 'update', payload: 'new-name'}
      ).name).toEqual('new-name')
    })
  })
})
