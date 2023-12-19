export const getUserId = () => {
  const userIdData = localStorage.getItem('sb-lcguqnvrxihpbvrcoouo-auth-token')
  if (!userIdData) return null
  const parsedData = JSON.parse(userIdData)
  return parsedData.user.id
}
