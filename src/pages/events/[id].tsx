import Image from "next/image";
import { GetStaticPaths, GetStaticProps } from "next";
import events from "@/data/data.json";
import { Event } from "@/types/event";
import Head from "next/head";

type Props = {
    event:Event,
}
export default function EventDetailPage({ event }: Props) {
    return (
      <>
        <Head>
          <title>{event.title}</title>
          <meta name="description" content={event.description} />
        </Head>
        <main className="p-4">
          <h1 className="text-2xl font-bold">{event.title}</h1>
            <Image alt="eventImage" src = {event.image} width={400} height={400}></Image>
          <p>{event.date} - {event.location}</p>
          <p>{event.description}</p>
        </main>
      </>
    );
  }

export const getStaticPaths:GetStaticPaths = async () =>{
    const paths = events.map((event)=>({
        params:{id :event.id},

    }));
    return{paths, fallback:false};
};
export const getStaticProps:GetStaticProps = async (context) =>{
    const {id} = context.params!;
    const event = events.find((e) => e.id === id);
    if (!event){
        return {notFound:true};
    }
    return {props:{event}};
}
