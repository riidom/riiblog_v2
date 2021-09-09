
<script>
    import P from '$lib/stores/path'
    export let d = {
        postId: '',
        filename: '',
        alt: '',
        url: ''
    }
</script>



<a href={d.url} target="_blank" rel="noopener noreferrer">
    <img src={$P + '/' + d.postId + '/' + d.filename} alt={d.alt}>
</a>



<style>

    img {
        cursor: pointer;
        max-width: 100%;
    }

</style>