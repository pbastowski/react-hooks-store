import React, { useState, useEffect, useReducer } from 'react'

import { useFormInput } from './hooks'
import store from './store.js'

export default () => {
    let [inpTopText, topText] = useFormInput('')
    let [inpBottomText, bottomText] = useFormInput('')

    useEffect(() => store.fetchMemeImages(), [])

    const handleSubmit = e => {
        e.preventDefault()
        store.pickRandomImage()
    }

    return (
        <div>
            <form className="meme-form" onSubmit={handleSubmit}>
                <input placeholder="Top Text" {...inpTopText} />
                <input placeholder="Bottom Text" {...inpBottomText} />

                <button>Gen</button>
            </form>
            <div className="meme">
                <img src={store.randomImg} alt="" />
                <h2 className="top">{topText}</h2>
                <h2 className="bottom">{bottomText}</h2>
            </div>
            {console.log('@ MemeGenerator')}
        </div>
    )
}
