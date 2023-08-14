import { createSearchParams, useNavigate } from "react-router-dom";
import { path } from "../ultils/constant";

function ProvinceButton({ name, image, provinceCode }) {
  const navigate = useNavigate();
  const handle = () => {
    const titleSearch = `Cho thuê ${name}`;
    navigate(
      {
        pathname: path.SEARCH,
        search: createSearchParams({ provinceCode }).toString(),
      },
      { state: { titleSearch } }
    );
  };
  return (
    <div
      onClick={handle}
      className="bg-white cursor-pointer shadow-md rounded-md hover:text-orange-500"
    >
      <img
        className="w-[190px] h-[110px] object-cover rounded-t-md"
        src={image}
        alt={name}
      />
      <div className="font-medium p-2 text-blue-700 text-center lg:text-md text-sm hover:text-orange-500">
        {name}
      </div>
    </div>
  );
}

export default ProvinceButton;
