import Sidebar from "@/widgets/Sidebar"
import ProfileImg from "/public/images/profile.png"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { toast } from "react-toastify"
import { Eye, EyeOff } from "lucide-react"

type ProfileData = {
  firstName: string
  lastName: string
  email: string
  username: string
  phone: string
}

type Props = {
  onFile?: (file: File | null) => void
}

const Profile = ({ onFile }: Props) => {
  /* ================= SIDEBAR ================= */
  const [sidebarOpen, setSidebarOpen] = useState(false)

  /* ================= PROFILE DATA ================= */
  const [profile, setProfile] = useState<ProfileData>({
    firstName: "Yusuf",
    lastName: "Latipov",
    email: "yusuf@example.com",
    username: "yusuf_admin",
    phone: "+998 99 999 99 99",
  })

  /* ================= AVATAR ================= */
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [fileName, setFileName] = useState("")
  const [preview, setPreview] = useState<string | null>(null)
  const [editOpen, setEditOpen] = useState(false)

  const pickFile = () => inputRef.current?.click()

  const handleFile = (file: File | null) => {
    if (!file) return
    setFileName(file.name)
    setPreview(URL.createObjectURL(file))
    onFile?.(file)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFile(e.target.files?.[0] ?? null)
  }

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    handleFile(e.dataTransfer.files?.[0] ?? null)
  }

  const handleDelete = () => {
    setFileName("")
    setPreview(null)
    onFile?.(null)
    if (inputRef.current) inputRef.current.value = ""
  }

  /* ================= PROFILE HANDLERS ================= */
  const onChangeProfile =
    (key: keyof ProfileData) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfile({ ...profile, [key]: e.target.value })
      }

  const handleSave = () => {
    toast.success("Ma'lumotlar muvaffaqiyatli o'zgartirildi ✅")
    setEditOpen(false)
  }

  /* ================= PASSWORD ================= */
  const [passwordOpen, setPasswordOpen] = useState(false)

  const [draftPassword, setDraftPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  })

  const [showPwd, setShowPwd] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  const [showPagePassword, setShowPagePassword] = useState(false)
  const [realPassword, setRealPassword] = useState("123456")

  const isCurrentCorrect = draftPassword.current === realPassword
  const isNewMatch =
    draftPassword.new.length > 0 &&
    draftPassword.new === draftPassword.confirm

  const handlePasswordSave = () => {
    if (!isCurrentCorrect || !isNewMatch) return
    setRealPassword(draftPassword.new)
    toast.success("Password successfully changed ✅")
    setPasswordOpen(false)
    setDraftPassword({ current: "", new: "", confirm: "" })
  }

  return (
    <div className="flex min-h-screen bg-[#F4F7FB]">

      {/* SIDEBAR (hidden on mobile) */}
      <div
        onMouseEnter={() => setSidebarOpen(true)}
        onMouseLeave={() => setSidebarOpen(false)}
        className="
          hidden md:block
          transition-all duration-300
          ml-0 md:ml-20
          ${sidebarOpen ? 'w-[260px]' : 'w-[90px]'}
        "
      >
        <Sidebar />
      </div>

      {/* CONTENT */}
      <div className="flex-1 px-4 sm:px-6 md:px-10 py-6">
        <h1 className="text-xl sm:text-2xl font-semibold mb-6">Profile</h1>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">

          {/* LEFT CARD */}
          <div className="w-full lg:w-[280px] lg:h-[300px] rounded-2xl bg-white/75 backdrop-blur-xl border shadow">
            <h2 className="border-b py-3 text-center font-medium">
              Personal Information
            </h2>

            <div className="p-4">
              <div className="flex items-center gap-4 mt-4">
                <img
                  src={preview ?? ProfileImg}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-sm">Edit Your Photo</p>
                  <div className="flex gap-3 text-xs mt-1">
                    <button onClick={handleDelete} className="text-red-500 hover:cursor-pointer">
                      Delete
                    </button>
                    <button onClick={pickFile} className="text-blue-500 hover:cursor-pointer">
                      Update
                    </button>
                  </div>
                </div>
              </div>

              <input
                ref={inputRef}
                type="file"
                accept="image/png,image/jpeg"
                onChange={onChange}
                className="hidden"
              />

              <div
                onClick={pickFile}
                onDrop={onDrop}
                onDragOver={(e) => e.preventDefault()}
                className="mt-6 cursor-pointer rounded-xl border-2 border-dashed bg-white/60 px-4 py-8 text-center hover:border-[#334F9D]"
              >
                {!fileName ? (
                  <>
                    <p className="text-xs">
                      <span className="text-blue-600 font-medium">
                        Click to upload
                      </span>{" "}
                      or drag & drop
                    </p>
                    <p className="text-[11px] text-gray-500 mt-1">
                      JPG or PNG (450x450)
                    </p>
                  </>
                ) : (
                  <p className="text-sm font-medium">{fileName}</p>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex-1 space-y-6">

            {/* PERSONAL INFO */}
            <div className="rounded-2xl bg-white/75 backdrop-blur-xl border shadow p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold">Personal Information</h2>

                <Dialog open={editOpen} onOpenChange={setEditOpen}>
                  <DialogTrigger asChild>
                    <Button className="text-xs bg-gradient-to-r from-[#1C96C8] to-[#334F9D] text-white">
                      Edit
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="bg-white">
                    <DialogHeader>
                      <DialogTitle>Edit Personal Information</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-3 mt-4">
                      <Input value={profile.firstName} onChange={onChangeProfile("firstName")} placeholder="First Name" />
                      <Input value={profile.lastName} onChange={onChangeProfile("lastName")} placeholder="Last Name" />
                      <Input value={profile.email} onChange={onChangeProfile("email")} placeholder="Email" />
                      <Input value={profile.username} onChange={onChangeProfile("username")} placeholder="Username" />
                      <Input value={profile.phone} onChange={onChangeProfile("phone")} placeholder="Phone Number" />
                    </div>

                    <DialogFooter className="mt-4">
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button onClick={handleSave} className="bg-gradient-to-r from-[#1C96C8] to-[#334F9D] text-white">
                        Save
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input value={profile.firstName} disabled />
                <Input value={profile.lastName} disabled />
                <Input value={profile.email} className="sm:col-span-2" disabled />
                <Input value={profile.username} disabled />
                <Input value={profile.phone} disabled />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="rounded-2xl bg-white/75 backdrop-blur-xl border shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold">Password</h2>

                <Dialog open={passwordOpen} onOpenChange={setPasswordOpen}>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => setDraftPassword({ current: "", new: "", confirm: "" })}
                      className="bg-gradient-to-r from-[#1C96C8] to-[#334F9D] text-white text-xs"
                    >
                      Change
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="bg-white">
                    <DialogHeader>
                      <DialogTitle>Change Password</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4 mt-4">

                      {/* CURRENT PASSWORD */}
                      <div className="relative">
                        <Input
                          type={showPwd.current ? "text" : "password"}
                          placeholder="Current Password"
                          value={draftPassword.current}
                          onChange={(e) =>
                            setDraftPassword({ ...draftPassword, current: e.target.value })
                          }
                          className={`pr-10 ${draftPassword.current &&
                            !isCurrentCorrect &&
                            "border-red-500"
                            }`}
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowPwd((s) => ({ ...s, current: !s.current }))
                          }
                          className="
      absolute inset-y-0 right-3
      flex items-center
      text-gray-500 hover:text-gray-700
    "
                        >
                          {showPwd.current ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>

                      {/* NEW PASSWORD */}
                      <div className="relative">
                        <Input
                          disabled={!isCurrentCorrect}
                          type={showPwd.new ? "text" : "password"}
                          placeholder="New Password"
                          value={draftPassword.new}
                          onChange={(e) =>
                            setDraftPassword({ ...draftPassword, new: e.target.value })
                          }
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPwd((s) => ({ ...s, new: !s.new }))}
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          {showPwd.new ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>

                      {/* CONFIRM PASSWORD */}
                      <div className="relative">
                        <Input
                          disabled={!isCurrentCorrect}
                          type={showPwd.confirm ? "text" : "password"}
                          placeholder="Confirm Password"
                          value={draftPassword.confirm}
                          onChange={(e) =>
                            setDraftPassword({
                              ...draftPassword,
                              confirm: e.target.value,
                            })
                          }
                          className={`pr-10 ${draftPassword.confirm &&
                            !isNewMatch &&
                            "border-red-500"
                            }`}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowPwd((s) => ({ ...s, confirm: !s.confirm }))
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          {showPwd.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>

                        {draftPassword.confirm && !isNewMatch && (
                          <p className="text-xs text-red-500 mt-1">
                            Passwords do not match
                          </p>
                        )}
                      </div>
                    </div>

                    <DialogFooter>
                      <Button variant="outline" onClick={() => setPasswordOpen(false)}>
                        Cancel
                      </Button>

                      <Button
                        disabled={!isCurrentCorrect || !isNewMatch}
                        onClick={handlePasswordSave}
                        className="bg-gradient-to-r from-[#1C96C8] to-[#334F9D] text-white"
                      >
                        Save
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              {/* PAGE'DAGI INPUT */}
              <div className="relative">
                <Input
                  type={showPagePassword ? "text" : "password"}
                  value={realPassword}
                  disabled
                  className="pr-10 border-[#E9EDF4]"
                />

                <button
                  type="button"
                  onClick={() => setShowPagePassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2
               text-gray-400 hover:text-gray-600
               disabled:pointer-events-auto"
                  aria-label={showPagePassword ? "Hide password" : "Show password"}
                >
                  {showPagePassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button className="w-full sm:w-[200px] bg-gradient-to-r from-[#1C96C8] to-[#334F9D] text-white">
              Save All
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
