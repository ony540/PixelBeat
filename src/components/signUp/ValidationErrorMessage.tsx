export const ValidationErrorMessage = ({ text, isValid }) => {
  if (!text || text === '') {
    return null
  }

  const messageText = (
    <span className={`${isValid ? 'text-mainGreen' : 'text-mainRed'} text-xs`}>
      {text}
    </span>
  )

  return messageText
}