
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
        <p>{date}</p>
    {/if}

    {#if tags}
        {#each tags as tag}
            <p class="tag">#{tag}</p>
        {/each}
    {/if}

    <LangSwitcher />

    <a href={$P+'/'}>{STR.BtnHome[LANG]}</a>

</div>



<style>
    .meta {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
</style>