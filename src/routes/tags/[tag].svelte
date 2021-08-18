
<script context="module">
    const allPosts = import.meta.glob('../blog/*.md')
    console.log(allPosts)
    
    let list = []
    for (let path in allPosts) {
        list.push(
            allPosts[path]().then(mod => {
                let metadata = mod.metadata
                path = path.slice(0, -3)
                return {path, metadata}
            })
        )
    }

    export const load = async ({page}) => {
        const tag = page.params.tag
        const posts = await Promise.all(list)
        const filteredPosts = posts.filter(post => {
        return post.metadata.tags.includes(tag)
    })
        return {
            props: {
                filteredPosts,
                tag
            }
        }
    }

</script>

<script>
    export let filteredPosts
    export let tag
    console.log(filteredPosts)
</script>



<h1>#{tag}</h1>

<ul>
    {#each filteredPosts as post}
    <li class="entry">
        <a class="post" href={`/blog/${post.path}`}>{post.metadata.title}</a>
        <p class="tags">
            {#each post.metadata.tags as tag}
                <a href={`/tags/${tag}`}>#{tag}</a>
            {/each}
        </p>
    </li>
    {/each}
</ul>



<style>
    .entry {
        margin-bottom: 1rem;
    }
    .post {
        display: block;
        margin-bottom: .5rem;
    }
    .tags {
        display: flex;
        gap: .5rem;
        margin: 0;
    }
    .tags a {
        text-decoration: none;
        border: 1px solid #0004;
        padding: .2rem .5rem .15rem .25rem;
        border-radius: 6px;
        font-size: .8rem;
    }
</style>