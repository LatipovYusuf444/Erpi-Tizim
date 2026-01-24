import { useForm, type SubmitHandler } from "react-hook-form";
import { unknown } from "zod";

export type SalesFormValues = {
  sotuvId: string;
  klientNomi: string;
  tovarNomi: string;
  sanasi: string;
  miqdori: number;
  narxi: number;
  ndsNarxi: number;
  status: string;
};

export default function SalesCreateForm({
  onClose,
  onSubmitForm,
}: {
  onClose?: () => void;
  onSubmitForm: (data: SalesFormValues) => void;
}) {
  const { register, handleSubmit, reset } = useForm<SalesFormValues>({
    mode: "onChange",
    defaultValues: {
      sotuvId: "",
      klientNomi: "",
      tovarNomi: "",
      miqdori: undefined as unknown as number,
      narxi: undefined as unknown as number,
      ndsNarxi: undefined as unknown as number,
      sanasi: "",
      status: "Tasdiqlangan",
    },
  });

  const onSubmit: SubmitHandler<SalesFormValues> = (data) => {
    onSubmitForm(data);
    reset();
    onClose?.();
  };

  return (
    <div className="text-gray-800 p-8 h-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h2
          className="text-xl rounded-4xl font-semibold text-center 
    bg-gradient-to-r from-[#1C96C8] to-[#334F9D] text-white p-4"
        >
          Yangi sotuv qo‘shish
        </h2>

        <div>
          <label className="block mb-1 text-md">Sotuv ID</label>
          <input
            type="number"
            {...register("sotuvId", { required: true, valueAsNumber: true })}
            className="w-full rounded-3xl border px-3 py-2 shadow-md focus:shadow-[#334F9D] focus:border-2 outline-none border-[#334F9D]"
            placeholder="7654098"
          />
        </div>

        <div>
          <label className="block mb-1 text-md">Mijoz nomi</label>
          <input
            type="text"
            {...register("klientNomi", { required: true })}
            className="w-full rounded-3xl border px-3 py-2 shadow-md focus:shadow-[#334F9D] focus:border-2 outline-none border-[#334F9D]"
            placeholder="Alibekov K"
          />
        </div>

        <div>
          <label className="block mb-1 text-md">Tovar Nomi</label>
          <input
            type="text"
            {...register("tovarNomi", { required: true })}
            className="w-full rounded-3xl border px-3 py-2 outline-none shadow-md focus:shadow-[#334F9D] focus:border-2 border-[#334F9D]"
            placeholder="Tarelka"
          />
        </div>

        <div>
          <label className="block mb-1 text-md">Miqdori</label>
          <input
            type="number"
            {...register("miqdori", {
              required: true,
              min: 1,
              valueAsNumber: true,
            })}
            className="w-full rounded-3xl border px-3 py-2 outline-none shadow-md focus:shadow-[#334F9D] focus:border-2 border-[#334F9D]"
            placeholder="15000"
          />
        </div>

        <div>
          <label className="block mb-1 text-md">Narx</label>
          <input
            type="number"
            {...register("narxi", { required: true, valueAsNumber: true })}
            className="w-full rounded-3xl border px-3 py-2 outline-none shadow-md focus:shadow-[#334F9D] focus:border-2 border-[#334F9D]"
            placeholder="14250"
          />
        </div>

        <div>
          <label className="block mb-1 text-md">NDS Narx</label>
          <input
            type="number"
            {...register("narxi", { required: true, valueAsNumber: true })}
            className="w-full rounded-3xl border px-3 py-2 outline-none shadow-md focus:shadow-[#334F9D] focus:border-2 border-[#334F9D]"
            placeholder="14250"
          />
        </div>
        <div>
          <label className="block mb-1 text-md">Sanasi</label>
          <input
            type="date"
            {...register("sanasi", { required: true })}
            className="w-full rounded-3xl border px-3 py-2 outline-none shadow-md focus:shadow-[#334F9D] focus:border-2 border-[#334F9D]"
          />
        </div>

        <div>
          <label className="block mb-1 text-md">Status</label>
          <input
            type="text"
            {...register("status", { required: true })}
            className="w-full rounded-3xl border px-3 py-2 outline-none shadow-md focus:shadow-[#334F9D] focus:border-2 border-[#334F9D]"
            placeholder="Tasdiqlangan"
          />
        </div>

        <div className="flex justify-start gap-2 pt-3 w-[350px]">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-2 w-[120px] rounded-3xl h-[43px] cursor-pointer border text-black hover:text-[#334F9D] border-[#334F9D]"
          >
            Bekor qilish
          </button>

          <button
            type="submit"
            className="px-3 py-2 w-[120px] h-[43px] rounded-3xl cursor-pointer hover:bg-gradient-to-l from-[#1C96C8] to-[#334F9D] bg-gradient-to-r from-[#1C96C8] to-[#334F9D] text-white"
          >
            Saqlash
          </button>
        </div>
      </form>
    </div>
  );
}
