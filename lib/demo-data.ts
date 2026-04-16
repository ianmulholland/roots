import type { Person, Relationship } from './supabase'

// ─── PEOPLE ──────────────────────────────────────────────────────────────────

export const DEMO_PEOPLE: Person[] = [

  // ── YOUR GENERATION ──────────────────────────────────────────────────────
  {
    id: '7', first_name: 'Ian', last_name: 'Mulholland', birth_year: 1991,
    birth_place: 'Winthrop, Massachusetts, USA', birth_lat: 42.3751, birth_lng: -70.9887,
    death_year: null, death_place: null, photo_url: null, notes: null, created_at: '',
  },
  {
    id: '8', first_name: 'Ross', last_name: 'Mulholland', birth_year: 1996,
    birth_place: 'Winthrop, Massachusetts, USA', birth_lat: 42.3751, birth_lng: -70.9887,
    death_year: null, death_place: null, photo_url: null, notes: null, created_at: '',
  },

  // ── YOUR PARENTS ─────────────────────────────────────────────────────────
  {
    id: '3', first_name: 'Maxwell', last_name: 'Mulholland', birth_year: 1960,
    birth_place: 'Belmont, Massachusetts, USA', birth_lat: 42.3959, birth_lng: -71.1786,
    death_year: null, death_place: null, photo_url: null, notes: null, created_at: '',
  },
  {
    id: '6', first_name: 'Lynn', last_name: 'Mulholland', birth_year: 1956,
    birth_place: 'Boston, Massachusetts, USA', birth_lat: 42.3601, birth_lng: -71.0589,
    death_year: null, death_place: null, photo_url: null, notes: null, created_at: '',
  },

  // ── PATERNAL GRANDPARENTS ─────────────────────────────────────────────────
  {
    id: '2', first_name: 'Dan', last_name: 'Mulholland', birth_year: 1935,
    birth_place: 'Chicago, Illinois, USA', birth_lat: 41.8781, birth_lng: -87.6298,
    death_year: null, death_place: null, photo_url: null, notes: null, created_at: '',
  },
  {
    id: '1', first_name: 'Iris Margarete', last_name: 'Mulholland', birth_year: 1928,
    birth_place: 'Berlin, Germany', birth_lat: 52.5200, birth_lng: 13.4050,
    death_year: null, death_place: null, photo_url: null,
    notes: 'Born in Berlin where her father, Pastor Wilhelm Friederich Frese, was serving as a Lutheran minister. Her family line traces back through the village of Hesperinghausen in Waldeck, Germany — descendants of Frisians who fled catastrophic North Sea floods in the 1600s.',
    created_at: '',
  },

  // ── MATERNAL GRANDPARENTS ─────────────────────────────────────────────────
  {
    id: '5', first_name: 'George Vincent', last_name: 'Walker', birth_year: 1919,
    birth_place: 'Boston, Massachusetts, USA', birth_lat: 42.3601, birth_lng: -71.0589,
    death_year: null, death_place: null, photo_url: null, notes: 'Maternal grandfather.', created_at: '',
  },
  {
    id: '4', first_name: 'Gladys Mildred', last_name: 'Walker', birth_year: 1923,
    birth_place: 'Boston, Massachusetts, USA', birth_lat: 42.3601, birth_lng: -71.0589,
    death_year: null, death_place: null, photo_url: null, notes: 'Maternal grandmother.', created_at: '',
  },

  // ── DAN'S SIBLINGS (Ian's aunts & uncle) ─────────────────────────────────
  {
    id: '9', first_name: 'Chris', last_name: 'Mulholland', birth_year: 1958,
    birth_place: 'USA', birth_lat: null, birth_lng: null,
    death_year: null, death_place: null, photo_url: null,
    notes: 'Ian\'s uncle. Author of "Freses in Waldeck" (2014), the family history document tracing the German Frese line. In 1966, age 8, he won the title of Schützenkinderkönig (Shooting Child King) at the Hesperinghausen biannual marksmen\'s festival — a village tradition dating back centuries.',
    created_at: '',
  },
  {
    id: '10', first_name: 'Anna', last_name: 'Mulholland', birth_year: 1963,
    birth_place: 'USA', birth_lat: null, birth_lng: null,
    death_year: null, death_place: null, photo_url: null, notes: null, created_at: '',
  },
  {
    id: '11', first_name: 'Larrissa', last_name: 'Mulholland', birth_year: 1966,
    birth_place: 'USA', birth_lat: null, birth_lng: null,
    death_year: null, death_place: null, photo_url: null, notes: null, created_at: '',
  },
  {
    id: '12', first_name: 'Abigail', last_name: 'Mulholland', birth_year: 1967,
    birth_place: 'USA', birth_lat: null, birth_lng: null,
    death_year: null, death_place: null, photo_url: null, notes: null, created_at: '',
  },

  // ── MULHOLLAND PATERNAL LINE (Irish-American) ─────────────────────────────
  {
    id: '13', first_name: 'Daniel Joseph', last_name: 'Mulholland', birth_year: null,
    birth_place: 'USA', birth_lat: null, birth_lng: null,
    death_year: null, death_place: null, photo_url: null, notes: 'Dan\'s father. Son of Patrick Edward Mulholland.', created_at: '',
  },
  {
    id: '14', first_name: 'Patrick Edward', last_name: 'Mulholland', birth_year: null,
    birth_place: 'USA', birth_lat: null, birth_lng: null,
    death_year: null, death_place: null, photo_url: null, notes: 'Son of Bartholomew Mulholland and Catherine Hanlon.', created_at: '',
  },
  {
    id: '15', first_name: 'Bartholomew', last_name: 'Mulholland', birth_year: 1828,
    birth_place: 'Ireland (emigrated to USA)', birth_lat: 53.4129, birth_lng: -8.2439,
    death_year: 1880, death_place: 'USA',
    photo_url: null,
    notes: 'Earliest known Mulholland ancestor. Born in Ireland c. 1828, emigrated to the United States. Likely left during or after the Great Famine (1845–1852).',
    created_at: '',
  },
  {
    id: '16', first_name: 'Catherine', last_name: 'Hanlon', birth_year: 1840,
    birth_place: 'Ireland (emigrated to USA)', birth_lat: 53.4129, birth_lng: -8.2439,
    death_year: 1880, death_place: 'USA',
    photo_url: null,
    notes: 'Wife of Bartholomew Mulholland. Born in Ireland c. 1840.',
    created_at: '',
  },

  // ── FRESE LINE — Iris Margarete's direct ancestors ────────────────────────
  {
    id: '17', first_name: 'Wilhelm Friederich', last_name: 'Frese', birth_year: 1887,
    birth_place: 'Hesperinghausen, Waldeck, Germany', birth_lat: 51.4362, birth_lng: 8.8631,
    death_year: 1960, death_place: 'Hesperinghausen, Waldeck, Germany',
    photo_url: null,
    notes: 'Lutheran pastor (Pfarrer) who built a successful career in Berlin and Dresden — where Iris Margarete was born. He retired to his home village of Hesperinghausen and ministered to friends and family there until his death. Served in WWI as an infantryman on the Western Front. His brothers Fritz (1893–1915) and Christian (1896–1921) also served; Fritz was killed at the Battle of Loretto Heights in France, and Christian died in 1921 of wounds received in the war.',
    created_at: '',
  },
  {
    id: '18', first_name: 'Louise Marie', last_name: 'Frese', birth_year: null,
    birth_place: 'Germany', birth_lat: null, birth_lng: null,
    death_year: 1966, death_place: 'Hesperinghausen, Waldeck, Germany',
    photo_url: null,
    notes: 'Known as "Ilse." Wife of Pastor Wilhelm Friederich Frese. After Wilhelm\'s death in 1960, she continued living in the Fresehaus in Hesperinghausen until her own death in 1966, after which the family home was sold.',
    created_at: '',
  },
  {
    id: '19', first_name: 'Gerhard Karl', last_name: 'Frese', birth_year: 1920,
    birth_place: 'Germany', birth_lat: null, birth_lng: null,
    death_year: 2006, death_place: 'Augsburg, Germany',
    photo_url: null,
    notes: 'Son of Pastor Wilhelm, brother of Iris Margarete. As a young man under the Nazi regime, he was compelled to research and document the Frese family genealogy to prove "Germanhood" under the 1935 Nuremberg Laws. His meticulous research preserved centuries of family history that would otherwise have been lost — and forms the basis of the "Freses in Waldeck" document.',
    created_at: '',
  },
  {
    id: '20', first_name: 'Johann Adolf Christian', last_name: 'Frese', birth_year: 1852,
    birth_place: 'Hesperinghausen, Waldeck, Germany', birth_lat: 51.4362, birth_lng: 8.8631,
    death_year: null, death_place: null, photo_url: null,
    notes: 'Born 10 May 1852 in Hesperinghausen. Married Johanette Wilhelmina Sänger on 28 December 1878 — two days after Christmas. They were fourth cousins, sharing the same great-great-great-grandparents Johann Georg and Catherin Louise Römer.',
    created_at: '',
  },
  {
    id: '21', first_name: 'Johanette Wilhelmina', last_name: 'Sänger', birth_year: 1856,
    birth_place: 'Hesperinghausen, Waldeck, Germany', birth_lat: 51.4362, birth_lng: 8.8631,
    death_year: 1949, death_place: 'Germany',
    photo_url: null,
    notes: 'Lived to age 93. Wife of Johann Adolf Christian Frese. Her ancestors had deep roots in Hesperinghausen and southern Waldeck, with ties to the villages of Külte, Ober-Ense, Ober-Werbe, and Berndorf.',
    created_at: '',
  },
  {
    id: '22', first_name: 'Johann Friederich Christian', last_name: 'Frese', birth_year: 1820,
    birth_place: 'Hesperinghausen, Waldeck, Germany', birth_lat: 51.4362, birth_lng: 8.8631,
    death_year: null, death_place: null, photo_url: null,
    notes: 'Born 10 November 1820. Son of Georg Adolph Frese and Marie Christiane Leüsmann.',
    created_at: '',
  },
  {
    id: '23', first_name: 'Marie Caroline', last_name: 'Bartholomai', birth_year: 1819,
    birth_place: 'Hesperinghausen, Waldeck, Germany', birth_lat: 51.4362, birth_lng: 8.8631,
    death_year: 1892, death_place: 'Germany',
    photo_url: null,
    notes: 'Married Johann Friederich Christian Frese on 27 April 1850. Her mother\'s family, the Vogels, were long established in Hesperinghausen, and she may have been distantly related to Robert Wilhelm Eberhard Bunsen (1811–1899), the chemist who invented the Bunsen burner.',
    created_at: '',
  },
  {
    id: '24', first_name: 'Georg Adolph', last_name: 'Frese', birth_year: 1796,
    birth_place: 'Helmighausen, Waldeck, Germany', birth_lat: 51.4130, birth_lng: 8.8470,
    death_year: 1866, death_place: 'Germany',
    photo_url: null,
    notes: 'Born 3 June 1796 in Helmighausen. The first in the family to use the surname "Frese" — previous generations had spelled it "Freisen." Married Marie Christiane Leüsmann on 25 May 1823 in Hesperinghausen.',
    created_at: '',
  },
  {
    id: '25', first_name: 'Marie Christiane', last_name: 'Leüsmann', birth_year: null,
    birth_place: 'Helmighausen, Waldeck, Germany', birth_lat: 51.4130, birth_lng: 8.8470,
    death_year: null, death_place: null, photo_url: null,
    notes: 'Wife of Georg Adolph Frese. Her extended family had lived in Helmighausen for several generations, with records going back at least to 1600.',
    created_at: '',
  },
  {
    id: '26', first_name: 'Johann Wilhelm', last_name: 'Freisen', birth_year: 1767,
    birth_place: 'Westheim, Sauerland, Germany', birth_lat: 51.4972, birth_lng: 9.1267,
    death_year: 1814, death_place: 'Billinghausen, Germany',
    photo_url: null,
    notes: 'Born 30 September 1767 in Westheim. Married Susanne Elisabeth Fiseler on 18 November 1791. After Susanne\'s death in 1801, moved to Billinghausen on the south bank of the Diemel river, where he died in 1814.',
    created_at: '',
  },
  {
    id: '27', first_name: 'Susanne Elisabeth', last_name: 'Fiseler', birth_year: 1770,
    birth_place: 'Hesperinghausen, Waldeck, Germany', birth_lat: 51.4362, birth_lng: 8.8631,
    death_year: 1801, death_place: 'Germany',
    photo_url: null,
    notes: 'Born in Hesperinghausen. Married Johann Wilhelm Freisen in 1791. Died young in 1801. Her maternal relatives, the Römers, may have included two cousins (Christoph and Friederich Römer) who sailed to America in 1776 as soldiers in the 3rd Waldeck Regiment during the American Revolutionary War — potentially fighting on the opposite side from other Mulholland ancestors.',
    created_at: '',
  },
  {
    id: '28', first_name: 'Johann Conrad', last_name: 'Freisen', birth_year: 1742,
    birth_place: 'Westheim, Sauerland, Germany', birth_lat: 51.4972, birth_lng: 9.1267,
    death_year: 1804, death_place: 'Westheim, Germany',
    photo_url: null,
    notes: 'Born in Westheim c. 1742. The earliest fully documented ancestor in the Frese line. His father Heinrich Freisen (born c. 1700–1720) was likely among the first generation of Freses born in Sauerland after the family\'s dramatic flight from the North Sea coast following the catastrophic floods of 1634 or 1651.',
    created_at: '',
  },
  {
    id: '29', first_name: 'Anna Margarethe', last_name: 'Hölscher', birth_year: null,
    birth_place: 'Westheim, Sauerland, Germany', birth_lat: 51.4972, birth_lng: 9.1267,
    death_year: null, death_place: null, photo_url: null,
    notes: 'Married Johann Conrad Freisen on 3 May 1767 in Westheim.',
    created_at: '',
  },
]

// ─── RELATIONSHIPS ────────────────────────────────────────────────────────────

export const DEMO_RELATIONSHIPS: Relationship[] = [

  // Your generation
  { id: 'r-ian-mom',   person1_id: '6', person2_id: '7', relationship_type: 'parent-child' },
  { id: 'r-ian-dad',   person1_id: '3', person2_id: '7', relationship_type: 'parent-child' },
  { id: 'r-ross-mom',  person1_id: '6', person2_id: '8', relationship_type: 'parent-child' },
  { id: 'r-ross-dad',  person1_id: '3', person2_id: '8', relationship_type: 'parent-child' },

  // Your parents' marriage
  { id: 'r-max-lynn',  person1_id: '3', person2_id: '6', relationship_type: 'spouse' },

  // Paternal grandparents
  { id: 'r-iris-dan',  person1_id: '1', person2_id: '2', relationship_type: 'spouse' },
  { id: 'r-dan-max',   person1_id: '2', person2_id: '3', relationship_type: 'parent-child' },
  { id: 'r-iris-max',  person1_id: '1', person2_id: '3', relationship_type: 'parent-child' },

  // Dan & Iris's other children
  { id: 'r-dan-chris',    person1_id: '2', person2_id: '9',  relationship_type: 'parent-child' },
  { id: 'r-iris-chris',   person1_id: '1', person2_id: '9',  relationship_type: 'parent-child' },
  { id: 'r-dan-anna',     person1_id: '2', person2_id: '10', relationship_type: 'parent-child' },
  { id: 'r-iris-anna',    person1_id: '1', person2_id: '10', relationship_type: 'parent-child' },
  { id: 'r-dan-larrissa', person1_id: '2', person2_id: '11', relationship_type: 'parent-child' },
  { id: 'r-iris-larr',    person1_id: '1', person2_id: '11', relationship_type: 'parent-child' },
  { id: 'r-dan-abigail',  person1_id: '2', person2_id: '12', relationship_type: 'parent-child' },
  { id: 'r-iris-abig',    person1_id: '1', person2_id: '12', relationship_type: 'parent-child' },

  // Maternal grandparents
  { id: 'r-geo-gladys',  person1_id: '5', person2_id: '4', relationship_type: 'spouse' },
  { id: 'r-geo-lynn',    person1_id: '5', person2_id: '6', relationship_type: 'parent-child' },
  { id: 'r-gladys-lynn', person1_id: '4', person2_id: '6', relationship_type: 'parent-child' },

  // Mulholland Irish line
  { id: 'r-barth-cath',   person1_id: '15', person2_id: '16', relationship_type: 'spouse' },
  { id: 'r-barth-pat',    person1_id: '15', person2_id: '14', relationship_type: 'parent-child' },
  { id: 'r-cath-pat',     person1_id: '16', person2_id: '14', relationship_type: 'parent-child' },
  { id: 'r-pat-danjoe',   person1_id: '14', person2_id: '13', relationship_type: 'parent-child' },
  { id: 'r-danjoe-dan',   person1_id: '13', person2_id: '2',  relationship_type: 'parent-child' },

  // Frese line — Iris's parents
  { id: 'r-wilh-ilse',    person1_id: '17', person2_id: '18', relationship_type: 'spouse' },
  { id: 'r-wilh-iris',    person1_id: '17', person2_id: '1',  relationship_type: 'parent-child' },
  { id: 'r-ilse-iris',    person1_id: '18', person2_id: '1',  relationship_type: 'parent-child' },
  { id: 'r-wilh-gerd',    person1_id: '17', person2_id: '19', relationship_type: 'parent-child' },
  { id: 'r-ilse-gerd',    person1_id: '18', person2_id: '19', relationship_type: 'parent-child' },

  // Frese line — Wilhelm's parents
  { id: 'r-johnadolf-wil',  person1_id: '20', person2_id: '17', relationship_type: 'parent-child' },
  { id: 'r-sanger-wil',     person1_id: '21', person2_id: '17', relationship_type: 'parent-child' },
  { id: 'r-johnadolf-sang', person1_id: '20', person2_id: '21', relationship_type: 'spouse' },

  // Frese line — Johann Adolf's parents
  { id: 'r-jfc-jadolf',   person1_id: '22', person2_id: '20', relationship_type: 'parent-child' },
  { id: 'r-barth2-jadolf',person1_id: '23', person2_id: '20', relationship_type: 'parent-child' },
  { id: 'r-jfc-barth2',   person1_id: '22', person2_id: '23', relationship_type: 'spouse' },

  // Frese line — Johann Friederich's parents
  { id: 'r-georg-jfc',    person1_id: '24', person2_id: '22', relationship_type: 'parent-child' },
  { id: 'r-leusm-jfc',    person1_id: '25', person2_id: '22', relationship_type: 'parent-child' },
  { id: 'r-georg-leusm',  person1_id: '24', person2_id: '25', relationship_type: 'spouse' },

  // Frese line — Georg's parents
  { id: 'r-jwilh-georg',  person1_id: '26', person2_id: '24', relationship_type: 'parent-child' },
  { id: 'r-sus-georg',    person1_id: '27', person2_id: '24', relationship_type: 'parent-child' },
  { id: 'r-jwilh-sus',    person1_id: '26', person2_id: '27', relationship_type: 'spouse' },

  // Frese line — Johann Wilhelm's parents
  { id: 'r-jcon-jwilh',   person1_id: '28', person2_id: '26', relationship_type: 'parent-child' },
  { id: 'r-holsch-jwilh', person1_id: '29', person2_id: '26', relationship_type: 'parent-child' },
  { id: 'r-jcon-holsch',  person1_id: '28', person2_id: '29', relationship_type: 'spouse' },
]
