
<script>
    import P from '$lib/stores/path'
    export let d = {
        postId: '',
        filename: '',
        alt: '',
        url: ''
    }
</script>



<a href={d.url} target="_blank" rel="noopener noreferrer" tabindex="0">
    <span>↳</span>
    <img src={$P + '/' + d.postId + '/' + d.filename} alt={d.alt}>
</a>



<style>

    a {
        display: flex;
        align-items: center;
        max-width: fit-content;
        text-decoration: none;
    }

    span {
        margin: 0 .25rem 0 .5rem;
    }

    img {
        cursor: pointer;
        max-width: 100%;
    }

    img:hover {
        filter: drop-shadow(0 0 2px var(--img-hover));
    }


</style>