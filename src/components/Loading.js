import { ColorRing } from "react-loader-spinner";

const Loading = () => {
  return (
    <ColorRing
      visible={true}
      height="70"
      width="70"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={["#ccc", "#ccc", "#ccc", "#ccc", "#ccc"]}
    />
  );
};

export default Loading;
