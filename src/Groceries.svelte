<script>
    import GroceriesItem from './GroceriesItem.svelte';
    import { db } from './firebase';
    import { collectionData } from 'rxfire/firestore';
    import { startWith } from 'rxjs/operators';

    export let uid;

    let text = '';

    const query = db.collection('tasks').orderBy('created');
    const todos = collectionData(query, 'id').pipe(startWith([]));

    function add() {
        if (!text) return;
        db.collection('tasks').add({ uid, text, complete: false, created: Date.now() });
        text = '';
    }

    function updateStatus(event) {
        const { id, newStatus } = event.detail;
        db.collection('tasks').doc(id).update({ complete: newStatus });
    }

    function removeItem(event) {
        const { id } = event.detail;
        db.collection('tasks').doc(id).delete();
    }
</script>

<style>
    input { display: block }
    .add {
        position: sticky;
        top: 0;
        z-index: 2;
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: 1fr 75px;
        border-bottom: 1px solid #f7f7f7;
        box-shadow: 0 5px 7px -4px #e6e6e6;
        background: #fff;
    }
    .add-input {
        border: none;
        outline: none;
        padding: .8em 1em;
        font-size: 1.2em;
        font-weight: 300;
    }
    ::placeholder {
        color: #909090;
    }
    .add button {
        position: relative;
        height: 100%;
        width: 70px;
        font-size: 25px;
        border: none;
        outline: none;
    }
    .add button:before {
        content: '';
        position: absolute;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #fff;
        left: 10px;
        top: 7px;
        border: 1px solid #dedede;
    }
    .add button:after {
        content: '+';
        position: absolute;
        font-size: 35px;
        color: #b9b9b9;
        top: 8px;
        left: 21px;
    }
</style>

<form on:submit|preventDefault={add} class="add">
    <input bind:value={text} placeholder="Was brauchen wir?" class="add-input" required>
    <button></button>
</form>

<ul>
    {#each $todos as todo}
        <GroceriesItem {...todo} on:remove={removeItem} on:toggle={updateStatus} />
    {/each}
</ul>