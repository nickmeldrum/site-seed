import redux from 'redux'

const mockEnhancer = { enhancer: true }
const mockReducer = { reducer: true }

jest.mock('redux', () => { return { createStore: jest.fn() } })
jest.mock('./enhancer', () => mockEnhancer)
jest.mock('./reducers', () => mockReducer)

describe('store', () => {
  describe('create-store', () => {
    it('calls redux createStore passing in reducer and enhancer', () => {
      require('./create-store')
      expect(redux.createStore).toBeCalledWith(mockReducer, mockEnhancer)
    })
  })
})
