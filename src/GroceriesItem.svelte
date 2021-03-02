<script>
    import { fade, fly } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function remove() {
        dispatch('remove', { id });
    }
    function toggleStatus() {
        let newStatus = !complete;

        dispatch('toggle', {
            id,
            newStatus
        })
    }

    export let id;
    export let text;
    export let complete;
</script>

<style>
    .is-complete {
        text-decoration: line-through;
        color: #79bd7a;
    }
    li {
        display: flex;
        align-items: center;
        padding: .2em 1em;
        font-size: 1.2em;
        border-bottom: 1px solid #f7f7f7;
    }
    span {
        margin: 0 auto 0 .8em;
        font-weight: 300;
    }
    button.check {
        position: relative;
        width: 50px;
        height: 50px;
        border: none;
    }
    button.check:after {
        content: '';
        position: absolute;
        width: 30px;
        height: 30px;
        border: 1px solid #dedede;
        top: 8px;
        left: 8px;
        border-radius: 50%;
    }
    button.check.is-complete-btn:after {
        border: none;
        background: #79bd7a;
    }
    .is-complete-btn:before {
        content: 'L';
        position: absolute;
        font-size: 24px;
        top: 7px;
        left: 17px;
        -webkit-transform: scaleX(-1) rotate(-35deg);
        transform: scaleX(-1) rotate(-35deg);
        z-index: 1;
        color: #fff;
    }
    button.trash {
        height: 50px;
        width: 50px;
        font-size: 20px;
        border: none;
    }
</style>

<li in:fade out:fade>
    {#if complete}
        <button on:click={toggleStatus} class="check is-complete-btn"></button>
        <span class="is-complete">{text}</span>
    {:else}
        <button on:click={toggleStatus} class="check"></button>
        <span>{text}</span>
    {/if}
    <button on:click={remove} class="trash">🗑️</button>
</li>