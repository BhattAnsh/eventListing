import Image from "next/image";
import { GetStaticPaths, GetStaticProps } from "next";
import events from "@/data/data.json";
import { Event } from "@/types/event";
import Head from "next/head";
import { useState } from "react";
import Button from "@/components/button";
import Link from "next/link";

type Props = {
    event: Event,
}

export default function EventDetailPage({ event }: Props) {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
      <>
        <Head>
          <title>{`${event.title} - ${event.date} in ${event.city} | Event Details`}</title>
          <meta name="description" content={`${event.description} Join us on ${event.date} at ${event.time} in ${event.city}. Price: ${event.price}. Capacity: ${event.capacity} people.`} />
          <meta name="keywords" content={`${event.tags.join(', ')}, ${event.category}, ${event.city}, events`} />
          <meta property="og:title" content={`${event.title} - ${event.date}`} />
          <meta property="og:description" content={event.description} />
          <meta property="og:image" content={event.image} />
          <meta property="og:type" content="event" />
          <meta property="og:url" content={`/events/${event.id}`} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={`${event.title} - ${event.date}`} />
          <meta name="twitter:description" content={event.description} />
          <meta name="twitter:image" content={event.image} />
          <meta property="event:start_time" content={event.date} />
          <meta property="event:location" content={event.location} />
          <meta property="event:organizer" content="Event Listings" />
        </Head>
        <div className="pt-8">
          <main className="container-narrow py-12">
            <div className="mb-8">
              <Link href="/" className="inline-block transition-transform hover:-translate-x-1">
                <Button variant="text" size="small" icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                }>
                  Back to Events
                </Button>
              </Link>
            </div>
            
            <article className="event-detail">
              <header className="mb-10">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="category-badge inline-block bg-[var(--accent-light)] text-[var(--accent)] text-xs font-semibold px-3 py-1 rounded-full">
                    {event.category}
                  </span>
                  <span className="text-[var(--gray-500)] text-sm">
                    {event.date} • {event.time}
                  </span>
                </div>
                
                <h1 className="text-3xl font-semibold mb-6">{event.title}</h1>
                
                <figure className="relative rounded-[var(--border-radius)] overflow-hidden mb-8 bg-white shadow-sm">
                  {!imageLoaded && (
                    <div className="absolute inset-0 bg-[var(--gray-100)] animate-pulse" style={{ height: '500px' }} />
                  )}
                  <Image 
                    alt={`Event image for ${event.title}`} 
                    src={event.image} 
                    width={1200} 
                    height={500} 
                    className={`w-full object-cover rounded-[var(--border-radius)] transition-opacity duration-300 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ height: '500px' }}
                    onLoad={() => setImageLoaded(true)}
                    priority
                  />
                </figure>
              </header>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <section className="event-description lg:col-span-2">
                  <div className="bg-white rounded-[var(--border-radius)] shadow-sm p-8">
                    <h2 className="text-xl font-semibold mb-4">About This Event</h2>
                    <p className="text-[var(--gray-500)] leading-relaxed mb-8">{event.description}</p>
                    
                    <h2 className="text-xl font-semibold mb-4">Tags</h2>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {event.tags.map(tag => (
                        <span key={tag} className="bg-[var(--gray-100)] text-[var(--gray-500)] px-3 py-1 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </section>
                
                <aside className="lg:col-span-1">
                  <div className="bg-white rounded-[var(--border-radius)] shadow-sm p-6 sticky top-6">
                    <h2 className="text-lg font-semibold mb-4">Event Details</h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="mt-0.5 mr-3 text-[var(--gray-400)]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-[var(--foreground)]">Date & Time</h3>
                          <p className="text-[var(--gray-500)]">{event.date} at {event.time}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="mt-0.5 mr-3 text-[var(--gray-400)]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-[var(--foreground)]">Location</h3>
                          <address className="not-italic text-[var(--gray-500)]">
                            <p>{event.city}</p>
                            <p>{event.location}</p>
                          </address>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="mt-0.5 mr-3 text-[var(--gray-400)]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-[var(--foreground)]">Price</h3>
                          <p className="text-[var(--success)] font-medium">{event.price}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="mt-0.5 mr-3 text-[var(--gray-400)]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-[var(--foreground)]">Capacity</h3>
                          <p className="text-[var(--gray-500)]">{event.capacity} people</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="mt-0.5 mr-3 text-[var(--gray-400)]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-[var(--foreground)]">Organizer</h3>
                          <p className="text-[var(--gray-500)]">{event.organizer}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <Button variant="primary" fullWidth size="large">
                        Register for Event
                      </Button>
                    </div>
                  </div>
                </aside>
              </div>
            </article>
          </main>
        </div>
      </>
    );
  }

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = events.map((event) => ({
        params: { id: event.id },
    }));
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const { id } = context.params!;
    const event = events.find((e) => e.id === id);
    if (!event) {
        return { notFound: true };
    }
    return { props: { event } };
}
