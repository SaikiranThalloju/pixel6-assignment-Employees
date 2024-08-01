import React from 'react';
import { FaFilter } from 'react-icons/fa6';
import { RiArrowDropDownLine } from "react-icons/ri";

// Creating Filtering Components Header

const Header = ({ onFilterChange }) => {

  
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    // getting values from Filtering Components
    onFilterChange(name, value);
  };

  return (
    <div className="flex flex-col items-center ">
  <div className="flex justify-between w-[100%] pt-20 pb-10" >
    <div className='pl-5'>
      <h1 className="text-black font-semibold text-4xl">Employees</h1>
    </div>
    <div className="flex gap-10 items-center pr-5">
      <FaFilter className="text-red-700" />
      <div className="relative">
        <select
          name="country"
          className="border border-gray-200 p-2 rounded text-black pl-3 pr-8 appearance-none"
          onChange={handleFilterChange}
        >
          <option className="text-black" value="">
            Country
          </option>
          <option className="text-black" value="United States">
            United States
          </option>
        </select>
        <div className="absolute top-0 right-0 flex items-center h-full px-2 text-red-700 pointer-events-none">
          <RiArrowDropDownLine size="24px"/>
        </div>
      </div>
      <div className='relative'>
        <select
          name="gender"
          className="border border-gray-200 p-2 rounded text-black pl-3 pr-8 appearance-none"
          onChange={handleFilterChange}
        >
          <option value="">Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <div className="absolute top-0 right-0 flex items-center h-full px-2 text-red-700 pointer-events-none">
          <RiArrowDropDownLine size="24px"/>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default Header;
