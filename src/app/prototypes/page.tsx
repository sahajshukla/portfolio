import Link from 'next/link';
import Image from 'next/image';

const variants = [
  {
    key: 'atelier',
    name: 'Atelier',
    tagline: 'A concert hall.',
    mood: 'Deep walnut backdrop. Ivory Bricolage Grotesque display, Spectral body, brass accent, deep moss secondary. Faint vertical piano-key hairlines as ambient. A weighty, slightly resistive scroll tuned to feel like grand piano keys.',
    swatches: ['#1A1108', '#F4ECD8', '#C9962F', '#6B8060'],
    bg: '#1A1108',
    fg: '#F4ECD8',
    muted: '#C9BEAD',
    accent: '#C9962F',
    secondary: '#6B8060',
    hairline: 'rgba(244, 236, 216, 0.12)',
    featured: true,
  },
  {
    key: 'ink-bone',
    name: 'Ink & Bone',
    tagline: 'A leather-bound notebook.',
    mood: 'Quiet, considered, mature. Warm near-black with bone-white type and a burnt amber accent. Reads like a private bank brochure or a Patek Philippe catalog.',
    swatches: ['#13110F', '#EDE6D6', '#B8743D'],
    bg: '#13110F',
    fg: '#EDE6D6',
    muted: '#A8A095',
    accent: '#B8743D',
    hairline: 'rgba(237, 230, 214, 0.14)',
    featured: false,
  },
  {
    key: 'bone-espresso',
    name: 'Bone & Espresso',
    tagline: 'A magazine spread.',
    mood: 'Editorial serif on warm paper. Open, confident, classical. Reads like a New Yorker feature but note the family resemblance to patelprem and other cream-serif portfolios.',
    swatches: ['#F2ECDF', '#1A1612', '#8C2E2A'],
    bg: '#F2ECDF',
    fg: '#1A1612',
    muted: '#5E544A',
    accent: '#8C2E2A',
    hairline: 'rgba(26, 22, 18, 0.16)',
    featured: false,
  },
  {
    key: 'onyx-champagne',
    name: 'Onyx & Champagne',
    tagline: 'A watchmaker’s atelier.',
    mood: 'Dark but warm, never cold. Soft onyx with champagne type and a muted gold accent. Reads like A. Lange & Söhne or Audemars Piguet.',
    swatches: ['#0E0E10', '#E8DCC0', '#C9A961'],
    bg: '#0E0E10',
    fg: '#E8DCC0',
    muted: '#A89F88',
    accent: '#C9A961',
    hairline: 'rgba(232, 220, 192, 0.12)',
    featured: false,
  },
] as const;

export default function PrototypesIndex() {
  return (
    <div
      className="prototype-shell min-h-screen w-full"
      style={{
        background: '#0a0a0c',
        color: '#EDE6D6',
        fontFamily: 'var(--font-sans)',
      }}
    >
      {/* Top bar */}
      <header className="px-8 lg:px-16 pt-7 pb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Penrose" width={20} height={20} style={{ opacity: 0.85 }} />
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: 18 }}>Sahaj Shukla</span>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(237,230,214,0.5)' }}>
          Design Studies
        </div>
      </header>

      <div className="h-px mx-8 lg:mx-16" style={{ background: 'rgba(237,230,214,0.12)' }} />

      {/* Title */}
      <section className="px-8 lg:px-16 pt-20 lg:pt-32 pb-16">
        <div className="max-w-[1200px] mx-auto">
          <div
            className="mb-8"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#B8743D' }}
          >
            Three Studies
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 400,
              fontSize: 'clamp(48px, 8vw, 120px)',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              color: '#EDE6D6',
            }}
          >
            On <span style={{ fontStyle: 'italic', color: '#B8743D' }}>premium</span>,
            <br />
            without <span style={{ fontStyle: 'italic' }}>shouting.</span>
          </h1>
          <div className="grid md:grid-cols-12 gap-8 mt-16">
            <div className="md:col-span-6 md:col-start-7">
              <div className="h-px mb-7" style={{ width: 56, background: '#B8743D' }} />
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 17, lineHeight: 1.7, fontWeight: 300, color: 'rgba(237,230,214,0.78)' }}>
                Three explorations of how this portfolio might feel each
                inspired by a different lineage of editorial design. Tech is
                present, but never the subject. Click a study to see the full
                hero, credentials, and work treatment. A floating switcher
                lets you cycle between them.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px mx-8 lg:mx-16" style={{ background: 'rgba(237,230,214,0.12)' }} />

      {/* Featured Atelier hero card */}
      <section className="px-8 lg:px-16 pt-4 pb-10">
        <div className="max-w-[1280px] mx-auto">
          {(() => {
            const v = variants.find((x) => x.featured)!;
            return (
              <Link
                href={`/prototypes/${v.key}`}
                className="block group no-underline"
                style={{ color: 'inherit' }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#B8743D' }}>
                  Recommended Study · Differentiated direction
                </div>
                <div
                  className="mt-5 rounded-sm grid md:grid-cols-12 gap-0 overflow-hidden transition-transform duration-700 group-hover:-translate-y-1"
                  style={{
                    background: v.bg,
                    border: `1px solid ${v.hairline}`,
                  }}
                >
                  {/* Left meta block */}
                  <div className="md:col-span-4 p-10 lg:p-12 flex flex-col justify-between" style={{ borderRight: `1px solid ${v.hairline}` }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.32em', textTransform: 'uppercase', color: v.accent }}>
                        A portfolio in six notes
                      </div>
                      <div className="mt-2" style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.32em', textTransform: 'uppercase', color: v.muted }}>
                        Concert hall study
                      </div>
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.32em', textTransform: 'uppercase', color: v.muted }}>
                        From New Jersey
                      </div>
                    </div>
                  </div>

                  {/* Right hero composition */}
                  <div className="md:col-span-8 p-10 lg:p-14">
                    <div className="flex items-center justify-between mb-12">
                      <div className="flex gap-1.5">
                        {v.swatches.map((s) => (
                          <div key={s} className="w-3 h-3 rounded-full" style={{ background: s, border: `1px solid ${v.hairline}` }} />
                        ))}
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.32em', textTransform: 'uppercase', color: v.muted }}>
                        Atelier · Sonata
                      </div>
                    </div>

                    <div
                      style={{
                        fontFamily: 'var(--font-bricolage), Inter, sans-serif',
                        fontVariationSettings: "'SOFT' 80, 'opsz' 144",
                        fontSize: 'clamp(48px, 6.5vw, 100px)',
                        lineHeight: 0.92,
                        letterSpacing: '-0.035em',
                        fontWeight: 300,
                        color: v.fg,
                      }}
                    >
                      Sahaj
                      <br />
                      <span style={{ color: v.accent, fontWeight: 500 }}>Shukla.</span>
                    </div>

                    <div className="mt-12 max-w-[440px]">
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.32em', textTransform: 'uppercase', color: v.muted }}>
                        On the work
                      </div>
                      <p
                        className="mt-4"
                        style={{
                          fontFamily: 'var(--font-bricolage), Inter, sans-serif',
                          fontVariationSettings: "'SOFT' 80, 'opsz' 144",
                          fontSize: 17,
                          lineHeight: 1.5,
                          fontWeight: 300,
                          color: v.fg,
                          letterSpacing: '-0.005em',
                        }}
                      >
                        A practitioner working at the convergence of{' '}
                        <span style={{ color: v.accent, fontWeight: 500 }}>finance</span>,{' '}
                        <span style={{ color: v.accent, fontWeight: 500 }}>data</span>, and{' '}
                        <span style={{ color: (v as { secondary?: string }).secondary ?? v.accent, fontWeight: 500 }}>intelligent systems</span>.
                      </p>
                    </div>

                    <div className="mt-14 flex items-center gap-6">
                      <div className="flex items-center gap-2.5">
                        {(() => {
                          const sage = (v as { secondary?: string }).secondary ?? v.accent;
                          return <span className="block w-1.5 h-1.5 rounded-full" style={{ background: sage, boxShadow: `0 0 0 4px ${sage}22` }} />;
                        })()}
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.32em', textTransform: 'uppercase', color: v.fg }}>
                          Open to senior roles
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Caption */}
                <div className="mt-8 grid md:grid-cols-12 gap-8">
                  <div className="md:col-span-3">
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(237,230,214,0.4)' }}>
                      Study Nº 01 · Featured
                    </div>
                    <div className="mt-2" style={{ fontFamily: 'var(--font-serif)', fontSize: 32, lineHeight: 1.05, color: '#EDE6D6' }}>
                      {v.name}
                      <span style={{ fontStyle: 'italic', color: 'rgba(237,230,214,0.5)' }}> {v.tagline}</span>
                    </div>
                  </div>
                  <div className="md:col-span-7">
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14.5, lineHeight: 1.7, fontWeight: 300, color: 'rgba(237,230,214,0.72)' }}>
                      {v.mood}
                    </p>
                  </div>
                  <div className="md:col-span-2 flex md:justify-end items-start">
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#B8743D' }}>
                      Open Study →
                    </div>
                  </div>
                </div>
              </Link>
            );
          })()}
        </div>
      </section>

      <div className="px-8 lg:px-16 my-8">
        <div className="h-px" style={{ background: 'rgba(237,230,214,0.12)' }} />
      </div>

      {/* Other three studies */}
      <section className="px-8 lg:px-16 py-12">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-10" style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(237,230,214,0.4)' }}>
            Other Studies (editorial direction)
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {variants.filter((v) => !v.featured).map((v, i) => (
              <Link
                key={v.key}
                href={`/prototypes/${v.key}`}
                className="block group no-underline"
                style={{ color: 'inherit' }}
              >
                {/* Preview card */}
                <div
                  className="aspect-[4/5] rounded-sm p-7 flex flex-col justify-between transition-transform duration-700 group-hover:-translate-y-1"
                  style={{
                    background: v.bg,
                    border: `1px solid ${v.hairline}`,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: v.muted }}>
                      Nº 0{i + 2}
                    </div>
                    <div className="flex gap-1.5">
                      {v.swatches.map((s) => (
                        <div key={s} className="w-3 h-3 rounded-full" style={{ background: s, border: `1px solid ${v.hairline}` }} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="h-px mb-4" style={{ width: 36, background: v.accent }} />
                    <div
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(36px, 3.6vw, 56px)',
                        lineHeight: 1,
                        letterSpacing: '-0.02em',
                        color: v.fg,
                      }}
                    >
                      Sahaj
                      <br />
                      <span style={{ fontStyle: 'italic', color: v.accent }}>Shukla.</span>
                    </div>
                    <div className="mt-4" style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: v.muted, fontWeight: 300 }}>
                      Engineer · Analyst · Builder
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: v.muted }}>
                      Vol. I
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: v.accent }}>
                      View →
                    </div>
                  </div>
                </div>

                {/* Caption */}
                <div className="mt-6">
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(237,230,214,0.4)' }}>
                    Study Nº 0{i + 2}
                  </div>
                  <div
                    className="mt-2"
                    style={{ fontFamily: 'var(--font-serif)', fontSize: 26, lineHeight: 1.1, color: '#EDE6D6' }}
                  >
                    {v.name}
                    <span style={{ fontStyle: 'italic', color: 'rgba(237,230,214,0.5)' }}> {v.tagline}</span>
                  </div>
                  <p className="mt-3 max-w-[360px]" style={{ fontFamily: 'var(--font-sans)', fontSize: 13, lineHeight: 1.6, fontWeight: 300, color: 'rgba(237,230,214,0.6)' }}>
                    {v.mood}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px mx-8 lg:mx-16" style={{ background: 'rgba(237,230,214,0.12)' }} />

      <footer className="px-8 lg:px-16 py-10 flex items-center justify-between">
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(237,230,214,0.4)' }}>
          Crafted in New Jersey
        </div>
        <Link
          href="/"
          className="no-underline"
          style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(237,230,214,0.5)' }}
        >
          ← Back to current site
        </Link>
      </footer>
    </div>
  );
}
