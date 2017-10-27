import { types } from './'

export default newName => {
  return {
    type: types.UPDATE_NAME,
    payload: newName,
    error: false,
    meta: {},
  }
}
