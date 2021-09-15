
import { writable } from 'svelte/store'

let path = '/blog'

if (process.env.NODE_ENV === 'development') {
    path = ''
}

const P = writable(path)

export default P