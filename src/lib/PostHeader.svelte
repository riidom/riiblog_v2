
<script>
    export let title
    export let date
    export let tags

    import { beforeUpdate } from 'svelte'
    import { convertCookie } from '$lib/util/util'

    import STR from '$lib/util/strings'
    import P from '$lib/stores/path'

    import LangSwitcher from '$lib/LangSwitcher.svelte'
    
    let LANG
    let otherLang
    let otherURL
    beforeUpdate( () => {
        LANG = convertCookie(document.cookie)['lang'] || 'en'

        // for hreflang in <head>
        otherLang = (LANG === 'en') ? 'de' : 'en'
        if (otherLang === 'de') {
            otherURL = window.location.href.replace('/en/', '/de/')
        } else {
            otherURL = window.location.href.replace('/de/', '/en/')
        }
    })

    // date and tags are "optional" (home page doesn't have them)
    if (date && date !== ' ') {
        date = new Date(date)
        date = date.toLocaleDateString()
    }

    
</script>

<svelte:head>
    <link rel="alternate" hreflang={otherLang} href="{otherURL}" />
</svelte:head>


<h1>{title}</h1>

<div class="meta">

    <LangSwitcher />


    <a href={$P+'/'} tabindex="0">
        <img class="svg" src="{$P+'/home-icon.svg'}" alt="Home">
    </a>


    <a href={'https://riidom.eu/blog/feed.xml'}
        rel="external" tabindex="0"
    ><img class="svg" src="{$P+'/rss-icon.svg'}" alt="RSS"></a>


    {#if date}
        <pre class="date">{date}</pre>
    {/if}

    
    {#if tags}
        {#each tags as tag}
            <p class="tag">{tag}</p>
        {/each}
    {/if}


</div>

<hr>



<style>

    .meta {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        row-gap: .5rem;
        column-gap: 1.5rem;
        width: 100%;
    }

    pre {
        color: var(--pre);
    }

    .tag {
        background: var(--tag-bg);
        border: 1px solid var(--tag-border);
        padding: .1rem .25rem .1rem .15rem;
        border-radius: 6px;
        color: var(--tag-text);
    }

    .date, .tag {
        font-size: .8rem;
        margin: 0;
    }

    .svg:hover {
        filter: brightness(1.25);
    }

    hr {
        margin: 1rem 0 2rem;
    }



    @media only screen and (min-width: 40rem) {

        .meta {
            gap: 1rem;
        }

        .date, .tag  {
            font-size: 1rem;
        }

        hr {
           margin: 2rem 0 4rem;
        }

    }
    
</style>