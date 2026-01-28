import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Camera } from "lucide-react"
import { toast } from "react-toastify"

const MAX_SIZE_MB = 2
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png"]

const Rasm = () => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleSelect = () => {
    inputRef.current?.click()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // format tekshirish
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Faqat JPG, JPEG yoki PNG ruxsat etiladi")
      return
    }

    // size tekshirish
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      toast.error("Rasm hajmi 5MB dan oshmasligi kerak")
      return
    }

    const url = URL.createObjectURL(file)
    setPreview(url)
  }

  return (
    <div className="w-[314px] mt-11">
      {/* Card */}
      <div className="h-[400px] rounded-3xl bg-white flex flex-col items-center">
        {/* Image picker */}
        <div
          onClick={handleSelect}
          className="mt-[35px] mb-[46px] w-[163px] h-[163px] rounded-full border-2 border-dashed border-violet-400
          flex flex-col items-center justify-center cursor-pointer
          hover:bg-violet-50 transition relative overflow-hidden"
        >
          {preview ? (
            <img
              src={preview}
              alt="preview"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <>
              <Camera className="text-violet-500 mb-2" />
              <span className="text-sm text-gray-500">Rasm qo‘shish</span>
            </>
          )}

          <input
            ref={inputRef}
            type="file"
            accept="image/png, image/jpeg"
            className="hidden"
            onChange={handleChange}
          />
        </div>

        {/* Info */}
        <div className="text-center space-y-5">
          <p className="text-sm">
            <span className="text-gray-500">Tafsiya qilingan format</span>
            <br />
            JPG, JPEG, PNG
          </p>

          <p className="text-sm">
            <span className="text-gray-500">Maksimal hajm</span>
            <br />
            5MB
          </p>
        </div>
      </div>

      {/* Button */}
      <Button
        className="w-full h-[44px] mt-[38px] bg-[#2187BF] hover:bg-[#1b6f9d] text-white"
      >
        Xodim qo‘shish
      </Button>
    </div>
  )
}

export default Rasm
