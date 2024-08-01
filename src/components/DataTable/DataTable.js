
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import InfiniteScroll from 'react-infinite-scroll-component';
import sortingImage from './sorting.png';

const DataTable = () => {

  const [employeeData, setEmployeeData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [sortField, setSortField] = useState(''); 
  const [sortOrder, setSortOrder] = useState('asc'); 

  useEffect(() => {
    
    setEmployeeData([]);
    setSkip(0);
    setHasMore(true);
    fetchDataWithFilter();
  }, [selectedGender, selectedCountry]);


  // function to fetchData when filters applied

  const fetchDataWithFilter = async () => {
    try {
      let url = '';

      if (selectedGender) {
        url = `https://dummyjson.com/users/filter?skip=0&limit=10&key=gender&value=${selectedGender}`;
      } else {
        url = `https://dummyjson.com/users?skip=0&limit=10`;
      }

      const response = await axios.get(url);
      let newEmployees = response.data.users;

      
      if (sortField) {
        newEmployees = sortData(newEmployees, sortField, sortOrder);
      }

      if (newEmployees.length > 0) {
        setEmployeeData(newEmployees);
        setSkip(10);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // function to fetchData when no filters applied
  const fetchData = async () => {
    try {
      let url = '';

      if (selectedGender) {
        url = `https://dummyjson.com/users/filter?skip=${skip}&limit=10&key=gender&value=${selectedGender}`;
      } else {
        url = `https://dummyjson.com/users?skip=${skip}&limit=10`;
      }

      const response = await axios.get(url);
      let newEmployees = response.data.users;

      
      if (sortField) {
        newEmployees = sortData(newEmployees, sortField, sortOrder);
      }

      if (newEmployees.length > 0) {
        setEmployeeData((prevData) => [...prevData, ...newEmployees]);
        setSkip((prevSkip) => prevSkip + 10);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  // function to sortData using field and Order

  const sortData = (data, field, order) => {
    return [...data].sort((a, b) => {
      if (field === 'id' || field === 'age') {
        return order === 'asc' ? a[field] - b[field] : b[field] - a[field];
      }
      if (field === 'fullName') {
        const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
        const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
        if (order === 'asc') return nameA.localeCompare(nameB);
        return nameB.localeCompare(nameA);
      }
      return 0;
    });
  };

  // function to set the sortfield and order

  const handleSort = (field) => {
    const newOrder = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(newOrder);

    
    setEmployeeData((prevData) => sortData(prevData, field, newOrder));
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-[80%]  border border-gray-200">
        <Header
          onFilterChange={(name, value) => {
            if (name === 'gender') setSelectedGender(value);
            else if (name === 'country') setSelectedCountry(value);
          }}
        />

        {/* implementing infinite scroll using infinite scroll component */}

<InfiniteScroll
  className="rounded-xl border mx-2 border-gray-200"
  dataLength={employeeData.length}
  next={fetchData}
  hasMore={hasMore}
  loader={<div className="text-center py-4">Loading more...</div>}
  endMessage={<p className="text-center py-4">No more data to load</p>}
>
  <table className="rounded-xl">
    <thead className="text-left w-full h-16 items-center">
      <tr className='border-b border-gray-200'>
        <th className="flex items-center cursor-pointer pl-5 pr-10 h-16" onClick={() => handleSort('id')}>
          ID
          <img src={sortingImage} className="w-[100%]" />
        </th>
        <th className="w-[10%]">Image</th>
        <th className="flex items-center cursor-pointer" onClick={() => handleSort('fullName')}>
          Full Name
          <img src={sortingImage} className="w-[10%]" />
        </th>
        <th className="w-[15%] cursor-pointer" onClick={() => handleSort('age')}>
          Demography
        </th>
        <th className="w-[25%]">Designation</th>
        <th className="min-w-[30%]">Location</th>
      </tr>
    </thead>
    <tbody className="text-left text-gray-400 text-sm">
      {employeeData.map((employee) => (
        <tr key={employee.id} className='border-b border-gray-200'>
          <td className="w-[5%] text-center">{employee.id}</td>
          <td>
            <img className='rounded-md' src={employee.image} alt={employee.firstName} width="45px" />
          </td>
          <td className="w-fit">{`${employee.firstName} ${employee.lastName}`}</td>
          <td className="w-[15%]">{`${employee.gender[0].toUpperCase()} / ${employee.age}`}</td>
          <td className="w-[25%]">{employee.company.title}</td>
          <td className="min-w-[30%]">{`${employee.address.city}, ${employee.address.country}`}</td>
        </tr>
      ))}
    </tbody>
  </table>
</InfiniteScroll>
      </div>
    </div>
  );
};

export default DataTable;
