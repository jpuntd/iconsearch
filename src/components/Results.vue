<template>
    <ul class="results">
        <li v-for="(result, index) in results.slice().reverse()" :key="index">
            <span class="word">{{result.word}}</span>
            <span class="icons">{{result.icons}}</span>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'Results',
    props: {
        results: Array
    },
    methods: {
        reverseResults: (results) => results.reverse()
    }

}
</script>

<style scoped>
ul {
    display: flex;
    flex-flow: row wrap;
}
li {
    background: whitesmoke;
    border-radius: 5px;
    display: flex;
    list-style: none;
    flex-direction: column;
    justify-content: space-between;
    margin: 20px;
    opacity: 0.9;
    padding: 10px 20px;
}
li span {
    display: block;
    font-size: 1.5em;
}
span.icons {
    font-size: 3em;
}
</style>
