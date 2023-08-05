function Modal2({ show, setShow }) {
  return (
    <>
      <div
        onBlur={() => setShow(!show)}
        className="flex flex-col w-full border border-black"
      >
        <div className="border border-gray-400">Tỉnh/Thành phố</div>
      </div>
    </>
  );
}

export default Modal2;
