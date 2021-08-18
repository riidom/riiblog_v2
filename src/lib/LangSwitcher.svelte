
<script>
    import { onMount } from 'svelte'
    import { convertCookie } from '$lib/util/util'
    import { page } from '$app/stores'

    import STR from '$lib/util/strings'
    import P from '$lib/stores/path'

    let LANG
    let slug = $page.path.split('/').slice(-1)[0]
    if (slug === 'de' || slug === 'en') {slug = ''} //home page fix

    onMount( () => {
        LANG = convertCookie(document.cookie)['lang']
        if (!LANG) {
            LANG = navigator.language.slice(0, 2)
            document.cookie = 'lang=' + LANG + '; path=/'
        }
    })

    function toggle() {
        LANG === 'en' ? LANG = 'de' : LANG = 'en'
        document.cookie = 'lang=' + LANG + '; path=/'
        if (slug === ''){
            window.location.pathname = `${$P}`
        } else {
            window.location.pathname =`${$P}/${LANG}/${slug}`
        }
    }

</script>



<button on:click={toggle}>{STR.BtnLangToggle[LANG]}</button>



<style>
    button {
        display: inline;
        border: none;
        outline: none;
        cursor: pointer;
        margin: 0;
        padding: .25rem 1rem;
        background: none;
    }
</style>