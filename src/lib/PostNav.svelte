
<script context="module">
    export const filterPosts = (posts, filter) => {
        return posts
    }
</script>



<script>
    import { beforeUpdate } from 'svelte'
    import { convertCookie } from '$lib/util/util'

    import P from '$lib/stores/path'
    import POSTS from '$lib/stores/posts'
    import { FILTER } from '$lib/stores/filter'

    import TagFilterList from '$lib/TagFilterList.svelte'

    let posts
    let activePosts = []
    $: hideMenu = true

    POSTS.subscribe(val => {posts = val})



    beforeUpdate( () => {
        let LANG = convertCookie(document.cookie)['lang']
        if (!LANG) { LANG = navigator.language.slice(0, 2) }
        if (LANG !== 'de' && LANG !== 'en') { LANG = 'en' }
        activePosts = posts[LANG]
    })

    const updatePostList = e => {
        const filters = FILTER.get()

        for (let p of activePosts) {
            p.metadata.visible = true

            loop:
            for (let f in filters) {
                let fv = filters[f]
                let postHasTag = p.metadata.tags.includes(f)

                if (fv === 1 && !postHasTag) {
                    p.metadata.visible = false
                    break loop
                }
                if (fv === -1 && postHasTag) {
                    p.metadata.visible = false
                    break loop
                }
            }
        }
        activePosts = activePosts
    }

    const toggleOnMobile = () => hideMenu = !hideMenu
</script>



<ul class:hideMenu>

    <li class="entry taglist">
        <TagFilterList on:filterChanged={updatePostList}/>
    </li>

    {#each activePosts as post}
    {#if post.metadata.visible}
    <li class="entry">

        {#if !post.metadata.tags.includes('meta')}
            <a class="post" href={`${$P}/${post.path}`} on:click={toggleOnMobile}>
                {post.metadata.title}
            </a>
            
            <pre>{new Date(post.metadata.date).toLocaleDateString()}</pre>

            <p class="tags">
                {#each post.metadata.tags as tag}
                    <span>#{tag}</span>
                {/each}
            </p>
        {/if}

        <a class="post" href={`${$P}/${post.path}`} on:click={toggleOnMobile}>
            <img src={`${$P}/thumbs/${post.metadata.id}-THUMB.jpg`} alt="">
        </a>

    </li>
    {:else}
    <p class="unavailable">{post.metadata.title}</p>
    {/if}
    {/each}

</ul>

<button class="hamburger" on:click={toggleOnMobile}>
    <div></div><div></div><div></div>
</button>

<div class="background" class:hideMenu></div>



<style>

    .background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: var(--bg);
        z-index: 0;
    }

    ul {
        background: var(--bg);
        max-width: min(23rem, 100%);
        margin: 0;
        padding: .5rem;
        overflow: auto;
        direction: rtl;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 1;
    }

   .entry {
        margin-bottom: 1rem;
        list-style: none;
        padding: 0 1rem .5rem;
        border-bottom: 1px solid var(--hr);
        direction: ltr;
    }

    .entry.taglist {
        padding: 1rem 0;
    }

    .post {
        display: block;
        margin-bottom: .25rem;
    }

    pre {
        margin: 0 0 .25rem;
        color: var(--pre);
        font-size: 0.75rem;
    }

    .tags {
        display: flex;
        gap: .25rem;
        margin: 0 0 .5rem;
    }

    .tags span {
        background: var(--tag-bg);
        border: 1px solid var(--tag-border);
        padding: .1rem .25rem .1rem .15rem;
        border-radius: 6px;
        font-size: .8rem;
        color: var(--tag-text);
    }

    img {
        max-width: 100%;
        border-radius: 1rem;
    }

    img:hover {
        filter: brightness(125%) drop-shadow(0 0 4px var(--img-hover));
    }

    .unavailable {
        font-style: italic;
        color: var(--unavailable);
        text-align: left;
        margin: .25rem 0;
        font-size: .8rem;
    }

    .hamburger {
        position: fixed;
        top: 1rem;
        right: 1rem;
        z-index: 1;
        padding: .25rem .75rem;
        background-color: var(--btt-bg);
        border: 1px solid var(--btt-border);
        border-radius: 6px;
        box-shadow: 0 0 5px 3px var(--bg);
    }

    .hamburger div {
        width: 2rem;
        height: .25rem;
        background: var(--text);
        margin: .5rem 0;
        border-radius: .15rem;
    }

    .hamburger:hover,
    .hamburger:focus {
        border-color: var(--btt-hover-border);
        box-shadow: 0 0 5px 3px var(--btt-hover-bg);
    }

    .hamburger:hover div,
    .hamburger:focus div {
        background-color: var(--a);
    }

    .hideMenu {
        display: none;
    }

    ::-webkit-scrollbar {
        width: .5rem;
    }

    ::-webkit-scrollbar-track {
        background: linear-gradient(0deg, 
            #6444 0%,
            #644 10%,
            #644 90%,
            #6444 100%
        );
        border-radius: .25rem;
    }

    ::-webkit-scrollbar-thumb {
        background: linear-gradient(0deg, 
            #a99a 0%,
            #a994 10%,
            #a994 90%,
            #a99a 100%
        );
        border-radius: .25rem;
    }

    @media only screen and (min-width: 40rem) {

        .background {
            display: none;
        }

        ul {
            position: static;
            grid-area: sb;
            overflow-y: scroll;
        }

        .hamburger {
            display: none;
        }

        ul.hideMenu {
            display: block;
        }
    }

    

</style>