import { createStore } from './hooks.js'

export const store = {
    allMemeImgs: [],
    randomImg: 'http://i.imgflip.com/1bij.jpg',
    text: 'lalala',
    fetchMemeImages,
    pickRandomImage
}

const [hook, set] = createStore(store)
export { hook as default, set }

export function fetchMemeImages() {
    return fetch('https://api.imgflip.com/get_memes')
        .then(response => response.json())
        .then(({ data }) => {
            set({ allMemeImgs: data.memes })
        })
}

export function pickRandomImage() {
    const randNum = Math.floor(Math.random() * store.allMemeImgs.length)
    // console.log('memes:', store.$set)
    // console.log('memes:', store.allMemeImgs.length)
    set({ randomImg: store.allMemeImgs[randNum].url })
}
