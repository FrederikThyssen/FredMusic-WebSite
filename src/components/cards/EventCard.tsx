import { Link } from "react-router-dom";
import { CalendarDays, MapPin } from "lucide-react";
import type { Event } from "../../types";
import { formatDate } from "../../utils/formatDate";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";

type EventCardProps = {
  event: Event;
};

export function EventCard({ event }: EventCardProps) {
  return (
    <Card className="grid gap-5 p-5 md:grid-cols-[160px_1fr_auto] md:items-center">
      <img
        src={event.image}
        alt=""
        loading="lazy"
        className="aspect-[4/3] h-full w-full object-cover md:h-32"
      />
      <div>
        <Badge variant="outline">{event.type}</Badge>
        <h3 className="mt-3 font-display text-2xl text-ivory">{event.title}</h3>
        <p className="mt-2 text-sm leading-6 text-ivory/68">{event.description}</p>
        <div className="mt-3 flex flex-wrap gap-4 text-sm text-ivory/62">
          <span className="inline-flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-gold-300" aria-hidden="true" />
            {formatDate(event.date)}
          </span>
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gold-300" aria-hidden="true" />
            {event.location}
          </span>
        </div>
      </div>
      <Link
        to={`/evenements/${event.slug}`}
        className="border border-gold-400 px-4 py-3 text-center text-xs font-semibold uppercase text-gold-200 hover:bg-gold-300 hover:text-night-950"
      >
        Voir l'événement
      </Link>
    </Card>
  );
}
