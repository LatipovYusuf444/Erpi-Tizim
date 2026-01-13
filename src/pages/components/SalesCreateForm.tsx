import { useForm } from "react-hook-form";

type SalesFormValues = {
  klientNomi: string;
  klientId: string;
  sotuvId: string;
  tovarId: string;
  tovarNomi: string;
  sanasi: string;
  miqdori: string;
  narxi: string;
};

export default function SalesCreateForm({ onClose }: { onClose?: () => void }) {
  const { register, handleSubmit, reset } = useForm<SalesFormValues>();

  const onSubmit = (data: SalesFormValues) => {
    console.log("SEND TO BACKEND:", data);

    reset();
    onClose?.();
  };

  return (
    <div className=" text-gray-800 p-8 h-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
        <h2 className="text-lg font-semibold">Yangi sotuv qo‘shish</h2>
        <div>
          <label className="block mb-1 text-sm">Sotuv ID</label>
          <input
            type="number"
            {...register("sotuvId", { required: true })}
            className="w-full rounded-lg border px-3 py-2 outline-none focus:border-indigo-500"
            placeholder="7654098"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm">Mijoz nomi</label>
          <input
            {...register("klientNomi", { required: true })}
            className="w-full rounded-lg border px-3 py-2 outline-none focus:border-indigo-500"
            placeholder="Alibekov K"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm">Mijoz ID</label>
          <input
            type="number"
            {...register("klientId", { required: true })}
            className="w-full rounded-lg border px-3 py-2 outline-none focus:border-indigo-500"
            placeholder="487567"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Tovar Nomi</label>
          <input
            {...register("tovarNomi", { required: true })}
            className="w-full rounded-lg border px-3 py-2 outline-none focus:border-indigo-500"
            placeholder="Tarelka"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm">Tovar ID</label>
          <input
            {...register("tovarId", { required: true })}
            className="w-full rounded-lg border px-3 py-2 outline-none focus:border-indigo-500"
            placeholder="7878545"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm">Miqdori</label>
          <input
            type="number"
            {...register("miqdori", { required: true, min: 1 })}
            className="w-full rounded-lg border px-3 py-2 outline-none focus:border-indigo-500"
            placeholder="15.000"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Narx</label>
          <input
            type="number"
            {...register("narxi", { required: true })}
            className="w-full rounded-lg border px-3 py-2 outline-none focus:border-indigo-500"
            placeholder="$14.250"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm">Sanasi</label>
          <input
            type="number"
            {...register("narxi", { required: true })}
            className="w-full rounded-lg border px-3 py-2 outline-none focus:border-indigo-500"
            placeholder="12.02.2025"
          />
        </div>
        <div className="flex justify-end gap-2 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border text-black border-[#334F9D]"
          >
            Bekor qilish
          </button>
          <button
            type="submit"
            className="px-4 py-2 w-[100px] rounded-lg cursor pointer bg-gradient-to-r from-[#1C96C8] to-[#334F9D] text-white"
          >
            Saqlash
          </button>
        </div>
      </form>
    </div>
  );
}
