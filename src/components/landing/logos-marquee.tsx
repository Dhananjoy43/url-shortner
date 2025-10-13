"use client";

export function LogosMarquee() {
  const logos = [
    { src: "/placeholder-logo.svg", alt: "Acme" },
    { src: "/placeholder-logo.svg", alt: "Nova" },
    { src: "/placeholder-logo.svg", alt: "Byte" },
    { src: "/placeholder-logo.svg", alt: "Finly" },
    { src: "/placeholder-logo.svg", alt: "Orbit" },
    { src: "/placeholder-logo.svg", alt: "Aperture" },
  ];
  return (
    <section
      aria-label="Trusted by"
      className="border-border/60 border-t py-10"
    >
      <div className="container mx-auto px-4">
        <p className="text-muted-foreground text-center text-xs">
          Trusted by modern teams
        </p>
        <div className="relative mt-6 overflow-hidden">
          <div className="marquee flex w-max gap-10 opacity-80">
            {logos.concat(logos).map((l, i) => (
              <img
                key={i}
                src={l.src || "/placeholder.svg"}
                alt={l.alt}
                className="h-6 w-auto grayscale"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .marquee {
          animation: marquee 20s linear infinite;
        }
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
