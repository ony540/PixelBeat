import { ImageUploadButton } from '@/assets'

export const ImageUploadForm = ({ onChange, selectedImage }) => {
  return (
    <div>
      <div
        className={`relative overflow-hidden mobile:w-116 mobile:h-116 desktop:w-200 desktop:h-200`}>
        <img
          src={selectedImage}
          alt="프로필 이미지 미리보기"
          className="w-full h-full border-mainGray border-1"
          // object-contain, cover 뭘로 할지 상의 해봐야할듯
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
          onChange={onChange}
        />

        <div className="relative">
          <ImageUploadButton
            propsClass="absolute cursor-pointer
                mobile:h-36 mobile:top-[-20px]  mobile:right-[-20px]
                desktop:h-60 desktop:top-[-40px] desktop:right-[-30px]"
          />
        </div>
      </label>
    </div>
  )
}
