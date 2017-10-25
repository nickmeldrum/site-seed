export const inBrowser = typeof window !== 'undefined'
export const root = inBrowser ? window : global
