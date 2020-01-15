import React, { useState, useContext, useEffect, useRef } from 'react'
import { urlq } from '../../utils/utils'
import { CONNECTIONS } from '../../config'
import { User } from '../../context'
import styles from './NetworkSwitcher.module.scss'

const networkUrlParam = urlq.get('network') || ''

const getNetworkConfig = (network: string) => {
    const index = Object.keys(CONNECTIONS).indexOf(network)
    // TypeScript doesn't let access CONNECTIONS[networkName] directly
    return index !== -1
        ? Object.values(CONNECTIONS)[index]
        : CONNECTIONS.pacific // Use default config in case of mispelled URL params or
}

export const oceanConfig =
    networkUrlParam !== ''
        ? getNetworkConfig(networkUrlParam)
        : getNetworkConfig('pacific')

/* NETWORK SWITCHER */
export function NetworkSwitcher() {
    const node: any = useRef()
    const [isToggled, setIsToggled] = useState(false)

    useEffect(() => {
        // Handle click outside to collapse Network switcher dropdown
        // add listener when mounted
        document.addEventListener('mousedown', handleToggle)
        // return function when unmounted
        return () => {
            document.removeEventListener('mousedown', handleToggle)
        }
    }, [])
    /*  
    useEffect(() => {
        if (networkUrlParam !== '') {
            switchNetwork(networkUrlParam)
        }
    }, []) 
    */

    const handleToggle = (e: any) => {
        const isClickedInside = node.current.contains(e.target)
        setIsToggled(isClickedInside)
    }

    const { network, isBurner } = useContext(User)

    console.log(isBurner)

    const switchNetwork = (networkName: string): any => {
        // Force page to get refreshed
        window.location.href = `${window.location.origin}?network=${networkName}`
        //userContext.switchNetwork(networkName, getNetworkConfig(networkName))
        setIsToggled(false) // for the case without force page refresh
    }

    return !isBurner ? null : (
        <div
            ref={node}
            className={`${styles.networkListWrapper} ${
                isToggled ? styles.on : ''
            }`}
        >
            <button
                className={styles.networkSwitchButton}
                onClick={e => handleToggle(e)}
            >
                <span>Change Network</span>
            </button>
            <ul className={styles.networkList}>
                {Object.keys(CONNECTIONS).map((networkName, i) => (
                    <li
                        key={networkName}
                        className={
                            network.toUpperCase() === networkName.toUpperCase()
                                ? styles.selected
                                : ''
                        }
                    >
                        <button
                            className={styles.listButton}
                            onClick={() => switchNetwork(networkName)}
                        >
                            {networkName}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}