import React, { useState, useEffect } from 'react'

import xstore, { useStore } from './store3.js'

export default () => {
    let store = useStore()
    return (
        <div>
            <h4>ONE</h4>
            <input
                onChange={e => store.$set({ text: e.target.value })}
                value={store.text}
            />

            <p>text: {store.text}</p>
            {console.log('@ ONE')}
        </div>
    )
}
