export const isTrue = (string = '') => {
  return string.toLowerCase() === 'true' || string === true
}

export default {
  isTrue
}
