import Select from "react-select";

const options = [
  { label: "2000", value: "2000" },
  { label: "1500", value: "1500" },
  { label: "5500", value: "5500" },
];

export function ReactSelectBox() {
  return (
    <div className="w-full">
      <Select
        options={options}
        placeholder="Tanlang..."
        styles={{
          control: (base, state) => ({
            ...base,
            maxWidth: "494px",
            minHeight: "51px",
            borderRadius: "12px",

            border: state.isFocused ? "1px solid #334F9D" : "1px solid #D0D0D0",

            boxShadow: state.isFocused
              ? "0 4px 6px rgba(51, 79, 157, 0.35)"
              : "none",

            outline: "none",
            backgroundColor: "#EBF0FA",

            "&:hover": {
              border: "1px solid #334F9D",
            },

            transition: "all 0.2s ease",
          }),
        }}
      />
    </div>
  );
}
