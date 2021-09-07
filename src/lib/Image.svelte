
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

    figure {
        margin-inline-start: 0.5rem;
        margin-inline-end: 0.5rem;
        margin-block-end: 2rem;
        min-height: 12rem;
    }

    figcaption {
        font-size: .8rem;
        font-style: italic;
        max-width: 500px; /* max. Breite des Thumbnails (500x200px) */
    }

    img.thumb {
        cursor: zoom-in;
        max-width: 100%;
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
        z-index: 3;
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

    @media only screen and (min-width: 60rem) {
        figure {
            margin-inline-start: 2rem;
            margin-inline-end: 2rem;
        }
    }

</style>