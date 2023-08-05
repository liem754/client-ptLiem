function Description({ posts }) {
  return (
    <>
      {posts &&
        JSON.parse(posts?.description)?.map((item, index) => {
          return (
            <div className="py-1 font-normal" key={index}>
              {item}
            </div>
          );
        })}
    </>
  );
}

export default Description;
