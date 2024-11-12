import axios from "axios";
import React, { useEffect, useState } from "react";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './DropdownMenu.css';
import FilteredTable from "../Tabel/FilteredTabel";

const filterOptions = [
    "Wins", "Loss", "Performance"
];

function DropdownMenu() {
    const [data, setData] = useState([]);
    const [genderOptions, setGenderOptions] = useState([]);
    const [yearOptions, setYearOptions] = useState([]);
    const [selectedGender, setSelectedGender] = useState('Men');
    const [selectedYear, setSelectedYear] = useState('2020');
    const [filters, setFilters] = useState([]);
    const [filterSelections, setFilterSelections] = useState({});

    const fetchData = async () => {
        try {
            const response = await axios.get('https://www.mockachino.com/5db99bd2-28c5-46/ipl/table');
            setData(response.data.points);
            extractOptions(response.data.points);
        } catch (error) {
            console.error(`Error:`, error);
        }
    };

    const extractOptions = (data) => {
        const uniqueGenders = [...new Set(data.map(item => item.Gender))];
        const uniqueYears = [...new Set(data.map(item => item.IPLYear))].sort((a, b) => a - b);
        setGenderOptions(uniqueGenders);
        setYearOptions(uniqueYears.map(year => year.toString()));
    };

    const handleAddFilter = () => {
        if (filters.length < filterOptions.length) {
            const remainingOptions = filterOptions.filter(opt => !filters.includes(opt));
            setFilters([...filters, remainingOptions[0]]);
        }
    };

    const handleRemoveFilter = (filter) => {
        setFilters(filters.filter(f => f !== filter));
        setFilterSelections(prevSelections => {
            const updatedSelections = { ...prevSelections };
            delete updatedSelections[filter];
            return updatedSelections;
        });
    };

    const handleFilterChange = (filter, value) => {
        setFilterSelections({
            ...filterSelections,
            [filter]: value
        });
    };

    // Filter the data based on the selected gender, year, and additional filter selections
    const filteredData = data
        .filter(item => item.Gender.toLowerCase() === selectedGender.toLowerCase() && item.IPLYear.toString() === selectedYear)
        .filter(item => {
            return filters.every(filter => {
                if (filterSelections[filter]) {
                    return item[filter] === filterSelections[filter];
                }
                return true;
            });
        });

    const getFilterOptions = (filter) => {
        const filteredItems = data
            .filter(item => item.Gender.toLowerCase() === selectedGender.toLowerCase() && item.IPLYear.toString() === selectedYear);
        return [...new Set(filteredItems.map(item => item[filter]))];
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="Dropdown-container">
            <div className="gender">
                <label className="label">Gender:</label>
                <Dropdown
                    options={genderOptions}
                    onChange={(option) => setSelectedGender(option.value)}
                    value={selectedGender}
                    className="dropdown"
                />
            </div>
            <div className="year">
                <label className="label">Year:</label>
                <Dropdown
                    options={yearOptions}
                    onChange={(option) => setSelectedYear(option.value)}
                    value={selectedYear}
                    className="dropdown"
                />
            </div>

            {/* Add Filter button */}
            <div className="Add-Filter">
                <button className="filter-btn" onClick={handleAddFilter}>Add Filter</button>
            </div>

            {/* Render filters below the Add Filter button */}
            {filters.map(filter => (
                <div key={filter} className="filter-dropdown">
                    <label className="label">{filter}:</label>
                    <Dropdown
                        options={getFilterOptions(filter)}
                        onChange={(option) => handleFilterChange(filter, option.value)}
                        value={filterSelections[filter] || `Select ${filter}`}
                        placeholder={`Select ${filter}`}
                        className="dropdown"
                    />
                    <button onClick={() => handleRemoveFilter(filter)} className="close-btn">Close</button>
                </div>
            ))}

            <div>
                <FilteredTable filteredData={filteredData} />
            </div>
        </div>
    );
}

export default DropdownMenu;
