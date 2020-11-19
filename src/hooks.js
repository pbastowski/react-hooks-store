import { useState, useEffect } from 'react'

/*
    Just like the useState hook, we accept an initial value
    and return an array of [value, setValue, inputObject].

    <Usage:>
    In JS:
    let [topText, setTopText, inpTopText] = useFormInput('')

    In JSX:
    <input placeholder="Top Text" {...inpTopText} />
 */

export function useFormInput(initialValue) {
    const [value, setValue] = useState(initialValue)

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    function onChange({ target }) {
        setValue(target.value)
    }

    return [
        {
            value,
            onChange
        },
        value,
        setValue
    ]
}

// Returns a useStore hook
export const createStore = store => {
    let value, set

    const setter = nv => {
        // Update values within the store, without overwriting it's reference,
        // because other components may hold a reference to the original store.
        Object.assign(store, nv)
        // Now, use the setter function with a new reference to force an update
        set({})
    }

    Object.defineProperty(store, '$set', {
        enumerable: false,
        writable: false,
        configurable: false,
        value: setter
    })

    return () => {
        ;[value, set] = useState()
        return store
    }
}

// Returns a tuple with useStore hook and the setter function
export const createStore2 = store => {
    let value, set

    const setter = nv => {
        // Update values within the store, without overwriting it's reference,
        // because other components may hold a reference to the original store.
        Object.assign(store, nv)
        // Now, use the setter function with a new reference to force an update
        set({})
    }

    return [
        () => {
            ;[value, set] = useState(store)
            return store
        },
        setter
    ]
}

export function createStore3(store) {
    console.log('@ CREATE', getCallerFunction())
    let updaters = new Set()
    let v, setv

    store.$set = nv => {
        Object.assign(store, nv)
        for (let update of updaters) update({})
    }

    return () => {
        ;[v, setv] = useState(store)
        let codeLine = getCallerFunction()

        updaters.add(setv)

        useEffect(() => {
            console.log('@ USE', updaters.size, codeLine)
            return () => {
                let codeLine = getCallerFunction(-1)
                let i = 0
                for (let update of updaters)
                    console.log('D:', i++, update === setv, codeLine)
                updaters.delete(setv)
                console.log('@ DELETE', updaters.size, codeLine)
            }
        }, [])

        return store
    }
}

function getCallerFunction(line = 3) {
    if (line === -1) return new Error().stack
    else return new Error().stack.split('    at ')[3]
}

export const createStore_old = state => {
    let svs = new Set()
    let v, sv

    state.$set = nv => {
        state = { ...state, ...nv }
        for (sv of svs) sv(state)
        console.log('XXX', state.allMemeImgs.length)
    }

    return () => {
        ;[v, sv] = useState(state)
        svs.add(sv)

        useEffect(() => {
            return () => {
                svs.delete(sv)
            }
        }, [])

        return [state, state.$set]
    }
}

export const createStoreProxy = state => {
    const proxy = new Proxy(state, {
        set(o, p, v) {
            state.$set((o[p] = v))
            return true
        }
    })

    let hook = () => {
        let [v, sv] = useState(state)
        state.$set = sv
        hook = () => proxy
        return proxy
    }

    return hook
}

/*
    hook: merge new data into state instead of overwriting the state
    This is useful for objects that have a group of props in them.

    For example:
      const [filters, setFilters] = useObj({ sortBy: 'a', sortOrder: 'asc' })
      setFilters({sortBy: 'b'})  --> filters { sortBy: 'b', sortDesc: 'asc' }

    With useState the same result can be achieved like this
      const [filters, setFilters] = useState({ sortBy: 'a', sortOrder: 'asc' })
      setFilters({ ...filters, sortBy: 'b' })

*/
export const useObj = obj => {
    const [v, s] = useState(obj)
    return [v, nv => s({ ...v, ...nv })]
}
