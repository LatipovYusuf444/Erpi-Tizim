import { cn } from "@/lib/utils";
import { NavLink, useLocation } from "react-router-dom";

const tabs = [
    { label: "Qoldiqlash", to: "/Qoldiqlash" },
    { label: "Kirim", to: "/Kirim" },
    { label: "Ko‘chirish", to: "/Kochirish" },
    { label: "Inventarizatsiya", to: "/QaytarilganTovarlar" },
] as const;

type Navbar2Props = {
    defaultActiveTo?: (typeof tabs)[number]["to"];
};
export default function Navbar4({ defaultActiveTo }: Navbar2Props) {
    const { pathname } = useLocation();
    const hasActiveTab = tabs.some((t) => pathname.startsWith(t.to));
    return (
        <div className="px-8">
            <nav className=" w-full max-w-350.5 h-auto flex gap-2 border border-[#6049E3] rounded-3xl px-3 py-2 bg-muted mt-4">
                {tabs.map((t) => {
                    const isDefaultActive = !hasActiveTab && defaultActiveTo === t.to;
                    return (
                        <NavLink
                            to={t.to}
                            key={t.to}
                            className={({ isActive }) =>
                                cn(
                                    "px-3 rounded-2xl text-sm font-medium  transition-all   flex items-center duration-200 h-7 ",
                                    !isActive && !isDefaultActive && "text-black",
                                    (isActive || isDefaultActive) && "navbar2-button-color"
                                )
                            }
                        >
                            {t.label}
                        </NavLink>
                    );
                })}
            </nav>
            <h1>Salom</h1>
            {!hasActiveTab && (
                <div className="w-350.5 h-193.75 bg-[#EBF0FA] border border-[#6049E3] rounded-2xl mt-7.25 ">
                    <div className="flex flex-row gap-8 mx-auto container px-8 py-8">
                        <h1>Hello</h1>
                    </div>
                </div>
            )}
        </div>
    );
}