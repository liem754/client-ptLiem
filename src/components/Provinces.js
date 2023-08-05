import ProvinceButton from "./ProvinceButton";
import { location } from "../ultils/constant";
function Provinces() {
  return (
    <div className="flex items-center gap-5 justify-center">
      {location.map((item) => (
        <ProvinceButton
          image={item.image}
          name={item.name}
          provinceCode={item.provinceCode}
        />
      ))}
    </div>
  );
}

export default Provinces;
