import type { GlyphName } from '@/components/icons/glyph';

export type HistoryEntry = {
  era: string;
  title: string;
  body: string;
  icon: GlyphName;
};

/**
 * Caibiran's timeline.
 * The settlement, the name, the 1882 move, and the later boundary changes are
 * the provincial account (biliran.gov.ph/municipality). The three barrios that
 * joined Kawayan are Republic Act No. 232 (9 June 1948). Cabucgayan's annexation
 * and return are the same provincial page's Cabucgayan account. Area, barangays,
 * and the 2024 population are the Philippine Statistics Authority figures
 * carried on the municipality's Wikipedia entry. Tomalistis Falls is the
 * provincial tourism note for Barangay Asug.
 */
export const HISTORY: HistoryEntry[] = [
  {
    era: 'The first settlement',
    title: 'A place of ibid',
    icon: 'sailing-rounded',
    body:
      'Caibiran began with immigrants from the Leyte mainland. They settled near the mouth of a river, about four kilometers from where the poblacion stands now. The river held fish, and a lizard the people called ibid.\n\n' +
      'That animal gave the place its name. Caibiran is the place where ibid were many.',
  },
  {
    era: 'Spanish period',
    title: 'A pueblo on the river',
    icon: 'account-balance-rounded',
    body:
      'Caibiran became a pueblo. A limestone church and a watchtower were built there.\n\n' +
      'The river did not stay kind. After heavy rain it overflowed, destroyed the town, and took lives and property with it. The settlement lived under that threat.',
  },
  {
    era: '1882',
    title: 'Captain Maderazo moves the town',
    icon: 'flag-rounded',
    body:
      'In 1882, Captain Bebiano Maderazo led the people to a new site. That settlement became the town. The old site became the barrio of Binongohan — the place where the river had overflowed its bank.\n\n' +
      'From 1883 the town was administered in turn by capitanes, then presidentes, then municipal mayors.',
  },
  {
    era: '1904–1948',
    title: 'Neighbors join, then leave',
    icon: 'map-rounded',
    body:
      'In 1904 Cabucgayan lost its standing as a municipality and was annexed to Caibiran. It was returned to the town of Biliran in 1910.\n\n' +
      'On 9 June 1948, Republic Act No. 232 separated the barrios of Ungale, Tucdao, and Inasuyan from Caibiran — then still in the province of Leyte — and merged them with Kawayan. As Culaba and Cabucgayan were established on their own, further barrios passed to them.',
  },
  {
    era: 'Today',
    title: 'Caibiran, Biliran',
    icon: 'location-city-rounded',
    body:
      'Caibiran is a coastal municipality on Biliran Island, in Eastern Visayas. It covers 83.55 square kilometers and is divided into 17 barangays:\n\n' +
      '• Alegria\n' +
      '• Asug\n' +
      '• Bari-is\n' +
      '• Binohangan\n' +
      '• Cabibihan\n' +
      '• Kawayanon\n' +
      '• Looc\n' +
      '• Manlabang\n' +
      '• Caulangohan (Marevil)\n' +
      '• Maurang\n' +
      '• Palanay (Poblacion)\n' +
      '• Palengke (Poblacion)\n' +
      '• Tomalistis\n' +
      '• Union\n' +
      '• Uson\n' +
      '• Victory (Poblacion)\n' +
      '• Villa Vicenta (Mainit)\n\n' +
      'The 2024 census counted 24,444 residents. Most speak Waray. Tomalistis Falls, in Barangay Asug, drops fresh water onto the shore a short walk from the barangay.',
  },
];
