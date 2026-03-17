import { FaTelegram } from "react-icons/fa6";

const TelegramIcon = () => {
  return (
    <div>
      <a
        href="https://t.me/nexusgloballogistic"
        target="_blank"
        className="fixed bottom-3 right-6 rounded-full w-20 h-14 shadow-lg "
      >
        <FaTelegram className="h-10 w-36 text-blue-500 animate-bounce" />
      </a>
    </div>
  );
};

export default TelegramIcon;
