<script>
    import Profile from './Profile.svelte';
    import Groceries from './Groceries.svelte';
    import Footer from './Footer.svelte';

    import { auth, googleProvider } from './firebase';
    import { authState } from 'rxfire/auth';

    let user;
    authState(auth).subscribe(u => user = u);

    function login() {
        auth.signInWithPopup(googleProvider);
    }
</script>

<style>
    .login {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: grid;
        align-items: center;
        justify-items: center;
        background: rgb(208,157,135);
        background: linear-gradient(352deg, rgba(208,157,135,1) 23%, rgba(200,246,255,1) 100%);
    }
    button {
        font-size: 20px;
        border: 2px solid #fff;
        outline: none;
        padding: 20px 40px;
        color: #fff;
        font-weight: 300;
        border-radius: 7px;
    }
</style>

{#if user}
    <Profile {...user} />
    <Groceries uid={user.uid} />
    <Footer />
{:else}
    <div class="login">
        <img src="/images/web-groceries-logo.png" width="200" alt="Web Groceries Logo"/>
        <button on:click={login}>
            Login mit Google
        </button>
    </div>
{/if}