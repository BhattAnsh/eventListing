import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Event } from '@/types/event';

type EventCardProps = {
  event: Event;
};

export const EventCard = ({ event }: EventCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-');
  };

  // Extract time range
  const timeRange = event.time.split(' - ');
  const startTime = timeRange[0];
  const endTime = timeRange[1];

  return (
    <Link href={`events/${event.id}`} className="block">
      <article 
        className={`event-card bg-white rounded-[var(--border-radius)] overflow-hidden transition-all duration-300 ${
          isHovered ? 'shadow-md transform translate-y-[-4px]' : 'shadow-sm'
        } focus:outline-none`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-full h-48 overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-[var(--gray-100)] animate-pulse" />
          )}
          <Image 
            alt={event.title} 
            src={event.image} 
            width={400} 
            height={240} 
            className={`w-full h-48 object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            priority={false}
          />
        </div>
        
        <div className="p-5">
          <div className="mb-2">
            <span className="inline-block text-xs font-semibold text-[var(--accent)]">
              {event.category}
            </span>
          </div>
          
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">{event.title}</h3>
          
          <div className="space-y-1.5 text-sm">
            <div className="flex items-center text-[var(--gray-500)]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{formatDate(event.date)}</span>
            </div>
            
            <div className="flex items-center text-[var(--gray-500)]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{startTime} - {endTime}</span>
            </div>
            
            <div className="flex items-center text-[var(--gray-500)]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{event.city}</span>
            </div>
            
            <div className="flex items-center font-medium text-[var(--success)]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{event.price}</span>
            </div>
          </div>
          
          <div className="mt-3 flex flex-wrap gap-1.5">
            {event.tags.slice(0, 3).map((tag) => (
              <span 
                key={tag} 
                className="tag bg-[var(--gray-100)] text-[var(--gray-500)] text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
};

export default EventCard;
