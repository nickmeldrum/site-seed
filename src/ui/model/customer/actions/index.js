import updateNameAction from './update-name'

import { namespaced } from 'extensions/string'

export const types = {
  UPDATE_NAME: namespaced('update-name')
}

export const updateName = updateNameAction
