
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
    <article class="wrapper" aria-live="polite">
        <slot />
    </article>
</main>



<!-- CSS vars for bright color scheme
    :root {
        --bg: #eee;
        --hr: #999;
        --img-hover: #555;

        /* Typo */

        --text: #333;
        --h: #343;
        --a: #00f;
        --a-hover: #66f;
        --pre: #666;
        --unavailable: #777;

        /* TagFilterList */

        --tf-bg: #fff4;
        --tf-border: #0004;

        --tf-tag: #009;
        --tf-yes: #060;
        --tf-no: #600;

        --tf-active: #eee;
        --tf-yes-active-bg: #060;
        --tf-no-active-bg: #600;

        --tf-tag-hover-bg: #1111;
        --tf-yes-hover-bg: #0602;
        --tf-no-hover-bg: #6002;

        /* Tags */

        --tag-text: #222;
        --tag-bg: #fff;
        --tag-border: #999;

        /* Buttons */

        --btt-bg: #fff;
        --btt-border: #222;

        --btt-hover-bg: #fff;
        --btt-hover-border: #888;

    }
-->

<style>

    :root {
        
        --bg: #22222b;
        --hr: #556;
        --img-hover: #bbd;

        /* Typo */

        --text: #ddddda;
        --h: #ddc;
        --a: #aaf;
        --a-hover: #ddf;
        --pre: #999;
        --unavailable: #666;

        /* TagFilterList */

        --tf-bg: #333;
        --tf-border: #666;

        --tf-tag: #ddd;
        --tf-yes: #9f9;
        --tf-no: #f99;

        --tf-active: #000;
        --tf-yes-active-bg: #6c6;
        --tf-no-active-bg: #f66;

        --tf-tag-hover-bg: #555;
        --tf-yes-hover-bg: #353;
        --tf-no-hover-bg: #644;

        /* Tags */

        --tag-text: #bbb;
        --tag-bg: #2b2b2f;
        --tag-border: #444;

        /* Buttons */

        --btt-bg: #2b2b2f;
        --btt-border: #444;

        --btt-hover-bg: #445;
        --btt-hover-border: #888;

    }

    :global(html) {
        font-size: 1rem;
    }

    :global(body) {
        background: var(--bg);
        margin: 0;
        padding: 0;
    }

    :global(#svelte) {
        box-sizing: border-box;
        background: var(--bg);
        padding-top: 3rem;
    }

    :global(hr) {
        border-color: var(--hr);
        border-style: none;
        border-bottom-style: solid;
    }

    :global(h1, h2, h3, h4, h5, h6) {
        font-family: sans-serif;
        font-weight: 100;
        color: var(--h);
    }
    
    :global(h1) { font-size: 2.5rem; letter-spacing: -.125rem;}
    :global(h2) { font-size: 1.75rem; letter-spacing: -.1rem;}
    :global(h3) { font-size: 1.35rem; letter-spacing: -.05rem;}

    :global(p, figcaption, li) {
        color: var(--text);
        font-weight: 200;
    }

    :global(figcaption) {
        font-family: serif;
    }

    :global(p, li) {
        font-family: sans-serif;
        line-height: 133%;
        letter-spacing: -.5px;
    }

    :global(a) {
        font-family: sans-serif;
        color: var(--a);
        text-decoration: none;
    }

    :global(a:hover, a:focus) {
        color: var(--a-hover);
        text-decoration: underline;
    }

    :global(button) {
        font-family: sans-serif;
    }
    
    main {
        overflow-x: hidden;
        padding-left: max(1rem, calc((100% - 70ch) / 2));
        padding-right: max(1rem, calc((100% - 70ch) / 2));
        padding-top: 1rem;
        padding-bottom: 1rem;
        scrollbar-color: #99a #446; /* Firefox */
    }

    main::-webkit-scrollbar {
        width: .5rem;
    }


    main::-webkit-scrollbar-track {
        background: linear-gradient(0deg, 
            #4464 0%,
            #446 10%,
            #446 90%,
            #4464 100%
        );
        border-radius: .25rem;
    }

    main::-webkit-scrollbar-thumb {
        background: linear-gradient(0deg, 
            #99aa 0%,
            #99a4 10%,
            #99a4 90%,
            #99aa 100%
        );
        border-radius: .25rem;
    }

    @media only screen and (min-width: 40rem) {
        
        :global(html) {
            font-size: 1.15rem;
        }

        :global(#svelte) {
            display: grid;
            grid-template-areas: "mn sb";
            grid-auto-columns: 2fr 1fr;
            gap: .25rem;
            height: 100vh;
            padding-top: 0;
        }

        :global(h1) { font-size: 3rem; letter-spacing: -.2rem;}
        :global(h2) { font-size: 2rem; letter-spacing: -.1rem;}
        :global(h3) { font-size: 1.5rem; letter-spacing: -.075rem;}

        main {
            grid-area: mn;
            overflow-y: scroll;
        }

    }



    @media only screen and (min-width: 50rem) {

        :global(html) {
            font-size: 1.3rem;
        }

        :global(#svelte) {
            grid-auto-columns: 2.5fr 1fr;
        }

        :global(h1) { font-size: 4rem; letter-spacing: -.3rem;}
        :global(h2) { font-size: 3rem; letter-spacing: -.15rem;}
        :global(h3) { font-size: 2rem; letter-spacing: -.1rem;}
    }



    @media only screen and (min-width: 80rem) {
        
        :global(html) {
            font-size: 1.5rem;
        }

        :global(#svelte) {
            grid-auto-columns: 4fr 1fr;
        }

    }

</style>





