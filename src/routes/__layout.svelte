
<script context="module">

    const allDePosts = import.meta.glob(`./de/*.md`)
    let listDe = []
    for (let path in allDePosts) {
        listDe.push(
            allDePosts[path]().then(mod => {
                let metadata = mod.metadata
                path = path.slice(0, -3)
                return {path, metadata}
            })
        )
    }

    const allEnPosts = import.meta.glob(`./en/*.md`)
    let listEn = []
    for (let path in allEnPosts) {
        listEn.push(
            allEnPosts[path]().then(mod => {
                let metadata = mod.metadata
                path = path.slice(0, -3)
                return {path, metadata}
            })
        )
    }

    export const load = async () => {
        const posts = {}
        posts['de'] = await Promise.all(listDe)
        posts['en'] = await Promise.all(listEn)
        return {
            props: {
                posts
            }
        }
    }

</script>



<script>

    import P from '$lib/stores/path'
    import TAGS from '$lib/stores/tags'
    import POSTS from '$lib/stores/posts'

    import Nav from '$lib/Nav.svelte'
    import PostNav from '$lib/PostNav.svelte'
    
    export let posts

    posts.de.sort((a, b) => {
        return (new Date(b.metadata.date) - new Date(a.metadata.date))
    })

    posts.en.sort((a, b) => {
        return (new Date(b.metadata.date) - new Date(a.metadata.date))
    })

    for (let i = 0; i < posts.en.length; i++) {
        TAGS.add(posts.en[i].metadata.tags)
    }

    POSTS.set(posts)

</script>



<svelte:head>
    <link rel="icon" href={$P+"/favicon.png"} />
</svelte:head>  



<Nav />
<!-- <PostNav {posts} /> -->
<PostNav />
<main><slot /></main>



<style>

    :global(body) {
        background: black;
    }

    :global(#svelte) {
        background: #ddd;
        display: grid;
        grid-template-areas: "hd hd" "mn sb";
        grid-auto-columns: 3fr 1fr;
        gap: 1rem;
    }

    main {
        grid-area: mn;
        padding: 0 0 0 1rem;
    }

</style>





