import React from 'react'
import { User } from '../../../context/User'
import styles from './Popover.module.scss'

const Popover = ({
    forwardedRef,
    style,
    arrowProps
}: {
    forwardedRef: (ref: HTMLElement | null) => void
    style: React.CSSProperties
    arrowProps: {
        ref: (ref: HTMLElement | null) => void
        style: React.CSSProperties
    }
}) => (
    <div className={styles.popover} ref={forwardedRef} style={style}>
        <div className={styles.popoverInfoline}>
            <span className={styles.balance} title="Fake data">
                <strong>30</strong> ETH
            </span>
            {/* <span className={styles.balance} title={(eth / 1e18).toFixed(10)}>
                    <strong>{(eth / 1e18).toFixed(3).slice(0, -1)}</strong> ETH
                </span> */}
            <span className={styles.balance}>
                {/* <strong>{ocn}</strong> OCEAN */}
                <strong>2474290</strong> OCEAN
            </span>
        </div>

        <div className={styles.popoverInfoline}>
            <User.Consumer>
                {states =>
                    states.account ? (
                        <span className={styles.address} title={states.account}>
                            {states.account}
                        </span>
                    ) : (
                        <em>No account selected</em>
                    )
                }
            </User.Consumer>
        </div>

        <div className={styles.popoverInfoline}>
            Fake Network Name
            {/*
            <User.Consumer>
                {states => states.network && states.network}
            </User.Consumer> */}
        </div>
        <div ref={arrowProps.ref} style={arrowProps.style} />
    </div>
)

export default Popover