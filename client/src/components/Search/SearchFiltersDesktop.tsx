import { FaRegTrashAlt } from "react-icons/fa";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import CategoryFilter from "./FiltersDesktop/CategoryFilter";
import PriceFilter from "./FiltersDesktop/PriceFilter";
import PetTypeFilter from "./FiltersDesktop/PetTypeFilter";
import { useSearchParams } from "react-router-dom";
import { Category, PetType } from "@/utils/Types & Interfaces";

type Props = {
  categories: Category[];
  pets: PetType[];
};

const SearchFiltersDesktop = ({ categories, pets }: Props) => {
  const [searchParams] = useSearchParams();
  const categoryParams = searchParams.get("category");
  const priceParams = searchParams.get("price");
  const petParams = searchParams.get("pet");

  const [category, setCategory] = useState(categoryParams || "");
  const [price, setPrice] = useState(priceParams || "");
  const [petType, setPetType] = useState(petParams || "");
  const [, setSearchParams] = useSearchParams();

  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };
  const handleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };
  const handlePetType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPetType(e.target.value);
  };

  const handleSearchQuery = () => {
    setSearchParams((state) => {
      if (category !== "") {
        state.set("category", category);
      }
      if (price !== "") {
        if (price === "200") {
          state.set("price", price);
          state.set("criteria", "gt");
        } else {
          state.set("price", price);
          state.set("criteria", "lt");
        }
      }
      if (petType !== "") {
        state.set("pet", petType);
      }
      return state;
    });
  };

  const deleteSearchParams = () => {
    setSearchParams((state) => {
      state.delete("category");
      state.delete("price");
      state.delete("criteria");
      state.delete("pet");
      state.delete("name");
      return state;
    });
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  useEffect(() => {
    setCategory(categoryParams || "");
    setPrice(priceParams || "");
    setPetType(petParams || "");
  }, [categoryParams, priceParams, petParams]);

  return (
    <div className="w-3/4 h-48 mb-4 font-roboto text-zinc-900 dark:text-zinc-200">
      <aside className="flex flex-col gap-10 select-none">
        <div className="flex flex-col gap-2 ">
          <p className="font-medium">Filter Products</p>
          <hr className="border-zinc-300" />
          <button
            className="flex items-center gap-3 text-sm"
            onClick={deleteSearchParams}
          >
            Remove filters <FaRegTrashAlt />
          </button>
        </div>
        <div>
          <Button
            className="bg-sky-500 dark:text-white"
            onClick={handleSearchQuery}
          >
            Apply Filters
          </Button>
        </div>
        <CategoryFilter
          category={category}
          categories={categories}
          handleCategory={handleCategory}
        />
        <PetTypeFilter
          petType={petType}
          pets={pets}
          handlePetType={handlePetType}
        />
        <PriceFilter price={price} handlePrice={handlePrice} />
      </aside>
    </div>
  );
};
export default SearchFiltersDesktop;
