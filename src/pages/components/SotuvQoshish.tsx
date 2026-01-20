import { ReactSelectBox } from "./ReactSelect";
import { useForm, type SubmitHandler } from "react-hook-form";

type SotuvFormValues = {
  clientName: string;
  product: string;
  quantity: string;
  deliveryDate: string;
  note: string;
  clientId: string;
  saleId: string;
};

export default function SotuvQoshish() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SotuvFormValues>({
    mode: "onChange",
    defaultValues: {
      clientName: "",
      product: "",
      quantity: "",
      deliveryDate: "",
      note: "",
      clientId: "",
      saleId: "",
    },
  });

  const onSubmit: SubmitHandler<SotuvFormValues> = async (data) => {
    console.log("Yuborildi:", data);
  };

  return (
    <div className="mx-auto container px-8">
      <div className="w-[1402px] h-[586px] border border-[#334F9D] mt-[29px] rounded-3xl bg-[#EBF0FA] ">
        <h1 className="font-bold text-[28px] px-6 py-5">Sotuv qo'shish</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="px-6">
          <div className="grid grid-cols-3  mt-[56px]">
            <div className="flex flex-col gap-2">
              <h2>Mijoz nomi</h2>
              <input
                type="text"
                placeholder="Sizning ismingiz"
                className="border border-[#D0D0D0]  rounded-xl max-w-[404px] min-h-[51px] px-4 outline-none focus:border-[#334F9D] focus:shadow-[#334F9D] focus:shadow-md placeholder:text-gray-500 "
                {...register("clientName", { required: "Mijoz nomi majburiy" })}
              />
              {errors.clientName && (
                <p className="text-sm text-red-600">
                  {errors.clientName.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <h2>Mahsulot</h2>
              <input
                type="text"
                placeholder="Tovar"
                className="border border-[#D0D0D0] rounded-xl max-w-[404px] min-h-[51px] px-4 outline-none focus:border-[#334F9D] focus:shadow-[#334F9D] focus:shadow-md placeholder:text-[text-gray-500]"
                {...register("product", { required: "Mahsulot majburiy" })}
              />
              {errors.product && (
                <p className="text-sm text-red-600 ">
                  {errors.product.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <h2>Miqdori</h2>

              <ReactSelectBox />
              {errors.quantity && (
                <p className="text-sm text-red-600 ">
                  {errors.quantity.message}
                </p>
              )}
            </div>

            <div className="flex gap-8 col-span-3">
              <div className="mt-4 gap-2 flex flex-col">
                <h2>Topshirish muddati</h2>
                <input
                  type="date"
                  className="border border-[#D0D0D0] rounded-xl w-[404px] min-h-[51px] px-4 outline-none focus:text-black text-gray-600  focus:border-[#334F9D] focus:shadow-[#334F9D] focus:shadow-md"
                  {...register("deliveryDate", { required: "Sana majburiy" })}
                />
                {errors.deliveryDate && (
                  <p className="text-sm text-red-600 mx-25">
                    {errors.deliveryDate.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2 mt-4 pl-4">
                <h2>Eslatma</h2>
                <textarea
                  placeholder="Fikringiz..."
                  rows={8}
                  className="border border-[#D0D0D0] placeholder:text-gray-600  rounded-xl w-[896px] min-h-[230px] px-5 py-3 outline-none focus:border-[#334F9D] focus:shadow-[#334F9D] focus:shadow-md resize-none"
                  {...register("note")}
                />
              </div>
            </div>
          </div>

          <div className="flex -mt-[170px] gap-4">
            <div className="flex flex-col gap-2 ">
              <h2>Mijoz ID</h2>
              <input
                type="text"
                inputMode="numeric"
                placeholder="7447474"
                className="border border-[#D0D0D0] rounded-xl placeholder:text-gray-600  w-[187px] min-h-[51px] px-4 outline-none focus:border-[#334F9D] focus:shadow-[#334F9D] focus:shadow-md"
                {...register("clientId", { required: "Mijoz ID majburiy" })}
              />
              {errors.clientId && (
                <p className="text-sm text-red-600">
                  {errors.clientId.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2 px-4">
              <h2>Sotuv ID</h2>
              <input
                type="text"
                inputMode="numeric"
                placeholder="8485867"
                className="border border-[#D0D0D0] rounded-xl placeholder:text-gray-600  w-[187px] min-h-[51px] px-4 outline-none focus:border-[#334F9D] focus:shadow-[#334F9D] focus:shadow-md"
                {...register("saleId", { required: "Sotuv ID majburiy" })}
              />
              {errors.saleId && (
                <p className="text-sm text-red-600">{errors.saleId.message}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl mt-8 min-w-[404px] min-h-[51px] flex items-center justify-center cursor-pointer bg-gradient-to-t from-[#1C96C8] text-[18px] text-white to-[#334F9D]  disabled:opacity-60"
          >
            {isSubmitting ? "Yuborilmoqda..." : "Yaratish"}
          </button>
        </form>
      </div>
    </div>
  );
}
