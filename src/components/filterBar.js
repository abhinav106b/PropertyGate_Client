import React from 'react';

const FilterBar = ({ filters, onFilterChange }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onFilterChange({
            ...filters,
            [name]: value
        });
    };

    return (
        <div className="filter-bar">
            <h3>Filter Properties</h3>
            <div>
                <label>Max Price</label>
                <input
                    type="number"
                    name="price"
                    value={filters.price}
                    onChange={handleChange}
                />
            </div>
            <br/>
            <div>
                <label>Apartment Type</label><br/>
                <select
                    name="aptType"
                    value={filters.aptType}
                    onChange={handleChange}
                >
                    <option value="">All</option>
                    <option value="1BHK">1BHK</option>
                    <option value="2BHK">2BHK</option>
                    <option value="3BHK">3BHK</option>
                    <option value="4BHK">4BHK</option>
                </select>
            </div>
            <br/>
            <div>
                <label>Min Bathrooms</label>
                <input
                    type="number"
                    name="bathrooms"
                    value={filters.bathrooms}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
};

export default FilterBar;
