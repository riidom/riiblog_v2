
<script>
    import P from '$lib/stores/path'
    export let d = {
        postId: '',
        filename: '',
        alt: '',
        cap: ''
    }
</script>



<figure>
    <img src={$P + '/' + d.postId + '/' + d.filename + '-500x200.jpg'}
    alt={d.alt}>
    <figcaption>{d.cap}</figcaption>
</figure>