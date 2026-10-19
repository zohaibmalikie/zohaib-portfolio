"use client";

import { useId, useRef, useState } from "react";
import { ArrowRight, Maximize2, X } from "lucide-react";
import { SanityImage } from "@/components/sanity-image";
import type { SanityImage as SanityImageType } from "@/types/sanity";
import "@/components/article-enhancements.css";

export function ArticleVisual({ image }: { image?: SanityImageType }) {
  const id = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  if (!image?.asset) return null;
  const show = () => { setOpen(true); dialog.current?.showModal(); };
  const close = () => dialog.current?.close();
  return <figure className="article-visual">
    <button type="button" className="article-visual-trigger" onClick={show} ref={trigger} aria-haspopup="dialog" aria-label={`Enlarge image${image.alt ? `: ${image.alt}` : ""}`}>
      <SanityImage image={image} width={1400} height={790} className="article-visual-image" priority sizes="(max-width: 1200px) calc(100vw - 36px), 1100px" />
      <span className="article-visual-zoom"><Maximize2 size={15} aria-hidden="true" /> Enlarge image</span>
    </button>
    {image.caption || image.creditName ? <figcaption>{image.caption ? <span>{image.caption}</span> : null}{image.creditName ? <span className="article-photo-credit">Illustrative photo: {image.creditUrl ? <a href={image.creditUrl} target="_blank" rel="noopener noreferrer">{image.creditName}</a> : image.creditName}{image.licenseUrl ? <> · <a href={image.licenseUrl} target="_blank" rel="noopener noreferrer">License</a></> : null}</span> : null}</figcaption> : null}
    <dialog ref={dialog} className="article-lightbox" aria-labelledby={`${id}-title`} onClose={() => { setOpen(false); trigger.current?.focus(); }} onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
      <div className="article-lightbox-content"><div className="article-lightbox-toolbar"><h2 id={`${id}-title`}>Image detail</h2><button type="button" autoFocus onClick={close} aria-label="Close enlarged image"><X size={20} aria-hidden="true" /></button></div>
        {open ? <SanityImage image={image} width={2200} height={1467} className="article-lightbox-image" sizes="95vw" /> : null}
        {image.alt ? <p>{image.alt}</p> : null}
      </div>
    </dialog>
    <noscript><p className="article-visual-noscript">Enable JavaScript to enlarge this image.</p></noscript>
  </figure>;
}

export function ArticleProcess({ steps }: { steps?: { title: string; description: string }[] }) {
  const id = useId();
  const [selected, setSelected] = useState(0);
  const validSteps = steps?.filter((step) => step.title.trim() && step.description.trim()).slice(0, 5) || [];
  if (!validSteps.length) return null;
  const step = validSteps[selected] || validSteps[0];
  return <section className="article-process" aria-labelledby={`${id}-heading`}><p className="eyebrow">From reading to action</p><h2 id={`${id}-heading`}>A practical path through this guide.</h2><p className="article-process-intro">Select a step to explore what to do and why it matters.</p><div className="article-process-steps" aria-label="Guide steps">{validSteps.map((item, index) => <button key={`${item.title}-${index}`} type="button" aria-pressed={index === selected} aria-controls={`${id}-detail`} onClick={() => setSelected(index)}><span className="article-step-number">{String(index + 1).padStart(2, "0")}</span><span>{item.title}</span><ArrowRight size={16} aria-hidden="true" /></button>)}</div><div className="article-step-detail" id={`${id}-detail`} aria-live="polite" aria-atomic="true"><span className="article-step-kicker">STEP {String(selected + 1).padStart(2, "0")} / {String(validSteps.length).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.description}</p></div><noscript><ol>{validSteps.map((item, index) => <li key={index}><strong>{item.title}</strong><p>{item.description}</p></li>)}</ol></noscript></section>;
}
