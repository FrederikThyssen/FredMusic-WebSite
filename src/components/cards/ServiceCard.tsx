import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Service } from "../../types";
import { Card } from "../ui/Card";

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="group grid min-h-[290px] overflow-hidden">
      <div className="p-5">
        <p className="text-xs font-semibold uppercase text-gold-300">{service.category}</p>
        <h3 className="mt-4 text-xl font-semibold text-ivory">{service.title}</h3>
        <p className="mt-3 text-sm leading-6 text-ivory/68">{service.shortDescription}</p>
        <Link
          to={`/prestations/${service.slug}`}
          className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase text-gold-300 hover:text-gold-200"
        >
          En savoir plus
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
      <div className="mt-auto h-28 overflow-hidden bg-night-800">
        <img
          src={service.image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover opacity-78 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
        />
      </div>
    </Card>
  );
}
