
<script>
    import P from '$lib/stores/path'
    export let d = {
        postId: '',
        filename: '',
        alt: '',
        cap: ''
    }

    let active = false

    const toggleShow = () => {
        active = !active
    }
</script>



<figure>
    <img src={$P + '/' + d.postId + '/' + d.filename + '-500x200.jpg'}
        alt={d.alt} class="thumb" on:click={toggleShow}
    >
    <figcaption>{d.cap}</figcaption>
</figure>

<div class="modal-bg" class:active on:click={toggleShow}>
    <img src={$P + '/' + d.postId + '/' + d.filename + '.jpg'}
        alt={d.alt} class="fullview" on:click
    >
</div>



<style>
    img.thumb {
        cursor: zoom-in;
    }

    .modal-bg {
        display: none;
        background-color: #000000e4;
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        cursor: zoom-out;
    }

    .modal-bg.active {
        display: grid;
        align-content: center;
        justify-content: center;
    }

    img.fullview {
        max-width: 100vw;
        max-height: 100vh;
    }
</style>