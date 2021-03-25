import pluralize from './pluralize'

export function duration(seconds) {
  let output = []
  let remainder = seconds
  const durations = [
    // Number of seconds in
    24 * 60 * 60, // a day
    60 * 60, // a hour
    1 * 60, // a minute
  ]
  durations.forEach((divisor, index) => {
    const quotient: number = Math.abs(parseInt(`${remainder / divisor}`, 10))
    remainder = Math.abs(remainder % divisor)
    output.push(quotient)
    if (index === durations.length - 1) {
      output.push(remainder)
    }
  })
  return output.reverse()
}

function pad(value) {
  let s = String(value)
  while (s.length < 2) {
    s = '0' + s
  }
  return s
}

const defaultFormat = (value, key) => `${value} ${value === 1 ? key : `${key}s`}`
const defaultSeparator = (index, length) => {
  if (index === 0) {
    return ''
  }
  if (index === length - 1) {
    return ' and '
  } else {
    return ', '
  }
}

export function formatDuration(seconds, options = {}) {
  options = {
    ignoreZero: true,
    format: defaultFormat,
    separator: defaultSeparator,
    intervals: ['day', 'hour', 'minute', 'second'],
    ...options,
  }

  const {format, ignoreZero, separator, intervals} = options

  const parts = duration(seconds).reverse()

  const output = parts
    .map((part, index) => {
      return format(part, intervals[index])
    })
    .filter((part, index) => {
      if (ignoreZero) {
        return parts[index] !== 0
      }
      return true
    })

  return output
    .reduce((previous, current, index) => `${previous}${separator(index, output.length)}${current}`, '')
    .trim()
}

export function formatDurationShort(seconds, options = {}) {
  options = {
    intervals: ['d', 'h', 'm', 's'],
    format: (value, key) => `${['d', 'h'].includes(key) ? value : pad(value)}${key}`,
    separator: () => ' ',
    ...options,
  }
  return formatDuration(seconds, options)
}

export function formatMinutes(minutes) {
  let duration = minutes
  let singular = 'minute'
  let plural = 'minutes'

  if (duration > 60) {
    duration = duration / 60
    singular = 'hour'
    plural = 'hours'
  }

  return pluralize(parseInt(duration, 10), singular, plural, true)
}
