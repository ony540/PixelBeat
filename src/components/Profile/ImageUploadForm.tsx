import { ImageUploadButton } from '@/assets'
import { useEffect, useState } from 'react'

export const ImageUploadForm = ({ onChange, selectedImage }) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!selectedImage) {
      setImagePreviewUrl(null)
    }

    if (selectedImage instanceof Blob) {
      const imageUrl = URL.createObjectURL(selectedImage)
      setImagePreviewUrl(imageUrl)

      return () => URL.revokeObjectURL(imageUrl)
    }
  }, [selectedImage])

  return (
    <div>
      <div
        className={`relative overflow-hidden mobile:w-116 mobile:h-116 desktop:w-200 desktop:h-200`}>
        <img
          src={imagePreviewUrl || selectedImage}
          alt="프로필 이미지 미리보기"
          className="w-full h-full"
        />
      </div>
      <label
        htmlFor="imageUpload"
        className="relative">
        <input
          id="imageUpload"
          className="absolute inset-0 hidden cursor-pointer"
          type="file"
          accept="image/*"
          onChange={e => onChange(e.target.files?.[0])}
        />
        <div className="relative">
          <ImageUploadButton
            propsClass="absolute cursor-pointer 
                        mobile:h-36 mobile:top-[-20px] mobile:right-[-20px] 
                        desktop:h-60 desktop:top-[-40px] desktop:right-[-30px]"
          />
        </div>
      </label>
    </div>
  )
}
