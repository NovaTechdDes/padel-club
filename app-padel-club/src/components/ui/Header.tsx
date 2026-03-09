import { Cog } from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <header className="flex justify-between">
      <div>
        <p className="text-orange-500 text-xl font-bold">
          PADEL CLUB{" "}
          <span className="bg-blue-700 rounded-lg px-1 text-white">
            CHAJARI
          </span>
        </p>
        <p className="text-sm text-gray-500">Chajari, Entre Rios</p>
      </div>

      <div className="cursor-pointer hover:text-gray-600 text-black">
        <Cog />
      </div>
    </header>
  );
};

export default Header;
