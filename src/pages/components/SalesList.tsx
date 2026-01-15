export default function SalesList({ onCreate }: { onCreate: () => void }) {
  return (
    <button
      onClick={onCreate}
      className="px-4 py-2 rounded-3xl w-[120px] text-[18px] cursor-pointer text-white hover:bg-gradient-to-l from-[#1C96C8] to-[#334F9D] bg-gradient-to-r from-[#1C96C8] to-[#334F9D]"
    >
      Add
    </button>
  );
}
