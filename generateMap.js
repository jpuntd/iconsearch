const fs = require('fs');
const emojis = require('./emoji.json');
let emojimap = Object.create(null);
let longest_length = 3;
emojis.forEach(emoji => {
    let synonyms = [ emoji.description, 
        ...emoji.tags,
        ...emoji.aliases.map(alias => alias.replace(/_/g,' '))
         ];
    synonyms.forEach(synonym => {
        let existing = emojimap[synonym] || '';
        if (!existing.includes(emoji.emoji)) {
            emojimap[synonym] = existing + emoji.emoji;
        }
        // find out synonym with most emojis
        if (existing.length > longest_length) {
            console.log(synonym, emojimap[synonym]);
            longest_length = existing.length;
        }
    });
});

fs.writeFileSync('emojimap.json', JSON.stringify(emojimap));



