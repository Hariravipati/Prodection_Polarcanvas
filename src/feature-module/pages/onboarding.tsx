import React, { useState, useMemo } from 'react';
import '../../assets/css/onboarding.css';
import { Edit, Eye, Trash2 } from 'lucide-react';
import formSchema from "../../forms/e-onboarding.json";
import FormBuilder from "../../components/FormBuilder/FormBuilder";

const Onboarding = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const data = [
    {
      empId: 'Emp-001',
      name: 'Venkatesh',
      email: 'Venkatesh@gmail.com',
      phone: '+91 87982 81923',
      designation: 'Finance',
      joiningDate: '12 Sep 2024',
      status: 'Active'
    },
    {
      empId: 'Emp-002',
      name: 'Karthik',
      email: 'karthik@gmail.com',
      phone: '+91 98701 08923',
      designation: 'Developer',
      joiningDate: '24 Oct 2024',
      status: 'Active'
    },
    {
      empId: 'Emp-003',
      name: 'Ganesh',
      email: 'Ganesh@gmail.com',
      phone: '+91 98766 88923',
      designation: 'Developer',
      joiningDate: '18 Nov 2024',
      status: 'Active'
    },
    {
      empId: 'Emp-004',
      name: 'Gowtham',
      email: 'gowtham@gmail.com',
      phone: '+91 92876 88923',
      designation: 'Executive',
      joiningDate: '17 Jan 2025',
      status: 'Inactive'
    },
    {
      empId: 'Emp-005',
      name: 'Santhosh',
      email: 'santhosh@gmail.com',
      phone: '+91 92841 98923',
      designation: 'Manager',
      joiningDate: '05 May 2025',
      status: 'Active'
    }
  ];

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    const term = searchTerm.toLowerCase();
    return data.filter(item =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(term)
      )
    );
  }, [searchTerm]);


  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, currentPage, pageSize]);

  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <FormBuilder json={formSchema} />
      </div>
    </div>
  );
};

export default Onboarding;
