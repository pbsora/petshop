import { Link } from "react-router-dom";
import { LuBird } from "react-icons/lu";

const BirdsDropdown = () => {
  return (
    <div className="relative z-10 px-6 py-5 w-fit group">
      <span className="flex gap-2 text-lg font-semibold cursor-pointer select-none">
        <span className="text-2xl duration-200 scale-0 group-hover:scale-100">
          <LuBird />
        </span>
        Birds
      </span>
      <div className="absolute flex flex-col gap-3 px-3 py-3 text-lg duration-200 origin-top scale-0 -translate-x-6 translate-y-5 border dark:border-zinc-300 bg-background group-hover:scale-100 rounded-xl">
        <Link
          to={"/search?category=food&pet=birds"}
          className="w-40 p-1 pl-2 duration-200 cursor-pointer rounded-xl hover:text-sky-500 hover:bg-sky-100"
        >
          Food
        </Link>
        <Link
          to={"/search?category=feeders&pet=birds"}
          className="w-40 p-1 pl-2 duration-200 cursor-pointer rounded-xl hover:text-sky-500 hover:bg-sky-100"
        >
          Feeder
        </Link>
        <Link
          to={"/search?category=house&pet=birds"}
          className="w-40 p-1 pl-2 duration-200 cursor-pointer rounded-xl hover:text-sky-500 hover:bg-sky-100"
        >
          House
        </Link>
        <Link
          to={"/search?category=grooming&pet=birds"}
          className="w-40 p-1 pl-2 duration-200 cursor-pointer rounded-xl hover:text-sky-500 hover:bg-sky-100"
        >
          Grooming
        </Link>
        <Link
          to={"/search?category=cage&pet=birds"}
          className="w-40 p-1 pl-2 duration-200 cursor-pointer rounded-xl hover:text-sky-500 hover:bg-sky-100"
        >
          Cages
        </Link>
        <Link
          to={"/search?&category=toys&pet=birds"}
          className="w-40 p-1 pl-2 duration-200 cursor-pointer rounded-xl hover:text-sky-500 hover:bg-sky-100"
        >
          Toys
        </Link>
        <Link
          to={"/search?&category=accessories&pet=birds"}
          className="w-40 p-1 pl-2 duration-200 cursor-pointer rounded-xl hover:text-sky-500 hover:bg-sky-100"
        >
          Accessories
        </Link>
      </div>
    </div>
  );
};
export default BirdsDropdown;
