describe('store', () => {
  describe('dev-tools', () => {
    beforeEach(() => jest.resetModules())

    it('calls the dev tools extension method when there is a window and the extension method is available', () => {
      const mockDevTools = jest.fn()
      jest.mock('browser', () => ({
        root: { __REDUX_DEVTOOLS_EXTENSION__: mockDevTools },
        inBrowser: true
      }))
      require('./dev-tools')
      expect(mockDevTools).toBeCalled()
    })

    it('returns identity function when there is no window', () => {
      jest.mock('browser', () => ({ root: {}, inBrowser: false }))
      var mockIdentityFunc = require('./dev-tools')
      expect(mockIdentityFunc.default('input-arg')).toEqual('input-arg')
    })

    it('returns identity function when there is a window but no extension method available', () => {
      jest.mock('browser', () => ({ root: {}, inBrowser: true }))
      var mockIdentityFunc = require('./dev-tools')
      expect(mockIdentityFunc.default('input-arg')).toEqual('input-arg')
    })
  })
})
