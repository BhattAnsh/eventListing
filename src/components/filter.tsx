import React from 'react';
import Button from './button';

type FilterProps = {
  locations: string[];
  dates: string[];
  categories: string[];
  selectedLocation: string;
  selectedDate: string;
  selectedCategory: string;
  searchTerm: string;
  priceRange: string;
  onLocationChange: (location: string) => void;
  onDateChange: (date: string) => void;
  onCategoryChange: (category: string) => void;
  onSearchChange: (search: string) => void;
  onPriceRangeChange: (price: string) => void;
  onClearFilters: () => void;
};

export const Filter = ({
  locations,
  dates,
  categories,
  selectedLocation,
  selectedDate,
  selectedCategory,
  searchTerm,
  priceRange,
  onLocationChange,
  onDateChange,
  onCategoryChange,
  onSearchChange,
  onPriceRangeChange,
  onClearFilters,
}: FilterProps) => {
  return (
    <section className="filters-section mb-10">
      <h1 className="sr-only">Event Filters</h1>
      <div className="bg-white rounded-[var(--border-radius)] shadow-sm p-6">
        <div className="mb-6">
          <div className="relative">
            <input
              id="searchInput"
              type="text"
              className="w-full pl-10 pr-4 py-3 border-none bg-[var(--gray-100)] rounded-full text-[var(--foreground)] placeholder-[var(--gray-400)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              placeholder="Search events by title, description or tags..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3.5 text-[var(--gray-400)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="filter-group">
            <label htmlFor="locationFilter" className="block text-sm font-medium text-[var(--gray-500)] mb-1.5">
              Location
            </label>
            <select
              id="locationFilter"
              className="w-full py-2 px-3 border border-[var(--gray-300)] rounded-md bg-white text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] focus:border-[var(--accent)]"
              value={selectedLocation}
              onChange={(e) => onLocationChange(e.target.value)}
            >
              <option value="">All Locations</option>
              {locations.map((location) => (
                <option value={location} key={location}>{location}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="dateFilter" className="block text-sm font-medium text-[var(--gray-500)] mb-1.5">
              Date
            </label>
            <select
              id="dateFilter"
              className="w-full py-2 px-3 border border-[var(--gray-300)] rounded-md bg-white text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] focus:border-[var(--accent)]"
              value={selectedDate}
              onChange={(e) => onDateChange(e.target.value)}
            >
              <option value="">All Dates</option>
              {dates.map((date) => (
                <option value={date} key={date}>{date}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="categoryFilter" className="block text-sm font-medium text-[var(--gray-500)] mb-1.5">
              Category
            </label>
            <select
              id="categoryFilter"
              className="w-full py-2 px-3 border border-[var(--gray-300)] rounded-md bg-white text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] focus:border-[var(--accent)]"
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option value={category} key={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="priceFilter" className="block text-sm font-medium text-[var(--gray-500)] mb-1.5">
              Price
            </label>
            <select
              id="priceFilter"
              className="w-full py-2 px-3 border border-[var(--gray-300)] rounded-md bg-white text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] focus:border-[var(--accent)]"
              value={priceRange}
              onChange={(e) => onPriceRangeChange(e.target.value)}
            >
              <option value="">All Prices</option>
              <option value="free">Free</option>
              <option value="0-500">₹1 - ₹500</option>
              <option value="500-2000">₹500 - ₹2000</option>
              <option value="2000+">₹2000+</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button 
            onClick={onClearFilters} 
            variant="secondary"
            size="medium"
          >
            Clear Filters
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Filter;
