export const assignParamsOfFirstFromSecondObject = (objectFirst: any, objectSecond: any) => {
  objectFirst = { ...objectFirst }

  const keys = Object.keys(objectFirst)
  keys.forEach((key) => {
    objectFirst[key] = objectSecond[key]
  })

  return objectFirst
}

export const formatCurrency = (number: number, isShowSymbol = false) => {
  const formattedNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return isShowSymbol ? `${formattedNumber} ₸` : formattedNumber
}
