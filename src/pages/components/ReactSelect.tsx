import Select from "react-select";

const options = [
  { label: "2000", value: "2000" },
  { label: "1500", value: "1500" },
  { label: "5500", value: "5500" },
];

export function ReactSelectBox() {
  return (
    <div className="w-full ">
      <Select
        options={options}
        placeholder="Tanlang..."
        classNamePrefix="rs"
        styles={{
          control: (base, state) => ({
            ...base,
            maxWidth: "494px",
            minHeight: "51px",
            borderRadius: "12px",
            border: state.isFocused ? "1px solid #6049E3" : "1px solid #D0D0D0",
            display: "flex",
            alignItems: "center",
            paddingLeft: "6px",
            paddingRight: "16px",
            boxShadow: "none",
            outline: "none",
            background: "#EBF0FA",
          }),
        }}
      />
    </div>
  );
}
