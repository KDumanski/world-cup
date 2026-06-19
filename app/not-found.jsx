import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section" style={{ textAlign: 'center' }}>
      <div className="container" style={{ maxWidth: 560 }}>
        <span className="kicker mx-auto">Offside</span>
        <h1 style={{ fontSize: 'var(--fs-2xl)' }}>That page isn’t in play.</h1>
        <p className="lead mx-auto" style={{ marginBottom: 'var(--sp-4)' }}>
          The page you’re looking for doesn’t exist. Let’s get you back to the host cities.
        </p>
        <Link href="/cities/" className="btn btn-primary">Browse host cities</Link>
      </div>
    </section>
  );
}
