
<script>
    import TAGS from '$lib/stores/tags'
    import { FILTER } from '$lib/stores/filter'
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

    let allTags = [...TAGS.data] // array of tag names
    FILTER.init()
    $: allTagsFilter = FILTER.get() // object of 'tagname: filtervalue'

    const changeFilter = (tag, filter) => {
        FILTER.change(tag, filter)
        dispatch('filterChanged', {tag, filter})
        allTagsFilter = FILTER.get()
    }
</script>


<p class="info" id="filter-label">Filter:</p>
<ul class="tags-list" aria-labelledby="filter-label">
{#each allTags as tag}
    <li class="{tag}" role="group">
        <button class="icon yes {allTagsFilter[tag] === 1 ? 'active' : ''}" 
            on:click={()=>changeFilter(tag, 1)}
            aria-label="filter posts: must have tag {tag}"
        >
            ☑︎
        </button>

        <button class="tag"
            on:click={()=>changeFilter(tag, 0)}
            aria-label="reset filters for tag {tag}"
        >
            {tag}
        </button>

        <button class="icon no {allTagsFilter[tag] === -1 ? 'active' : ''}"
            on:click={()=>changeFilter(tag, -1)}
            aria-label="filter posts: hide all with tag {tag}"
        >
            ☒
        </button>
    </li>
{/each}
</ul>



<style>

    .info {
        text-align: left;
        padding: 0 0 .5rem 0;
        margin: 0;
    }

    .tags-list {
        display: flex;
        gap: .25rem;
        margin: 0;
        padding: 0;
        flex-wrap: wrap;
    }

    li {
        display: flex;
        gap: 0;
        background: var(--tf-bg);
        border: 1px solid var(--tf-border);
        border-radius: 6px;
        align-items: center;
    }

    button {
        display: inline;
        border: none;
        outline: none;
        cursor: pointer;
        margin: 0;
        background: none;
    }

    button.tag {
        padding: 0;
        font-size: 0.75rem;
        letter-spacing: -.03rem;
        color: var(--tf-tag);
    }

    button.icon {
        font-size: 1rem;
        padding: 0 .2rem;
    }

    button.yes {
        color: var(--tf-yes);
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
    }

    button.no {
        color: var(--tf-no);
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
    }

    .yes:hover, .yes:focus {
        background: var(--tf-yes-hover-bg);
    }

    .yes.active {
        background: var(--tf-yes-active-bg);
        color: var(--tf-active);
    }

    .tag:hover, .tag:focus {
        background: var(--tf-tag-hover-bg);
    }

    .no:hover, .no:focus {
        background: var(--tf-no-hover-bg);
    }

    .no.active {
        background: var(--tf-no-active-bg);
        color: var(--tf-active);
    }
    
</style>