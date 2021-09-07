
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
        border: 1px solid black;
        border-radius: 6px;
        outline: none;
        cursor: pointer;
        margin: 0;
        padding: .125rem .25rem;
        background: #eee;
        font-size: .8rem;
    }

    button:hover, button:focus {
        border-color: #333;
        background: #fff;
    }



    @media only screen and (min-width: 46rem) {

        button {
            font-size: 1rem;
            padding: .25rem .5rem;
        }

    }
</style>