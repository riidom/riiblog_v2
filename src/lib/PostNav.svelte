
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
    let hideMenu = true

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
            <a class="post" href={`${$P}/${post.path}`}>
                {post.metadata.title}
            </a>
            
            <pre>{new Date(post.metadata.date).toLocaleDateString()}</pre>

            <p class="tags">
                {#each post.metadata.tags as tag}
                    <span>#{tag}</span>
                {/each}
            </p>
        {/if}

        <a class="post" href={`${$P}/${post.path}`}>
            <img src={`${$P}/thumbs/${post.metadata.id}-THUMB.jpg`} alt="">
        </a>

    </li>
    {:else}
    <p class="unavailable">{post.metadata.title}</p>
    {/if}
    {/each}

</ul>

<button class="hamburger" on:click={toggleOnMobile}>
    &equiv;
</button>

<div class="background" class:hideMenu></div>



<style>

    .background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: #ddd;
        z-index: 0;
    }

    ul {
        background: #ddd;
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
        border-bottom: 1px solid #0004;
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
        color: #000a;
        font-size: 0.75rem;
    }

    .tags {
        display: flex;
        gap: .25rem;
        margin: 0 0 .5rem;
    }

    .tags span {
        background: #fff2;
        border: 1px solid #0002;
        padding: .1rem .25rem .1rem .15rem;
        border-radius: 6px;
        font-size: .8rem;
    }

    img {
        max-width: 100%;
    }

    .unavailable {
        font-style: italic;
        color: #0008;
        text-align: left;
        margin: .25rem 0;
        font-size: .8rem;
    }

    .hamburger {
        position: fixed;
        top: 1rem;
        right: 1rem;
        z-index: 1;
    }

    .hideMenu {
        display: none;
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