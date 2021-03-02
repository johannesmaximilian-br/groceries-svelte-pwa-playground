<script>
    import { auth } from './firebase';

    export let displayName;
    export let photoURL;
</script>
<style>
    h1 {
        margin: .8em 0 0 0;
        color: #fff;
        text-transform: uppercase;
        font-size: 8vw;
        line-height: .8;
        font-weight: 100;
    }
    h3 {
        margin: .5em 0;
        font-size: 15px;
        font-weight: normal;
        color: #fff;
    }
    section {
        padding: 1em;
        background: rgb(208,157,135);
        background: linear-gradient(352deg, rgba(208,157,135,1) 23%, rgba(200,246,255,1) 100%);
    }
    .user {
        display: grid;
        grid-auto-flow: column;
        grid-gap: 20px;
        align-items: center;
        flex-direction: column;
        justify-content: flex-start;
    }
    img {
        display: inline-block;
        width: 70px;
        height: 70px;
        border-radius: 50%;
        overflow: hidden;
        border: 3px solid #f7f7f7;
    }
    button {
        padding: 3px 15px 5px;
        font-size: 20px;
        border: 1px solid #fff;
        border-radius: 5px;
        font-weight: 100;
        color: #fff;
    }
</style>
<section>
    <div class="user">
        <img src={photoURL} width="100" alt={displayName} />
        <div>
            <h3>{displayName}</h3>
            <button on:click={() => auth.signOut()} class="button">Logout</button>
        </div>
    </div>
    <h1>Deine<br/>Einkaufsliste</h1>
</section>