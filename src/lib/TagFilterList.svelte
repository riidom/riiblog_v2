
<script>
    import TAGS from '$lib/stores/tags'
    import { findCommon } from '$lib/util/util'

    let allTags = [...TAGS.data]
</script>



<ul class="tags-list">
{#each allTags as tag}
    <li>
        <button class="icon yes">☑︎</button>
        <button class="tag">#{tag}</button>
        <button class="icon no">☒</button>
    </li>
{/each}
</ul>



<style>
    .tags-list {
        display: flex;
        gap: .5rem;
        margin: 0;
        padding: 0;
    }

    li {
        display: flex;
        gap: 0;
        background: #fff4;
        border: 1px solid #0004;
        border-radius: 6px;
        font-size: .8rem;
        align-items: center;
    }

    button {
        display: inline;
        border: none;
        outline: none;
        cursor: pointer;
        margin: 0;
        padding: .25rem .15rem;
        background: none;
    }

    button.tag {
        margin: 0 .25rem;
    }

    button.yes {
        color: #060;
    }

    button.no {
        color: #600;
    }

    .yes:hover, .yes:focus {
        background: #0602;
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
    }

    .tag:hover, .tag:focus {
        background: #0001;
    }

    .no:hover, .no:focus {
        background: #6002;
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
    }
</style>