const rowCopies = [0, 1];

export function TechMarquee({ technologies }: { technologies: string[] }) {
  return (
    <section className="tech-marquee" aria-label="Technology stack">
      {[false, true].map((reverse) => (
        <div className="marquee-row" key={reverse ? "reverse" : "forward"} aria-hidden={reverse || undefined}>
          <div className={reverse ? "marquee-track marquee-track-reverse" : "marquee-track"}>
            {rowCopies.map((copy) => (
              <span className="marquee-copy" key={`${reverse}-${copy}`} aria-hidden={copy > 0 || undefined}>
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
