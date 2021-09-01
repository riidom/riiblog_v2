
import { writable } from 'svelte/store'
import TAGS from '$lib/stores/tags'



//  0: unset filter
//  1: remove all posts without that tag
// -1: remove all posts with that tag



function createFilter () {
    const { subscribe, set, update } = writable({})

    // define not all at once, so a method can use 'methods.get()'
    const methods = { subscribe }

    methods.init = () => {
        for (let i of Array.from(TAGS.data)) {
            update(f => {
                f[i] = 0
                return f
            })
        }
    }

    methods.set = (tag, filterValue) => {
        update(f => {
            f[tag] = filterValue
            return f
        })
    }

    methods.get = () => {
        let returnValue = null
        update(f => {
            returnValue = f
            return f
        })
        return returnValue
    }

    methods.query = tag => {
        let tags = methods.get()
        return tags[tag]
    }

    methods.change = (tag, action) => {
        // update filter object, responding to click
        const currentFilters = methods.get()
        if (action === currentFilters[tag]) {
            // clicked on active, so unset it
            methods.set(tag, 0)
        } else {
            // clicked on another, so activate that
            methods.set(tag, action)
        }
    }

    return methods
}

export const FILTER = createFilter()
