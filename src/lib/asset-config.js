// The nested arrays under categories is used to group mutually exclusive
// items
export const decorations = {
  'hair': [
    'empty',
    ['Moustache_Hero Artboard1x'],
    ['MulletHero Artboard1x'],
  ],
  'hats': [
    'empty',
    'PartyHat1_Hero Artboard1x',
    'BallCap_Hero Artboard1x',
    'ChefsHat_Hero Artboard1x',
    'Cowboy Hat_Hero Artboard1x',
    'FlowerCrown_Hero Artboard1x',
    'Headphones_Hero Artboard1x',
  ],
  'tops': [
    'empty',
    'Shirt1Hero Artboard1x',
    'TigerShirt_Hero Artboard1x',
  ],
  'bottoms': [
    'empty',
    'Jeans1_Hero Artboard1x',
    'Jeans2_Hero Artboard1x',
  ],
  'onesies': [
    'empty',
    'DragonOnesieHero Artboard1x',
    'UnicornOnesie_Hero Artboard1x',
    'UntitledGooseHero Artboard1x',
  ],
  'accessories': [
    'empty',
    'Apron_Hero Artboard1x',
    '3DGlasses_Hero Artboard1x',
    [
      'Balloons_Hero Artboard1x',
      'Boba_Hero Artboard1x',
      'Chocolate_Hero Artboard1x',
      'CoffeCup_Hero Artboard1x',
      'CoffeeMug_Hero Artboard1x',
      'Cola_Hero Artboard1x',
      'DOUGHNUT_Hero Artboard1x',
      'Flamingo FLoatieHero Artboard1x',
      'Microphone_Hero Artboard1x',
      'Popcorn_Hero Artboard1x',
      'Record_Hero Artboard1x',
      'Stroopwafel_Hero Artboard1x',
    ],
    [
      'Laptop_Hero Artboard1x',
      'StuffedTiger_Hero Artboard1x',
    ],
    'Insight_Hero Artboard1x',
  ],

}

// Decorations keys are ordered category names
export const categories = Object.keys(decorations)

// Loop through decorations and make an object that can be used to easily
// get the multi select indexes of ones siblings
export const mutuallyExclusiveDecorations = Object.values(decorations)
.map((decorations) => {
  return decorations.flat().map((filename) => {

    // If this decoration is an array, meaning it's a list of mutually
    // exclusive choices, then return just the siblings (not oneself)
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
