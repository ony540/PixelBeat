type SharedData = {
  url: string
  text?: string
  title?: string
  files?: File[]
}

export const shareData = async (data: SharedData, openConfirm) => {
  if (!!navigator.canShare) {
    await navigator.share(data)
    return
  }
  try {
    navigator.clipboard
      .writeText(data.url)
      .then(() => openConfirm('shareUrlCopy'))
  } catch (error) {
    alert(error)
    console.error('복사에 실패하였습니다.', error)
  }
}
