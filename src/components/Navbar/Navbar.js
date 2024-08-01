import React from "react";
import { IoMenu } from "react-icons/io5";

// Creating Navbar

const Navbar = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-between items-center w-[80%] border-t border-l border-r border-gray-200 ">
        <img 
          className="w-[50px] h-[fit] p-2" 
          src="https://images.yourstory.com/cs/images/companies/cc05dbe44c63-p6square-1647570469237.png?fm=auto&ar=1:1&mode=fill&fill=solid&fill-color=fff" 
          alt="Company Logo"
        />
        <IoMenu size='30px' className="text-red-700 p-2" />
      </div>
    </div>
  );
};

export default Navbar;
