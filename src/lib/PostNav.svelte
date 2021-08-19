
<script context="module">
    export const filterPosts = (posts, filter) => {
        return posts
    }
</script>



<script>
    import { beforeUpdate } from 'svelte'
    import { convertCookie } from '$lib/util/util'

    import P from '$lib/stores/path'
    import TAGS from '$lib/stores/tags'
    import POSTS from '$lib/stores/posts'

    import TagFilterList from '$lib/TagFilterList.svelte'

    let posts
    POSTS.subscribe(val => {posts = val})

    let activePosts = []

    beforeUpdate( () => {
        let LANG = convertCookie(document.cookie)['lang']
        if (!LANG) { LANG = navigator.language.slice(0, 2) }
        if (LANG !== 'de' && LANG !== 'en') {LANG = 'en'}
        activePosts = filterPosts(posts[LANG], null)
    })

</script>



<ul>
    <li class="entry">
        <TagFilterList />
    </li>

    {#each activePosts as post}
    <li class="entry">
        <a class="post" href={`${$P}/${post.path}`}>{post.metadata.title}</a>

        <pre>{new Date(post.metadata.date).toLocaleDateString()}</pre>

        <p class="tags">
            {#each post.metadata.tags as tag}
                <span>#{tag}</span>
            {/each}
        </p>

        <a class="post" href={`${$P}/${post.path}`}>
            <img src={`${$P}/thumbs/${post.metadata.id}-THUMB.jpg`} alt="">
        </a>
    </li>
    {/each}
</ul>



<style>
    ul {
        grid-area: sb;
        background: #0001;
        margin: 0;
        padding: 1rem;
    }
   .entry {
        margin-bottom: 1rem;
        list-style: none;
        width: fit-content;
        padding: 0 1rem .5rem;
        border-bottom: 1px solid #0004;
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
        gap: .5rem;
        margin: 0 0 .5rem;
    }
    .tags span {
        background: #fff4;
        border: 1px solid #0004;
        padding: .2rem .5rem .15rem .25rem;
        border-radius: 6px;
        font-size: .8rem;
    }

</style>