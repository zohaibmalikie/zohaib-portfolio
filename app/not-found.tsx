import Link from "next/link";

export default function NotFound() {
  return (
    <main className="main">
      <section className="section">
        <div className="container-narrow">
          <p className="eyebrow">404</p>
          <h1>Page not found.</h1>
          <p className="lead">
            The content may have moved, or the draft has not been published yet.
          </p>
          <Link href="/" className="button">
            Back home
          </Link>
        </div>
      </section>
    </main>
  );
}
