import { useSearchParams } from "react-router-dom";
import Select from "../ui/Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";
  function handleChange(e) {
    searchParams.set("sortBy", e.target.value); //serchParams.set ettiğimizde önceki sorguların üstüne yazabiliyoruz. direkt setSearchParams yaparsak url sıfırlanıyor olması gereken bu. setSearchParams({ sortBy: "price" }) yaparsak, React bunu yeni bir nesne olarak algılar ve eski parametreleri siler
    setSearchParams(searchParams);
  }

  return (
    <Select
      value={sortBy}
      options={options}
      type="white"
      onChange={handleChange}
    />
  );
}

export default SortBy;
