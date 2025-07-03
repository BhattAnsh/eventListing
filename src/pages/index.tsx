import { GetStaticProps } from "next";
import events from '@/data/data.json';
import { Event } from "@/types/event";
import { useState, useEffect } from "react";
import Head from "next/head";
import Filter from "@/components/filter";
import EventCard from "@/components/eventCard";
import Button from "@/components/button";

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
    <>
      <Head>
        <title>Event Listings - Find Amazing Events Near You</title>
        <meta name="description" content="Discover and explore amazing events in your area. Filter by location, date, category, and price to find the perfect event for you." />
        <meta name="keywords" content="events, listings, local events, entertainment, activities" />
        <meta property="og:title" content="Event Listings - Find Amazing Events Near You" />
        <meta property="og:description" content="Discover and explore amazing events in your area. Filter by location, date, category, and price to find the perfect event for you." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Event Listings - Find Amazing Events Near You" />
        <meta name="twitter:description" content="Discover and explore amazing events in your area. Filter by location, date, category, and price to find the perfect event for you." />
      </Head>
      <div className="pt-8">
        <main className="container-narrow py-12">
          <header className="mb-10">
            <h1 className="text-3xl font-semibold mb-2">Find Events</h1>
            <p className="text-[var(--gray-500)]">Discover and explore amazing events in your area</p>
          </header>
          
          <Filter 
            locations={uniqueLocations}
            dates={uniqueDates}
            categories={uniqueCategories}
            selectedLocation={selectedLocation}
            selectedDate={selectedDate}
            selectedCategory={selectedCategory}
            searchTerm={searchTerm}
            priceRange={priceRange}
            onLocationChange={setSelectedLocation}
            onDateChange={setSelectedDate}
            onCategoryChange={setSelectedCategory}
            onSearchChange={setSearchTerm}
            onPriceRangeChange={setPriceRange}
            onClearFilters={clearFilters}
          />

          <section className="results-section mb-6">
            <h2 className="sr-only">Event Results</h2>
            <div className="flex justify-between items-center">
              <p className="text-[var(--gray-500)]">
                Showing <span className="font-semibold">{filteredData.length}</span> of <span className="font-semibold">{events.length}</span> events
              </p>
            </div>
          </section>

          <section className="events-section">
            <h2 className="sr-only">Events List</h2>
            <div className="events-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredData.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>

            {filteredData.length === 0 && (
              <div className="no-results bg-white rounded-[var(--border-radius)] shadow-sm text-center py-16 px-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-[var(--gray-300)] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-medium mb-2">No events found</h3>
                <p className="text-[var(--gray-500)] mb-6">Try adjusting your filters to find what you&apos;re looking for.</p>
                <Button 
                  onClick={clearFilters} 
                  variant="primary"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </section>
        </main>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      events: events,
    },
  }
}
