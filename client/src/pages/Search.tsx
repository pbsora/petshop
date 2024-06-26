import SearchBody from "@/components/Search/SearchBody";
import SearchCategories from "@/components/Search/SearchCategories";
const Search = () => {
  return (
    <main className="min-h-[110vh] lg:min-h-[150vh] mb-6">
      <div className="flex flex-col md:grid md:grid-cols-8 w-[8] md:w-[85vw] xl:w-[75vw] m-auto md:gap-4 md:mt-6 ">
        <SearchCategories />
        <SearchBody />
      </div>
    </main>
  );
};
export default Search;
