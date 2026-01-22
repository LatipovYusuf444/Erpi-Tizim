import { Link, Outlet } from "react-router-dom";

export default function Navbar4() {

  return (
    <div className="px-8">

      <div>
        <nav className="flex gap-10 items-center">
          <Link to='/ombor/qoldiqlash/product'>
            <p className=" text-center rounded-3xl mt-6 ">
              Product qoshish
            </p>
          </Link>
          <Link to='/ombor/qoldiqlash/ingredient'>
            <p className=" mt-6 ">
              Ingridientlar qoshish
            </p>

          </Link>
        </nav>
      </div>

      <div className="mt-6">
        <Outlet />
      </div>
    </div>
  );
}
