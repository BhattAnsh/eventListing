import Image from "next/image";
import { GetStaticProps } from "next";
import events from '@/data/data.json';
import { Event } from "@/types/event";
import Link from "next/link";
type Props ={
  events: Event[],
}
export default function Home({events}:Props) {

  return (
    <div className="home-page-container">
      <div className="eventContainer">
        
      {events.map((event) => (
        <div key={event.id}>
          <Image alt="eventImage" src={event.image} width={200} height={200}></Image>
          <h2>{event.title}</h2>
          <p>{event.date} - {event.location}</p>
          <p>{event.price}</p>
          <p>{event.capacity}</p>
          <Link href={`events/${event.id}`}>View Details</Link>
        </div>
      ))}
      {events.map((event) =>(
        <div key={event.id}>

        </div>
      ))}
      </div>
    </div>
  );
}
export const getStaticProps:GetStaticProps = async() =>{
  return {
    props:{
      events,
    },
  }
}
