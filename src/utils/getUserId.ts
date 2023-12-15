export const getUserId = () => {
  const userId = localStorage.getItem('sb-lcguqnvrxihpbvrcoouo-auth-token')
  if (!userId) return
  const ParstData = JSON.parse(userId)
  return ParstData.user.id
}
