const rowCopies = [0, 1, 2];

export function TechMarquee({ technologies }: { technologies: string[] }) {
  return (
    <section className="tech-marquee" aria-label="Technology stack">
      {[false, true].map((reverse) => (
        <div className="marquee-row" key={reverse ? "reverse" : "forward"}>
          <div className={reverse ? "marquee-track marquee-track-reverse" : "marquee-track"}>
            {rowCopies.map((copy) => (
              <span className="marquee-copy" key={`${reverse}-${copy}`}>
                {technologies.map((tech) => (
                  <span className="marquee-item" key={`${reverse}-${copy}-${tech}`}>
                    <span>{tech}</span>
                    <i aria-hidden="true">✦</i>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
