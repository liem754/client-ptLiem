import { memo } from "react";

function Button({
  IcBefore,
  text,
  textColor,
  bgColor,
  IcAfter,
  onClick,
  fullwidth,
  pd,
  size,
  active,
  sizefont,
  mt,
  mb,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-2  ${pd} ${sizefont} ${textColor} ${bgColor} ${
        fullwidth && "w-full"
      } outline-none text-md ${active} rounded-md hover:underline flex items-center justify-center gap-1`}
    >
      {IcBefore && <IcBefore className={`${mb}`} />}
      <span className={` ${mt} text-center `}>{text}</span>
      {IcAfter && <IcAfter size={`${size}px`} />}
    </button>
  );
}

export default memo(Button);
