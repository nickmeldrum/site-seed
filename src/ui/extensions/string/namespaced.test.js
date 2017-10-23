import { namespaced } from './'

describe('string extensions', () => {
  describe('namespaced', () => {
    it('will return a string with the name parameter at the end', () => {
      expect(namespaced('myname')).toMatch(/myname$/)
    })

    it('will return a string with at least 3 characters before the name parameter', () => {
      expect(namespaced('myname')).toMatch(/.{4,}myname/)
    })

    it('will return a string with at forward slash before the name parameter', () => {
      expect(namespaced('myname')).toMatch(/\/myname/)
    })
  })
})
