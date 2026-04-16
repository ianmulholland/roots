// Maps each person ID to their primary family line
export const FAMILY_LINE: Record<string, 'mulholland' | 'frese' | 'walker'> = {
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

  // Walker line (Boston, Massachusetts)
  '4':  'walker',  // Gladys Mildred Walker
  '5':  'walker',  // George Vincent Walker
  '6':  'walker',  // Lynn — born Walker, married Mulholland

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
  walker:     '#74c476', // sage green — Boston
  unknown:    '#c9a96e', // gold fallback
} as const

export const LINE_LABELS = {
  mulholland: 'Mulholland',
  frese:      'Frese',
  walker:     'Walker',
  unknown:    '',
} as const

export function lineColor(id: string): string {
  const line = FAMILY_LINE[id]
  return line ? LINE_COLORS[line] : LINE_COLORS.unknown
}
