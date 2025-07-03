import Image from "next/image";
import { GetStaticProps } from "next";
import events from '@/data/data.json';
import { Event } from "@/types/event";
import Link from "next/link";
import { useState, useEffect } from "react";

type Props = {
  events: Event[],
}

export default function Home({ events }: Props) {
  const [filteredData, setFilteredData] = useState<Event[]>(events);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const allLocations = events.map(event => event.city);
  const allDates = events.map(event => event.date);
  const allCategories = events.map(event => event.category);
  const uniqueDates = Array.from(new Set(allDates)).sort();
  const uniqueLocations = Array.from(new Set(allLocations)).sort();
  const uniqueCategories = Array.from(new Set(allCategories)).sort();

  useEffect(() => {
    const extractPrice = (priceStr: string): number => {
      if (priceStr.toLowerCase().includes('free')) return 0;
      const match = priceStr.match(/₹([\d,]+)/);
      return match ? parseInt(match[1].replace(',', '')) : 0;
    };

    const applyFilters = () => {
      let filtered = events;

      if (selectedLocation) {
        filtered = filtered.filter(event => event.city === selectedLocation);
      }

      if (selectedDate) {
        filtered = filtered.filter(event => event.date === selectedDate);
      }

      if (selectedCategory) {
        filtered = filtered.filter(event => event.category === selectedCategory);
      }

      if (searchTerm) {
        filtered = filtered.filter(event =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }

      if (priceRange) {
        filtered = filtered.filter(event => {
          const price = extractPrice(event.price);
          switch (priceRange) {
            case 'free': return price === 0;
            case '0-500': return price > 0 && price <= 500;
            case '500-2000': return price > 500 && price <= 2000;
            case '2000+': return price > 2000;
            default: return true;
          }
        });
      }

      setFilteredData(filtered);
    };

    applyFilters();
  }, [selectedLocation, selectedDate, selectedCategory, searchTerm, priceRange, events]);

  const clearFilters = () => {
    setSelectedLocation("");
    setSelectedDate("");
    setSelectedCategory("");
    setSearchTerm("");
    setPriceRange("");
    setFilteredData(events);
  };

  return (
    <div className="home-page-container p-6">
      <div className="filters-section mb-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div>
          <label htmlFor="searchInput" className="block text-sm font-medium mb-1">
            Search Events:
          </label>
          <input
            id="searchInput"
            type="text"
            className="border rounded px-3 py-2 w-full"
            placeholder="Search by title, description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="locationFilter" className="block text-sm font-medium mb-1">
            Filter by Location:
          </label>
          <select
            id="locationFilter"
            className="border rounded px-3 py-2 w-full"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="">All Locations</option>
            {uniqueLocations.map((location) => (
              <option value={location} key={location}>{location}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="dateFilter" className="block text-sm font-medium mb-1">
            Filter by Date:
          </label>
          <select
            id="dateFilter"
            className="border rounded px-3 py-2 w-full"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            <option value="">All Dates</option>
            {uniqueDates.map((date) => (
              <option value={date} key={date}>{date}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="categoryFilter" className="block text-sm font-medium mb-1">
            Filter by Category:
          </label>
          <select
            id="categoryFilter"
            className="border rounded px-3 py-2 w-full"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {uniqueCategories.map((category) => (
              <option value={category} key={category}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="priceFilter" className="block text-sm font-medium mb-1">
            Filter by Price:
          </label>
          <select
            id="priceFilter"
            className="border rounded px-3 py-2 w-full"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          >
            <option value="">All Prices</option>
            <option value="free">Free</option>
            <option value="0-500">₹1 - ₹500</option>
            <option value="500-2000">₹500 - ₹2000</option>
            <option value="2000+">₹2000+</option>
          </select>
        </div>

        <div className="flex items-end">
          <button 
            onClick={clearFilters} 
            className="bg-gray-500 text-white px-4 py-2 rounded w-full hover:bg-gray-600"
          >
            Clear Filters
          </button>
        </div>
      </div>

      <div className="results-info mb-4">
        <p className="text-gray-600">
          Showing {filteredData.length} of {events.length} events
        </p>
      </div>

      <div className="events-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((event) => (
          <div key={event.id} className="event-card border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
            <Image 
              alt={event.title} 
              src={event.image} 
              width={300} 
              height={200} 
              className="w-full h-48 object-cover rounded mb-4"
            />
            <div className="event-content">
              <span className="category-badge bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                {event.category}
              </span>
              <h2 className="text-xl font-bold mt-2 mb-2">{event.title}</h2>
              <div className="event-details text-sm text-gray-600 space-y-1">
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Time:</strong> {event.time}</p>
                <p><strong>Location:</strong> {event.city}</p>
                <p><strong>Price:</strong> <span className="text-green-600 font-semibold">{event.price}</span></p>
                <p><strong>Capacity:</strong> {event.capacity} people</p>
              </div>
              <div className="tags mt-3">
                {event.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="tag bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded mr-1">
                    {tag}
                  </span>
                ))}
              </div>
              <Link 
                href={`events/${event.id}`} 
                className="view-details-btn block mt-4 bg-blue-500 text-white text-center py-2 rounded hover:bg-blue-600 transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredData.length === 0 && (
        <div className="no-results text-center py-12">
          <p className="text-gray-500 text-lg">No events found matching your criteria.</p>
          <button 
            onClick={clearFilters} 
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      events: events,
    },
  }
}
