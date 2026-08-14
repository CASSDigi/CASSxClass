import React from "react";

export default function About() {
  return (
    <div>
      <section className="bg-navy text-ivory py-24">
        <div className="container-x text-center">
          <span className="eyebrow text-gold">Our Story</span>
          <h1 className="font-display text-4xl md:text-5xl mt-3">About CASSxClass</h1>
        </div>
      </section>

      <section className="container-x py-20 grid md:grid-cols-2 gap-16 items-center">
        <div className="aspect-[4/3] overflow-hidden order-2 md:order-1">
          <img
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&q=80"
            alt="Craftsmanship"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="order-1 md:order-2">
          <h2 className="font-display text-3xl mb-5">Why "Details Define You"</h2>
          <p className="text-charcoal/70 leading-relaxed text-sm mb-4">
            We founded CASSxClass on a simple observation: the people we admired most weren't
            wearing the loudest logos — they were wearing things that quietly worked. A watch
            that kept perfect time. A wallet that got better with age. A scent that lingered
            just enough to be remembered.
          </p>
          <p className="text-charcoal/70 leading-relaxed text-sm">
            That's what we curate. Every piece is chosen for its craft first, its look second,
            and its price a distant third. We'd rather sell you one thing you'll keep for years
            than ten things you'll replace in months.
          </p>
        </div>
      </section>

      <section className="bg-navy/[0.03] py-20">
        <div className="container-x grid md:grid-cols-3 gap-10 text-center">
          {[
            { title: "Curated, Not Mass-Produced", desc: "Every product is selected, not dropshipped blindly." },
            { title: "Built to Last", desc: "Materials and construction chosen for longevity." },
            { title: "Real Human Support", desc: "Message us directly — no bots, no runaround." },
          ].map((v) => (
            <div key={v.title}>
              <span className="x-mark text-2xl">x</span>
              <h3 className="font-display text-lg mt-3">{v.title}</h3>
              <p className="text-charcoal/60 text-sm mt-2">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
