
<script>
    import P from '$lib/stores/path'
    export let d = {
        postId: '',
        filename: '',
        alt: '',
    }
</script>



<img src={$P + '/' + d.postId + '/' + d.filename} alt={d.alt} />



<style>

    img {
        max-width: 100%;
    }

</style>