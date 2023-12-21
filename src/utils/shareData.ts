type SharedData = {
  url: string
  text?: string
  title?: string
  files?: File[]
}

export const shareData = async (data: SharedData) => {
  if (!!navigator.canShare) {
    await navigator.share(data)
    return
  }
  try {
    navigator.clipboard
      .writeText(data.url)
      .then(() => alert('링크가 클립보드에 복사되었습니다.'))
  } catch (error) {
    alert(error)
    console.error('복사에 실패하였습니다.', error)
  }
}
