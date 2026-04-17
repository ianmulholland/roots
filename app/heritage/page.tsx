import Link from 'next/link'
import { LINE_COLORS } from '@/lib/family-lines'

// ── Family line definitions ───────────────────────────────────────────────────

const LINES = [
  {
    key: 'smith',
    color: LINE_COLORS.smith,
    name: 'The Smith Line',
    tagline: 'Cape Sable Island · The Mayflower',
    origin: 'England → Plymouth, MA → Nova Scotia',
    era: '1581 – present',
    description:
      'The oldest documented line. Stephen Hopkins survived the 1609 Sea Venture shipwreck — the disaster that inspired Shakespeare\'s The Tempest — before sailing on the Mayflower in 1620. His descendants moved from Cape Cod to Cape Sable Island, Nova Scotia, where they built a fishing community that lasted 250 years. Gladys Mildred Smith brought this heritage to Massachusetts when she married George Walker.',
    highlight: 'Stephen Hopkins is a confirmed ancestor of tens of millions of living Americans.',
    people: [
      { name: 'Stephen Hopkins', id: '41', note: 'Mayflower 1620' },
      { name: 'Archelaus Smith', id: '37', note: 'Cape Sable Island founder' },
      { name: 'Gladys "Millie" Walker', id: '4', note: 'née Smith, b.1925' },
    ],
  },
  {
    key: 'walker',
    color: LINE_COLORS.walker,
    name: 'The Walker Line',
    tagline: 'East Boston, Massachusetts',
    origin: 'East Boston, MA',
    era: 'c.1890 – present',
    description:
      'The most local of the four lines — rooted in the working-class waterfront of East Boston for generations. The Walker name itself is a mystery: George Walker\'s father was born Harold Burton and changed his surname to Walker at some point in the 1920s, for reasons that remain entirely undocumented. George grew up Walker, became a Boston man through and through, and married the Nova Scotia-born Gladys Smith, uniting two very different Atlantic worlds.',
    highlight: 'Why did Harold Burton become Harold Walker? It remains one of the great family mysteries.',
    people: [
      { name: 'Harold Walker', id: '30', note: 'born Harold Burton' },
      { name: 'George Vincent Walker', id: '5', note: 'b. East Boston, 1919' },
      { name: 'Lynn Walker Mulholland', id: '6', note: 'b. Boston, 1956' },
    ],
  },
  {
    key: 'frese',
    color: LINE_COLORS.frese,
    name: 'The Frese Line',
    tagline: 'Waldeck, Germany · Berlin',
    origin: 'Frisian Islands → Waldeck → America',
    era: '1742 – present',
    description:
      'The most deeply documented line, thanks to Chris Mulholland\'s research in German church archives. The Freses were originally Frisian seafarers who fled the catastrophic North Sea floods of 1634 or 1651, when entire islands were swallowed by the sea. They rebuilt in the hills of Waldeck, Germany — Lutheran farmers and eventually pastors. Wilhelm Friederich Frese ministered in Berlin and Dresden through both World Wars. His daughter Iris Margarete crossed the Atlantic to marry Dan Mulholland.',
    highlight: 'Ancestors of the Frese line may have fought on both sides of the American Revolutionary War.',
    people: [
      { name: 'Johann Conrad Freisen', id: '28', note: 'b. Westheim, 1742' },
      { name: 'Wilhelm Friederich Frese', id: '17', note: 'Lutheran pastor, Berlin' },
      { name: 'Iris Margarete Mulholland', id: '1', note: 'née Frese, b. Berlin, 1928' },
    ],
  },
  {
    key: 'mulholland',
    color: LINE_COLORS.mulholland,
    name: 'The Mulholland Line',
    tagline: 'Ireland · Chicago',
    origin: 'Ireland → Chicago, IL → Boston, MA',
    era: 'c.1828 – present',
    description:
      'Bartholomew Mulholland was born in Ireland around 1828 and emigrated to America during or after the Great Famine of 1845–1852 — one of the worst humanitarian disasters of the 19th century. He and Catherine Hanlon built a life in America, eventually raising a family that would reach Chicago and then Boston. Dan Mulholland, born in Chicago in 1935, married Iris Margarete Frese and together they raised five children — including Maxwell, Ian and Ross\'s father.',
    highlight: 'The Famine killed a million people and drove another million to emigrate. Bartholomew was among them.',
    people: [
      { name: 'Bartholomew Mulholland', id: '15', note: 'b. Ireland, c.1828' },
      { name: 'Dan Mulholland', id: '2', note: 'b. Chicago, 1935' },
      { name: 'Maxwell Mulholland', id: '3', note: 'b. Belmont, MA, 1960' },
    ],
  },
]

// ── Remarkable moments ────────────────────────────────────────────────────────

const MOMENTS = [
  {
    year: '1609',
    line: 'smith',
    color: LINE_COLORS.smith,
    title: 'The Sea Venture Wreck',
    body: 'The flagship of the Virginia Company is caught in a hurricane and wrecked on the shores of Bermuda. Stephen Hopkins — future Mayflower passenger and your ancestor — survives. The months stranded on the island inspired Shakespeare\'s The Tempest. Hopkins was court-martialed for attempted mutiny, pardoned, and eventually made it to Jamestown. Eleven years later he would be on the Mayflower.',
  },
  {
    year: '1620',
    line: 'smith',
    color: LINE_COLORS.smith,
    title: 'The Mayflower',
    body: 'Stephen Hopkins, the only Mayflower passenger with prior New World experience, arrives at Plymouth aboard the Mayflower with his wife and children including son Giles. He signs the Mayflower Compact. The following spring he helps negotiate the treaty with Wampanoag chief Massasoit — diplomacy that helps the colony survive. His descendants will carry his name westward to Cape Cod, then north to Nova Scotia, then back to Massachusetts.',
  },
  {
    year: '1634',
    line: 'frese',
    color: LINE_COLORS.frese,
    title: 'The Great North Sea Flood',
    body: 'A catastrophic storm surge inundates the Frisian Islands and the North Sea coast of Germany and Denmark, killing thousands and destroying entire communities. The Frisian ancestors of the Frese line are among those who flee inland, eventually settling in the hills of Waldeck in central Germany. They brought their name — Freisen, later simplified to Frese — with them. It was the first of many upheavals this family line would survive.',
  },
  {
    year: '1755',
    line: 'smith',
    color: LINE_COLORS.smith,
    title: 'The Acadian Expulsion',
    body: 'The British colonial government forcibly expels approximately 10,000 Acadian (French Catholic) settlers from Nova Scotia. To repopulate the territory, Britain offers land grants to New England Protestants. Archelaus Smith — Stephen Hopkins\'s descendant — accepts a grant and sails to Cape Sable Island. His family will live there for 250 years, eventually producing Gladys Mildred Smith, who will leave for Massachusetts in the 20th century.',
  },
  {
    year: '1845',
    line: 'mulholland',
    color: LINE_COLORS.mulholland,
    title: 'The Great Famine',
    body: 'A potato blight devastates Ireland. Over the following seven years, a million people die of starvation and disease, and another million flee the country. Bartholomew Mulholland, born around 1828, is among those who leave — crossing the Atlantic on what contemporaries called "coffin ships," overcrowded emigrant vessels with high mortality rates. He arrives in America, meets and marries Catherine Hanlon (also Irish-born), and begins the American Mulholland chapter.',
  },
  {
    year: '1914',
    line: 'frese',
    color: LINE_COLORS.frese,
    title: 'World War I',
    body: 'Wilhelm Friederich Frese serves on the Western Front as an infantryman. His brothers Fritz (born 1893) and Christian (born 1896) serve alongside him. Fritz is killed at the Battle of Loretto Heights in France, June 1915. Christian returns but dies in 1921 of wounds received in the war. Wilhelm comes home, becomes a Lutheran pastor, and raises two children in the ruins of postwar Germany: Gerhard Karl (1920) and Iris Margarete (1928).',
  },
  {
    year: '1935',
    line: 'frese',
    color: LINE_COLORS.frese,
    title: 'The Nuremberg Laws',
    body: 'The Nazi government passes racial laws requiring all Germans to prove "Aryan" ancestry. Fifteen-year-old Gerhard Karl Frese — Iris Margarete\'s older brother — is compelled to research and document the family\'s genealogy. Working under enormous pressure, he digs through church records in Hesperinghausen and Helmighausen, tracing the family back through centuries. His meticulous work is the reason the Frese family history survives today.',
  },
  {
    year: '1945',
    line: 'frese',
    color: LINE_COLORS.frese,
    title: 'The End of World War II',
    body: 'Iris Margarete Frese, 17 years old, watches Germany surrender. She has grown up in the wreckage of one of history\'s most catastrophic regimes: the bombing of Berlin, the Nazi period, the collapse of everything her parents\' generation had built. She survives. A few years later she meets Dan Mulholland — the Chicago-born grandson of Irish Famine emigrants — and the two of them cross the ocean in the direction Bartholomew Mulholland had crossed it a century before.',
  },
]

// ── Component ─────────────────────────────────────────────────────────────────

export default function HeritagePage() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: 'calc(100vh - 57px)' }}>

      {/* ── Hero ── */}
      <div style={{
        textAlign: 'center',
        padding: 'clamp(48px, 8vw, 96px) 24px clamp(40px, 6vw, 64px)',
        borderBottom: '1px solid var(--border)',
        background: 'linear-gradient(180deg, rgba(201,169,110,0.06) 0%, transparent 100%)',
      }}>
        <p style={{ fontSize: '0.72rem', letterSpacing: '0.22em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '20px', fontWeight: 600 }}>
          Family Heritage
        </p>
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3.6rem)',
          fontWeight: 800, lineHeight: 1.08,
          color: 'var(--fg)', marginBottom: '20px', letterSpacing: '-0.025em',
          maxWidth: '700px', margin: '0 auto 20px',
        }}>
          The Four Lines<br />
          <span style={{ color: 'var(--accent)' }}>That Made You</span>
        </h1>
        <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', color: 'var(--muted)', lineHeight: 1.7, maxWidth: '540px', margin: '0 auto 36px' }}>
          Four families. Four centuries. Four journeys — from the Frisian Islands, the Irish countryside, the Mayflower, and the backstreets of East Boston — all converging in Winthrop, Massachusetts.
        </p>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 'clamp(24px, 5vw, 60px)', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { num: '1581', label: 'Earliest ancestor born' },
            { num: '400+', label: 'Years documented' },
            { num: '4', label: 'Family lines' },
            { num: '4', label: 'Continents crossed' },
          ].map(({ num, label }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: 'var(--accent)', letterSpacing: '-0.03em', lineHeight: 1 }}>
                {num}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '6px', fontWeight: 500 }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Four Family Line Cards ── */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: 'clamp(40px, 6vw, 72px) 24px' }}>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--fg)', marginBottom: '32px', letterSpacing: '-0.01em' }}>
          The Four Lines
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
          gap: '20px',
        }}>
          {LINES.map(line => (
            <div
              key={line.key}
              style={{
                borderRadius: '14px',
                border: `1px solid ${line.color}30`,
                background: `linear-gradient(135deg, ${line.color}0d 0%, var(--surface) 60%)`,
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              {/* Header */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: line.color, flexShrink: 0 }} />
                  <span style={{ fontSize: '0.65rem', letterSpacing: '0.16em', color: line.color, textTransform: 'uppercase', fontWeight: 700 }}>
                    {line.era}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--fg)', margin: '0 0 4px', letterSpacing: '-0.01em' }}>
                  {line.name}
                </h3>
                <p style={{ fontSize: '0.8rem', color: line.color, margin: 0, fontWeight: 500 }}>
                  {line.tagline}
                </p>
              </div>

              {/* Origin */}
              <div style={{ fontSize: '0.75rem', color: 'var(--muted)', letterSpacing: '0.04em' }}>
                {line.origin}
              </div>

              {/* Description */}
              <p style={{ fontSize: '0.875rem', color: 'var(--fg)', lineHeight: 1.7, margin: 0, opacity: 0.85 }}>
                {line.description}
              </p>

              {/* Highlight fact */}
              <div style={{
                borderLeft: `3px solid ${line.color}`,
                paddingLeft: '14px',
                fontSize: '0.82rem',
                color: 'var(--muted)',
                fontStyle: 'italic',
                lineHeight: 1.6,
              }}>
                {line.highlight}
              </div>

              {/* Key people */}
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                <p style={{ fontSize: '0.65rem', letterSpacing: '0.12em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '10px', fontWeight: 600 }}>
                  Key People
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {line.people.map(p => (
                    <Link
                      key={p.id}
                      href={`/people/${p.id}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '0.82rem',
                        color: 'var(--fg)',
                        textDecoration: 'none',
                        padding: '6px 8px',
                        borderRadius: '6px',
                        transition: 'background 0.12s',
                      }}
                    >
                      <div style={{
                        width: 7, height: 7, borderRadius: '50%',
                        background: line.color, flexShrink: 0,
                      }} />
                      <span style={{ fontWeight: 500 }}>{p.name}</span>
                      <span style={{ color: 'var(--muted)', fontSize: '0.75rem', marginLeft: 'auto' }}>{p.note}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── How the lines connect ── */}
      <div style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: 'clamp(40px, 6vw, 64px) 24px',
        background: 'var(--surface)',
      }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.16em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '16px', fontWeight: 600 }}>
            The Convergence
          </p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.9rem)', fontWeight: 800, color: 'var(--fg)', marginBottom: '24px', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            How Four Families Became One
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              {
                step: '1',
                color: LINE_COLORS.smith,
                text: 'Gladys Mildred Smith — born March 1, 1925, on Cape Sable Island, Nova Scotia, descendant of Archelaus Smith and through him of Mayflower passenger Stephen Hopkins — emigrates to Massachusetts.',
              },
              {
                step: '2',
                color: LINE_COLORS.walker,
                text: 'George Vincent Walker — born 1919 in East Boston, son of the mysterious Harold Burton-turned-Walker — meets and marries Gladys. The Smith line and the Walker line become one family.',
              },
              {
                step: '3',
                color: LINE_COLORS.frese,
                text: 'Iris Margarete Frese — born in Berlin in 1928, daughter of a Lutheran pastor whose family has lived in Waldeck since fleeing the North Sea floods of the 17th century — meets Dan Mulholland.',
              },
              {
                step: '4',
                color: LINE_COLORS.mulholland,
                text: 'Dan Mulholland — born in Chicago in 1935, grandson of Irish Famine emigrants — marries Iris Margarete. The Irish-American Mulholland line and the German Frese line become one family.',
              },
              {
                step: '5',
                color: 'var(--accent)',
                text: 'Their son Maxwell Mulholland marries Lynn Walker (George and Gladys\'s daughter) in Massachusetts. All four lines — Smith, Walker, Frese, Mulholland — converge. Ian is born in Winthrop in 1991. Ross in 1996. Both carry all four lines.',
              },
            ].map(({ step, color, text }) => (
              <div key={step} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: color + '25',
                  border: `1.5px solid ${color}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, marginTop: '2px',
                  fontSize: '11px', fontWeight: 700, color: color,
                }}>
                  {step}
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--fg)', lineHeight: 1.7, margin: 0, opacity: 0.88 }}>
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Remarkable moments ── */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(40px, 6vw, 72px) 24px clamp(56px, 8vw, 100px)' }}>
        <p style={{ fontSize: '0.7rem', letterSpacing: '0.16em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 600 }}>
          Through History
        </p>
        <h2 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: 800, color: 'var(--fg)', marginBottom: '40px', letterSpacing: '-0.02em' }}>
          Remarkable Moments
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {MOMENTS.map((m, i) => (
            <div key={m.year} style={{ display: 'flex', gap: '0', position: 'relative' }}>
              {/* Timeline spine */}
              <div style={{ width: '80px', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: 2, height: i === 0 ? 24 : 0, background: 'var(--border)' }} />
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: m.color + '20',
                  border: `2px solid ${m.color}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: m.color }} />
                </div>
                {i < MOMENTS.length - 1 && (
                  <div style={{ width: 2, flex: 1, minHeight: '40px', background: 'var(--border)' }} />
                )}
              </div>

              {/* Content */}
              <div style={{ paddingBottom: i < MOMENTS.length - 1 ? '36px' : '0', paddingTop: '4px', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', fontWeight: 800, color: m.color, letterSpacing: '-0.02em', lineHeight: 1 }}>
                    {m.year}
                  </span>
                  <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--fg)' }}>
                    {m.title}
                  </span>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.75, margin: '0 0 0 0', maxWidth: '640px' }}>
                  {m.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Explore links ── */}
      <div style={{ borderTop: '1px solid var(--border)', padding: '40px 24px', textAlign: 'center', background: 'var(--surface)' }}>
        <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '20px' }}>Explore the family further</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { href: '/timeline', label: '450-Year Timeline' },
            { href: '/origins', label: 'Migration Map' },
            { href: '/tree', label: 'Family Tree' },
            { href: '/people', label: 'All Ancestors' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} style={{
              padding: '10px 22px', borderRadius: '8px',
              border: '1px solid var(--border-strong)',
              background: 'var(--surface-raised)',
              color: 'var(--fg)', fontSize: '0.85rem',
              fontWeight: 500, textDecoration: 'none',
            }}>
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
