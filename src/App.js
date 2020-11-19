import React, { useState } from 'react'
import Header from './Header'
import MemeGenerator from './MemeGenerator'
import { useObj } from './hooks'

import Child1 from './child1.js'
import Child2 from './child2.js'
import { useStore } from './store.js'

export default () => {
    useStore()
    let [show, setShow] = useObj({ 1: true, 2: true, 3: true, 4: true })

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {Object.keys(show).map(i => (
                    <div key={i}>
                        {show[i] && <Child1 />}
                        <button onClick={() => setShow({ [i]: !show[i] })}>
                            toggle
                        </button>
                    </div>
                ))}
                <Child2 />
            </div>
            <Header />
            <MemeGenerator />
            {console.log('@ APP')}
        </div>
    )
}

// {console.log('render App')}
