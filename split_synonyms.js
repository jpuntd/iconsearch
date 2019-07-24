const answer = {"response":[
    {"list":{"category":"(noun)","synonyms":"facial gesture|gesture (generic term)|motion (generic term)"}},
    {"list":{"category":"(noun)","synonyms":"expression|look|aspect|face|countenance (generic term)|visage (generic term)"}}
    ]
  }
    
const show = x => console.log(JSON.stringify(x));

const split_synonyms = answer =>
     answer.response
    .map(list => list.list.synonyms)
    .join('|')   //join all lists using the pipe that separates every synonym
    .split('|') 
    .map(synonym => synonym.replace(/ \(.+?\)/, ''));


show(split_synonyms(answer));
