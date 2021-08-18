
<script>
    import { beforeUpdate } from 'svelte'
    import { convertCookie } from '$lib/util/util'

    import STR from '$lib/util/strings'
    import P from '$lib/stores/path'

    import LangSwitcher from '$lib/LangSwitcher.svelte'
    
    let LANG
    beforeUpdate( () => {
        LANG = convertCookie(document.cookie)['lang'] || 'en'
    })
</script>



<div id="nav">
    <ul>
        <li><LangSwitcher /></li>
        <li><a href={$P+'/'}>{STR.BtnHome[LANG]}</a></li>
    </ul>
</div>



<style>
    #nav {
        grid-area: hd;
    }
    ul {
        display: flex;
        gap: 20px;
        list-style: none;
        padding-bottom: 1rem;
        margin-bottom: 2rem;
        border-bottom: 1px solid #0004;
    }
    li {
        border: 1px solid #0004;
        border-radius: 20px;
    }
    li:hover {
        background: #0001;
    }
    a {
        display: block;
        padding: .25rem 1rem;
        text-decoration: none;
    }
    a:hover {
        color: #f44a;
    }
    
    
</style>