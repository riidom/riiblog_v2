
<script context="module">

    const allDePosts = import.meta.glob(`./de/*.md`)
    let listDe = []
    for (let path in allDePosts) {
        listDe.push(
            allDePosts[path]().then(mod => {
                let metadata = mod.metadata
                metadata.visible = true
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
                metadata.visible = true
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

    for (let l of ['en', 'de']) {
        let about = posts[l].pop()
        posts[l].unshift(about)
    }
   
    POSTS.set(posts)

</script>



<svelte:head>
    <link rel="icon" href={$P+"/favicon.png"} />
</svelte:head>  



<PostNav />

<main>
    <div class="wrapper">
        <slot />
    </div>
</main>



<style>

    :global(body) {
        background: black;
        margin: 0;
        padding: 0;
    }

    :global(#svelte) {
        box-sizing: border-box;
        background: #ddd;
    }

    main {
        padding-left: max(1rem, calc((100% - 70ch) / 2));
        padding-right: max(1rem, calc((100% - 70ch) / 2));
        padding-top: 1rem;
        padding-bottom: 1rem;
    }



    @media only screen and (min-width: 40rem) {

        :global(#svelte) {
            display: grid;
            grid-template-areas: "mn sb";
            grid-auto-columns: 2fr 1fr;
            gap: .25rem;
            height: 100vh;
        }

        main {
            grid-area: mn;
            overflow-y: scroll;
        }

    }



    @media only screen and (min-width: 50rem) {

        :global(#svelte) {
            grid-auto-columns: 2.5fr 1fr;
        }
    }



    @media only screen and (min-width: 80rem) {

        :global(#svelte) {
            grid-auto-columns: 4fr 1fr;
        }

    }

</style>





