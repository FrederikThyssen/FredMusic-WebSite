import { Star } from "lucide-react";
import type { Testimonial } from "../../types";
import { Card } from "../ui/Card";

type TestimonialCardProps = {
  testimonial: Testimonial;
  theme?: "dark" | "wedding";
};

export function TestimonialCard({ testimonial, theme = "dark" }: TestimonialCardProps) {
  const isWedding = theme === "wedding";

  return (
    <Card variant={isWedding ? "wedding" : "dark"} className="p-6">
      <div className="flex gap-1 text-gold-300" aria-label={`${testimonial.rating} étoiles sur 5`}>
        {Array.from({ length: testimonial.rating }).map((_, index) => (
          <Star key={index} className="h-4 w-4 fill-current" aria-hidden="true" />
        ))}
      </div>
      <blockquote className={isWedding ? "mt-4 leading-7 text-night-800" : "mt-4 leading-7 text-ivory/76"}>
        “{testimonial.quote}”
      </blockquote>
      <p className={isWedding ? "mt-5 font-semibold text-night-950" : "mt-5 font-semibold text-ivory"}>
        {testimonial.author}
      </p>
      <p className={isWedding ? "mt-1 text-sm text-warm-700" : "mt-1 text-sm text-gold-200"}>
        {testimonial.eventType}
      </p>
    </Card>
  );
}
