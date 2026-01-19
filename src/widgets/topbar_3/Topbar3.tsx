import { cn } from "@/lib/utils";
import { NavLink, useLocation } from "react-router-dom";
import SkyChart from "@/pages/components/SkiCart";

// Tabs (UI o'zgarmaydi)
const tabs = [
  { label: "Kassa", to: "/Kassa" },
  { label: "Kunlik Topshirish", to: "/KunlikTopshirish" },
  { label: "Qarzdozlik", to: "/Qarzdozlik" },
] as const;

type Navbar3Props = {
  defaultActiveTo?: (typeof tabs)[number]["to"];
};

export default function Navbar3({ defaultActiveTo }: Navbar3Props) {
  const { pathname } = useLocation();

  // Qaysidir tab active bo'lsa true
  const hasActiveTab = tabs.some((t) => pathname.startsWith(t.to));

  return (
    <div className="mx-auto container">
      <nav className="w-full max-w-[1402px] h-auto flex gap-2 border border-[#6049E3] rounded-3xl px-3 py-2 bg-muted mt-4">
        {tabs.map((t) => {
          const isDefaultActive = !hasActiveTab && defaultActiveTo === t.to;

          return (
            <NavLink
              to={t.to}
              key={t.to}
              className={({ isActive }) =>
                cn(
                  "px-3 rounded-2xl text-sm font-medium transition-all flex items-center duration-200 h-7",
                  !isActive && !isDefaultActive && "text-black",
                  (isActive || isDefaultActive) &&
                    "bg-gradient-to-r from-[#1C96C8] to-[#334F9D] text-white"
                )
              }
            >
              {t.label}
            </NavLink>
          );
        })}
      </nav>

      {/* Agar hech biri active bo'lmasa - dashboard content */}
      {!hasActiveTab && (
        <div className="w-[1402px] h-[775px] rounded-2xl mt-[20px] mx-auto container">
          {/* Top stat cards */}
          <div className="flex ml-[-20px] ">
            <article className="m-4 flex items-end justify-between bg-gradient-to-t from-[#1C96C8] to-[#334F9D] p-6 w-[280px] rounded-2xl">
              <div>
                <p className="text-sm text-gray-300">Umimiy Balans</p>
                <p className="text-2xl font-medium text-white">$25.000</p>
              </div>

              <div className="inline-flex gap-2 rounded-sm bg-green-100 p-1 text-green-600 dark:bg-green-700 dark:text-green-50">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                <span className="text-xs font-medium"> +2.000 </span>
              </div>
            </article>

            <article className="m-4 flex items-end justify-between bg-gradient-to-t from-[#1C96C8] to-[#334F9D] p-6 w-[280px] rounded-2xl">
              <div>
                <p className="text-sm text-gray-300">Umimiy Balans</p>
                <p className="text-2xl font-medium text-white">$84.000</p>
              </div>

              <div className="inline-flex gap-2 rounded-sm bg-green-100 p-1 text-green-600 dark:bg-green-700 dark:text-green-50">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                <span className="text-xs font-medium"> +29.000 </span>
              </div>
            </article>

            <article className="m-4 flex items-end justify-between bg-gradient-to-t from-[#1C96C8] to-[#334F9D] p-6 w-[280px] rounded-2xl">
              <div>
                <p className="text-sm text-gray-300">Qarzdorlik</p>
                <p className="text-2xl font-medium text-white">$-54.000</p>
              </div>

              <div className="inline-flex gap-2 rounded-sm bg-red-600 p-1 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                  />
                </svg>
                <span className="text-xs font-medium"> -8.000 </span>
              </div>
            </article>

            <article className="m-4 flex items-end justify-between bg-gradient-to-t from-[#1C96C8] to-[#334F9D] p-6 w-[280px] rounded-2xl">
              <div>
                <p className="text-sm text-gray-300">Qarzdorlik</p>
                <p className="text-2xl font-medium text-white">$-5.000</p>
              </div>

              <div className="inline-flex gap-2 rounded-sm bg-red-600 p-1 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                  />
                </svg>
                <span className="text-xs font-medium"> -2.100 </span>
              </div>
            </article>
          </div>

          {/* Chart + right side */}
          <div className="flex gap-6 ml-32">
            <SkyChart />

            <div className="flex gap-4 items-start">
              {/* Progress circles */}
              <div>
                {/* 75% */}
                <div className="text-center">
                  <div className="relative mx-auto size-32" role="progressbar" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}>
                    <svg className="size-full" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth={8} className="text-gray-200" />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={8}
                        strokeDasharray="212.1 282.7"
                        strokeLinecap="round"
                        className="origin-center text-green-600"
                      />
                    </svg>

                    <div className="absolute inset-0 grid place-content-center">
                      <span className="text-xl font-semibold text-gray-900">75%</span>
                    </div>
                  </div>
                  <p className="mt-2 text-md text-gray-700">Plus</p>
                </div>

                {/* 45% */}
                <div className="text-center">
                  <div className="relative mx-auto size-32" role="progressbar" aria-valuenow={45} aria-valuemin={0} aria-valuemax={100}>
                    <svg className="size-full" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth={8} className="text-gray-200" />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={8}
                        strokeDasharray="122.1 282.7"
                        strokeLinecap="round"
                        className="origin-center text-red-600"
                      />
                    </svg>

                    <div className="absolute inset-0 grid place-content-center">
                      <span className="text-xl font-semibold text-gray-900">45%</span>
                    </div>
                  </div>
                  <p className="mt-2 text-md text-gray-700">Minus</p>
                </div>

                {/* 25% */}
                <div className="text-center">
                  <div className="relative mx-auto size-32" role="progressbar" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
                    <svg className="size-full" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth={8} className="text-gray-200" />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={8}
                        strokeDasharray="70.7 282.7"
                        strokeLinecap="round"
                        className="origin-center text-blue-600"
                      />
                    </svg>

                    <div className="absolute inset-0 grid place-content-center">
                      <span className="text-xl font-semibold text-gray-900">25%</span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-700">Qoshimcha</p>
                </div>
              </div>

              {/* Right big cards */}
              <div className="flex flex-col gap-3 items-end mt-3">
                <article className="m-4 flex items-end justify-between bg-gradient-to-t from-[#1C96C8] to-[#334F9D] p-6 w-[400px] rounded-2xl">
                  <div>
                    <p className="text-sm text-gray-300">Sotuv</p>
                    <p className="text-2xl font-medium text-white">$50.000</p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="inline-flex gap-2 rounded-sm bg-green-100 p-1 text-green-600 dark:bg-green-700 dark:text-green-50">
                      <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                      <span className="text-xs font-medium"> +15.000 </span>
                    </div>
                    <span className="text-sm text-gray-300">23.08.2025</span>
                  </div>
                </article>

                <article className="m-4 flex items-end justify-between bg-gradient-to-t from-[#1C96C8] to-[#334F9D] p-6 w-[400px] rounded-2xl">
                  <div>
                    <p className="text-sm text-gray-300">Tushlik</p>
                    <p className="text-2xl font-medium text-white">$-33.000</p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="inline-flex gap-2 rounded-sm bg-red-600 p-1 text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                        />
                      </svg>
                      <span className="text-xs font-medium"> -2.100 </span>
                    </div>
                    <span className="text-sm text-gray-300">05.09.2025</span>
                  </div>
                </article>

                <article className="m-4 flex items-end justify-between bg-gradient-to-t from-[#1C96C8] to-[#334F9D] p-6 w-[400px] rounded-2xl">
                  <div>
                    <p className="text-sm text-gray-300">Shtraf</p>
                    <p className="text-2xl font-medium text-white">$-17.000</p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="inline-flex gap-2 rounded-sm bg-red-600 p-1 text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                        />
                      </svg>
                      <span className="text-xs font-medium"> -880 </span>
                    </div>
                    <span className="text-sm text-gray-300">19.11.2025</span>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
