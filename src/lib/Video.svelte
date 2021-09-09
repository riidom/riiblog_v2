
<script>
    import P from '$lib/stores/path'
    export let d = {
        postId: '',
        filename: '',
    }
</script>



<video controls>
    <source src={$P + '/' + d.postId + '/' + d.filename} type="video/mp4" />
    <track kind="captions" src="" />
</video>



<style>

    video {
        max-width: 100%;
    }
</style>