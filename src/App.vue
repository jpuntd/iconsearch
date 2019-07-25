<template>
  <div id="app">
    <Query @submitquery="search"></Query>
    <Results :results="results"></Results>
    <aside>
      Background image by Sebastian Herrmann on Unsplash. Synonym lookup provided by
      <a href="thesaurus.altervista.org">thesaurus.altervista.org</a>
    </aside>
  </div>
</template>

<script>
import Query from "./components/Query.vue";
import Results from "./components/Results.vue";
import emojimap from "../emojimap.json";
import axios from "axios";

import { key } from "../env";
const url = "https://thesaurus.altervista.org/thesaurus/v1";

/* parameters:
key	  	  String that uniquely identifies your application. 
word	    (urlencoded string)
language	cs_CZ, da_DK, de_CH, de_DE, en_US, el_GR, es_ES, fr_FR, hu_HU, it_IT, no_NO, pl_PL, pt_PT, ro_RO, ru_RU, sk_SK
output	  xml or json
callback	javascript callback function (requires output=json)
*/

const split_synonyms = answer =>
  answer.response
    .map(list => list.list.synonyms)
    .join("|") //join all lists using the pipe that separates every synonym
    .split("|")
    .map(synonym => synonym.replace(/ \(.+?\)/, ""));

export default {
  name: "app",
  components: {
    Query,
    Results
  },
  methods: {
    search: function(word) {
      // TODO: use active to display new items bigger
      if (word) {
        this.results.push({
          word,
          icons: emojimap[word] || "�",
          active: true
        });
        axios(url, {
          params: {
            key,
            language: "en_US",
            output: "json",
            word: encodeURI(word)
          }
        })
          .then(res => {
            split_synonyms(res.data).forEach(synonym => {
              let icons = emojimap[synonym];
              if (icons && !this.results.some(r => r.word === synonym)) {
                this.results.push({
                  word: synonym,
                  icons,
                  active: true
                });
              }
            });
          })
          .catch(error => console.warn(error));
      }
    }
  },
  data: function() {
    return {
      results: []
    };
  }
};
</script>

<style>
body {
  background: url("./assets/bg_icons.jpg") no-repeat 50% 50% fixed;
  background-size: cover;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  margin-top: 60px;
  text-align: center;
}
aside {
  background: whitesmoke;
  bottom: 0;
  height: 20px;
  opacity: 0.5;
  padding: 5px;
  position: fixed;
  right: 0;
  width: 100%;
  z-index: -1;
}
aside a {
  color: inherit;
}
html {
    height: 100vh; /* set viewport constraint */
    min-height: 100%; /* enforce height */
}
</style>
