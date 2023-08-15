import { text } from "../ultils/common/databaseContact";
import Button from "./Button";

function Contact() {
  return (
    <div className="w-full bg-white flex flex-col items-center py-7 px-7 gap-6 rounded-md border border-dashed border-8 border-indigo-100">
      <img className="lg:w-3/5 w-4/5 " src={text.image} />
      <h2 className="text-lg">{text.content}</h2>
      <div className="w-full md:flex text-center justify-around">
        {text.contacts.map((item, index) => (
          <div key={index} className="flex-1">
            <h2 className="text-[#f60] font-medium">{item.text}</h2>
            <span className="block cursor-pointer text-[#233762] font-semibold text-xl">
              {item.phone}
            </span>
            <span className=" text-[#233762] cursor-pointer font-semibold text-xl">
              {item.zalo}
            </span>
          </div>
        ))}
      </div>
      <Button
        text={"Gửi liên hệ"}
        textColor={"text-white"}
        bgColor={"bg-secondary1"}
      />
    </div>
  );
}

export default Contact;
