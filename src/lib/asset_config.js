export const categories = [
  'poses',
  'ears',
  'eyebrows',
  'eyes',
  'accessories',
  'hats',
];

// The nested arrays under categories is used to group mutually exclusive
// items.
export const decorations = {
  'poses': [
    'Hands downArtboard 1@2x',
    'Both CenterArtboard 1@2x',
    'Hands upArtboard 1@2x',
    'RIght WaveArtboard 1@2x',
  ],
  'ears': [
    'ears_default',
    'ears_in',
    'ears_out',
  ],
  'eyebrows': [
    'eyebrows_default',
    'eyebrows_angry',
    'eyebrows_distraught',
  ],
  'eyes': [
    'eyes_default',
    'eyes_down',
    'eyes_left',
    'eyes_left diagonal down',
    'eyes_left diagonal up',
    'eyes_right',
    'eyes_right diagonal down',
    'eyes_right diagonal up',
    'eyes_up',
  ],
  'accessories': [
    'empty',
    [
      'Right BalloonArtboard 1@2x',
      'Right CoffeeArtboard 1@2x',
      'Right MicrophoneArtboard 1@2x',
    ],
    'MouthArtboard 1@2x',
    [
      'Tux bodyArtboard 1@2x',
      'Shirt_no arms',
    ],
    [
      'BowtieAmpBlueArtboard 1@2x',
      'BowtieMintArtboard 1@2x',
      'BowtiePinkArtboard 1@2x',
      'BowtiePurpleArtboard 1@2x',
      'BowtieYellowArtboard 1@2x',
    ],
  ],
  'hats': [
    'empty',
    'Party HatArtboard 1@2x',
    'Ballcap GiantsArtboard 1@2x',
    'CrownArtboard 1@2x',
    'FezArtboard 1@2x',
    'HeadphonesArtboard 1@2x',
  ],
}

// Loop through decorations and make an object that can be used to easily
// get the multi select indexes of ones siblings
export const mutuallyExclusiveDecorations = Object.values(decorations)
.map((decorations) => {
  return decorations.flat().map((filename) => {

    // If this decoration is an array, meaning it's a list of mutually
    // exclusive choices, then return just the siblings (not oneself)
    // console.log('decoration', decoration)
    for (const decoration of decorations) {
      if (Array.isArray(decoration) && decoration.includes(filename)) {
        return decoration.reduce((siblingIndexes, sibling) => {
          if (sibling === filename) return siblingIndexes
          return [
            ...siblingIndexes,
            decorations.flat().findIndex(test => sibling === test),
          ]
        }, [])
      }
    }

    // Flat filename not found nested in a mutually exlcusive array so no
    // siblings need to be disabled when it's activated
    return [];
  })
}, [])
