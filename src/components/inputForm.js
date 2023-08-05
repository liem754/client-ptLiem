import { memo } from "react";
function InputForm({
  setInvalifel,
  invalifel,
  label,
  value,
  setValue,
  type,
  ty,
}) {
  return (
    <div>
      <label htmlFor="phone" className="text-xs">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) =>
          setValue && setValue((pre) => ({ ...pre, [type]: e.target.value }))
        }
        onFocus={() => setInvalifel && setInvalifel([])}
        type={ty}
        className="outline-none bg-[#e8f0fe] w-full p-2 rounded-md"
      />
      {invalifel?.length > 0 && invalifel.some((i) => i.name === type) && (
        <small className="text-red-500">
          {invalifel.find((i) => i.name === type)?.messeger}
        </small>
      )}
    </div>
  );
}

export default memo(InputForm);
