
import { writable } from 'svelte/store'

let TAGS = writable({})

TAGS.data = new Set()

TAGS.add = arr => {
    for (let i = 0; i < arr.length; i++) {
        TAGS.data.add(arr[i])
    }
}

export default TAGS

