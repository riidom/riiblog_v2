
<script>
    export let title
    export let date
    export let tags
</script>



<h1>{title}</h1>
<p>{date} &ndash;
    {#each tags as tag}
        {tag} &nbsp;
    {/each}
</p>