
<script>
    import { beforeUpdate } from 'svelte'
    import { convertCookie } from '$lib/util/util'

    import STR from '$lib/util/strings'
	import PostHeader from '$lib/PostHeader.svelte'



    let renderTitles = []
    let renderContent = []
    let LANG
    let introText = ''

    beforeUpdate( () => {

        LANG = convertCookie(document.cookie)['lang'] || 'en'
        introText = STR.Intro[LANG]

    
        let cards = new Map()

        cards.set('3D', {
            de: ["stilisiert", "meist low-poly", "Blender"],
            en: ["stylized graphics", "mostly lowpoly", "Blender"]
        })

        cards.set('Video', {
            de: ["Render&shy;footage", "Schnitt, Einblendungen"],
            en: ["render footage", "cut, captions"]
        })

        cards.set('2D', {
            de: ["Icons, Illustrationen"],
            en: ["icons, illustrations"]
        })

        cards.set('Gamedev', {
            de: ["Text oder 2D", "Godot Game Engine"],
            en: ["text-based or 2D", "Godot Game Engine"]
        })

        cards.set('IF', {
            de: ["mit anklickbaren Optionen", "vorzugsweise im Browser spielbar", "Twine, Ink"],
            en: ["choice-based", "preferably playable in browser", "Twine, Ink"]
        })

        cards.set('Webdev', {
            de: ["Frontend", "Wordpress", "Svelte", "CSS"],
            en: ["Frontend", "Wordpress", "Svelte", "CSS"]
        })



        for (const [k, v] of cards) {
            renderTitles.push(k)
            renderContent.push(v[LANG])
        }

    })

</script>



<PostHeader title={"riidom\'s Blog!"}  date={" "} tags={null}/>

<p>{@html introText}</p>

<section>
{#each [...renderTitles] as title, i}
    <article>
        <h2>{@html title}</h2>
        <hr>
        <ul>
            {#each renderContent[i] as item}
                {#if item.charAt(0) === '@'}
                    <h3>{@html item.slice(1)}</h3>
                {:else}
                    <li>{@html item}</li>
                {/if}
            {/each}
        </ul>
    </article>
{/each}
</section>



<style>

    section {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
    }

    article {
        padding: 1rem;
        width: 100%;
        background-color: var(--tag-bg);
        border-radius: 1rem;
    }

    ul {
        padding: 0 0 0 .5rem;
    }

    h2 {
        font-size: 1.25rem;
        text-align: center;
        padding: 0;
        margin: 0;
    }

    h3 {
        font-size: 1.15rem;
        margin: 0.5rem 0 0.25rem -.5rem;
    }

    li {
        font-size: 1rem;
        margin-left: 1rem;
    }

    /* no sidebar but some space
        (before this: no sidebar and tight, 100% width) */
    @media only screen and (min-width: 30rem) {
        article {
            width: 40%;
        }
    }

    /* sidebar, gets tight */
    @media only screen and (min-width: 40rem) {
        article {
            width: 100%;
        }
    }

    /* wide enough again
        (only 2 columns after 51rem; font-size scales too) */
    @media only screen and (min-width: 51rem) {
        article {
            width: 40%;
        }
    }

</style>