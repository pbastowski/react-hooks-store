import React, { useState, useEffect } from 'react'

import store from './store.js'

export default () => {
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
