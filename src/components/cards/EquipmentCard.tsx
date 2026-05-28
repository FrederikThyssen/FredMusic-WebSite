import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { EquipmentItem } from "../../types";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";

type EquipmentCardProps = {
  item: EquipmentItem;
};

export function EquipmentCard({ item }: EquipmentCardProps) {
  return (
    <Card className="group overflow-hidden">
      <div className="aspect-[4/3] overflow-hidden bg-night-800">
        <img
          src={item.marketingImage}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover opacity-82 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
        />
      </div>
      <div className="p-5">
        <Badge variant="gold">{item.brand}</Badge>
        <h3 className="mt-4 font-display text-2xl text-ivory">{item.name}</h3>
        <p className="mt-3 text-sm leading-6 text-ivory/68">{item.shortDescription}</p>
        <Link
          to={`/location/${item.slug}`}
          className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase text-gold-300 hover:text-gold-200"
        >
          Voir le matériel
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </Card>
  );
}
