
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



<ul class="tags-list">
{#each allTags as tag}
    <li class="{tag}">
        <button class="icon yes {allTagsFilter[tag] === 1 ? 'active' : ''}" 
            on:click={()=>changeFilter(tag, 1)}
        >
            ☑︎
        </button>

        <button class="tag"
            on:click={()=>changeFilter(tag, 0)}
        >
            #{tag}
        </button>

        <button class="icon no {allTagsFilter[tag] === -1 ? 'active' : ''}"
            on:click={()=>changeFilter(tag, -1)}
        >
            ☒
        </button>
    </li>
{/each}
</ul>



<style>
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
        background: #fff4;
        border: 1px solid #0004;
        border-radius: 6px;
        align-items: center;
    }

    button {
        display: inline;
        border: none;
        outline: none;
        cursor: pointer;
        margin: 0;
        padding: 0.1rem;
        background: none;
    }

    button.tag {
        margin: 0;
        font-size: 0.75rem;
        color: #009;
    }

    button.yes {
        color: #060;
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;}

    button.no {
        color: #600;
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;    }

    .yes:hover, .yes:focus {
        background: #0602;
    }

    .yes.active {
        background: #060;
        color: #eee;
    }

    .tag:hover, .tag:focus {
        background: #1111;
    }

    .no:hover, .no:focus {
        background: #6002;
    }

    .no.active {
        background: #600;
        color: #eee;
    }
</style>