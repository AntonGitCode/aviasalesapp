import format from 'date-fns/format'

export const dateFormat = (date, separator) => {
  return separator ? format(date, `HH${separator}mm`) : format(date, 'HHч mmм')
}
