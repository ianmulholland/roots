// Maps each person ID to their primary family line
export const FAMILY_LINE: Record<string, 'mulholland' | 'frese' | 'walker' | 'smith'> = {
  // Frese / Freisen line (German, Waldeck)
  '1':  'frese',   // Iris Margarete — born Frese, bridges both lines
  '17': 'frese',   // Wilhelm Friederich Frese
  '18': 'frese',   // Louise Marie (Ilse) Frese
  '19': 'frese',   // Gerhard Karl Frese
  '20': 'frese',   // Johann Adolf Christian Frese
  '21': 'frese',   // Johanette Wilhelmina Sänger
  '22': 'frese',   // Johann Friederich Christian Frese
  '23': 'frese',   // Marie Caroline Bartholomai
  '24': 'frese',   // Georg Adolph Frese / Freisen
  '25': 'frese',   // Marie Christiane Leüsmann
  '26': 'frese',   // Johann Wilhelm Freisen
  '27': 'frese',   // Susanne Elisabeth Fiseler
  '28': 'frese',   // Johann Conrad Freisen
  '29': 'frese',   // Anna Margarethe Hölscher

  // Walker line (East Boston, Massachusetts)
  '5':  'walker',  // George Vincent Walker
  '6':  'walker',  // Lynn — born Walker, married Mulholland
  '30': 'walker',  // Harold "Harry" Walker (born Burton)
  '31': 'walker',  // Ida Lewis

  // Smith line (Cape Sable Island, Nova Scotia → Mayflower)
  '4':  'smith',   // Gladys Mildred — born Smith, Cape Sable Island
  '32': 'smith',   // Enos Lock Smith
  '33': 'smith',   // Joshua Smith
  '34': 'smith',   // Bertha Enos
  '35': 'smith',   // Thomas Smith
  '36': 'smith',   // James Smith Sr
  '37': 'smith',   // Archelaus Smith (1734–1821) — Cape Sable founder
  '38': 'smith',   // Samuel Smith — Eastham, Cape Cod
  '39': 'smith',   // Mary Hopkins — daughter of Giles
  '40': 'smith',   // Giles Hopkins — Mayflower passenger's son
  '41': 'smith',   // Stephen Hopkins — Mayflower 1620

  // Mulholland line (Irish-American)
  '2':  'mulholland',  // Dan
  '3':  'mulholland',  // Maxwell
  '7':  'mulholland',  // Ian
  '8':  'mulholland',  // Ross
  '9':  'mulholland',  // Chris
  '10': 'mulholland',  // Anna
  '11': 'mulholland',  // Larrissa
  '12': 'mulholland',  // Abigail
  '13': 'mulholland',  // Daniel Joseph
  '14': 'mulholland',  // Patrick Edward
  '15': 'mulholland',  // Bartholomew
  '16': 'mulholland',  // Catherine Hanlon
}

export const LINE_COLORS = {
  mulholland: '#e07b72', // warm rose — Irish
  frese:      '#6baed6', // steel blue — German
  walker:     '#74c476', // sage green — East Boston
  smith:      '#e6ac4f', // amber — Nova Scotia / Mayflower
  unknown:    '#c9a96e', // gold fallback
} as const

export const LINE_LABELS = {
  mulholland: 'Mulholland',
  frese:      'Frese',
  walker:     'Walker',
  smith:      'Smith',
  unknown:    '',
} as const

export function lineColor(id: string): string {
  const line = FAMILY_LINE[id]
  return line ? LINE_COLORS[line] : LINE_COLORS.unknown
}
