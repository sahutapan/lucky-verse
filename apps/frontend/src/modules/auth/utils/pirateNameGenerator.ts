const PIRATE_ADJECTIVES = [
    'Captain', 'Admiral', 'Dread', 'Black', 'Red', 'Iron', 'Steel',
    'Golden', 'Silver', 'Cursed', 'Mad', 'Wild', 'Swift', 'Mighty',
    'Fearless', 'Ruthless', 'Cunning', 'Savage', 'Stormy', 'Thunder',
    'Crimson', 'Shadow', 'Ghost', 'Demon', 'Rogue', 'Scurvy', 'Salty',
    'Bloody', 'Lucky', 'Brave', 'Bold', 'Wicked', 'Dark', 'Grim'
];

const PIRATE_NOUNS = [
    'Sparrow', 'Beard', 'Hook', 'Bones', 'Skull', 'Anchor', 'Kraken',
    'SeaDog', 'Buccaneer', 'Corsair', 'Cutlass', 'Cannon', 'Plunderer',
    'Raider', 'Marauder', 'Scallywag', 'Treasure', 'Galleon', 'Saber',
    'Parrot', 'Shark', 'Wave', 'Storm', 'Tide', 'Voyage', 'Quest',
    'Hunter', 'Finder', 'Seeker', 'Wanderer', 'Sailor', 'Navigator',
    'Raven', 'Crow', 'Jack', 'Jones', 'Morgan', 'Drake', 'Silver'
];

export function generatePirateName(): string {
    const adjective = PIRATE_ADJECTIVES[
        Math.floor(Math.random() * PIRATE_ADJECTIVES.length)
    ];
    const noun = PIRATE_NOUNS[
        Math.floor(Math.random() * PIRATE_NOUNS.length)
    ];
    const number = Math.floor(Math.random() * 1000);

    return `${adjective}${noun}${number}`;
}
