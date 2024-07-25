export const convertSeconds = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60
  
    const hourString = hours > 0 ? `${hours}ч${hours > 1 ? '' : ''}` : ''
    const minuteString = minutes > 0 ? `${minutes}м${minutes > 1 ? '' : ''}` : ''
    const secondString =
      remainingSeconds > 0 ? `${remainingSeconds}с${remainingSeconds > 1 ? '' : ''}` : ''
  
    if (hours > 0) {
      return `${hourString} : ${minuteString || '0м'} ${secondString && `: ${secondString}`}`
    } else if (!hours && minutes > 0) {
      return `${minuteString} ${secondString && `: ${secondString}`}`
    }
  
    return secondString
}

export const convertToSeconds = (hours: number, minutes: number, seconds: number): number => {
  return hours * 3600 + minutes * 60 + seconds;
}