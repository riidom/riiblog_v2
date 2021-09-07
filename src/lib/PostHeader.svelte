
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
    beforeUpdate( () => {
        LANG = convertCookie(document.cookie)['lang'] || 'en'
    })

    // date and tags are "optional" (home page doesn't have them)
    if (date) {
        date = new Date(date)
        date = date.toLocaleDateString()
    }
</script>




<h1>{title}</h1>

<div class="meta">

    {#if date}
        <pre class="date">{date}</pre>
    {/if}

    {#if tags}
        {#each tags as tag}
            <p class="tag">#{tag}</p>
        {/each}
    {/if}

    <LangSwitcher />

    <a href={$P+'/'}>{STR.BtnHome[LANG]}</a>

</div>

<hr>



<style>

    .meta {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: .5rem;
        width: 100%;
    }

    pre {
        color: #000a;
    }

    .tag {
        background: #fff2;
        border: 1px solid #0002;
        padding: .1rem .25rem .1rem .15rem;
        border-radius: 6px;
    }

    .date, .tag {
        font-size: .8rem;
        margin: 0;
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