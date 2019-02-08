import cx from 'classnames'
import React, { PureComponent } from 'react'
import slugify from 'slugify'
import { ReactComponent as SearchIcon } from '../../../img/search.svg'
import Help from './Help'
import styles from './Input.module.scss'
import Label from './Label'
import Row from './Row'

interface InputProps {
    name: string
    label: string
    placeholder?: string
    required?: boolean
    help?: string
    tag?: string
    type?: string
    options?: string[]
    additionalComponent?: void
    value?: string
    onChange?: any
    rows?: number
}

interface InputState {
    isFocused: boolean
}

export default class Input extends PureComponent<InputProps, InputState> {
    public state: InputState = { isFocused: false }

    public inputWrapClasses() {
        if (this.props.type === 'search') {
            return styles.inputWrapSearch
        } else if (this.props.type === 'search' && this.state.isFocused) {
            return cx(styles.inputWrapSearch, styles.isFocused)
        } else if (this.state.isFocused && this.props.type !== 'search') {
            return cx(styles.inputWrap, styles.isFocused)
        } else {
            return styles.inputWrap
        }
    }

    public toggleFocus = () => {
        this.setState({ isFocused: !this.state.isFocused })
    }

    public InputComponent = ({ ...props }) => {
        if (props.type === 'select') {
            return (
                <div className={this.inputWrapClasses()}>
                    <select className={styles.select} {...props}>
                        {props.options &&
                            props.options.map(
                                (option: string, index: number) => (
                                    <option
                                        key={index}
                                        value={slugify(option, {
                                            lower: true
                                        })}
                                    >
                                        {option}
                                    </option>
                                )
                            )}
                    </select>
                </div>
            )
        } else if (props.type === 'textarea') {
            return (
                <div className={this.inputWrapClasses()}>
                    <textarea className={styles.input} {...props} />
                </div>
            )
        } else if (props.type === 'radio' || props.type === 'checkbox') {
            return (
                <div className={styles.radioGroup}>
                    {props.options &&
                        props.options.map((option: string, index: number) => (
                            <div className={styles.radioWrap} key={index}>
                                <input
                                    className={styles.radio}
                                    type={this.props.type}
                                    id={slugify(option, {
                                        lower: true
                                    })}
                                    name={this.props.name}
                                    value={slugify(option, {
                                        lower: true
                                    })}
                                />
                                <label
                                    className={styles.radioLabel}
                                    htmlFor={slugify(option, {
                                        lower: true
                                    })}
                                >
                                    {option}
                                </label>
                            </div>
                        ))}
                </div>
            )
        }

        return (
            <div className={this.inputWrapClasses()}>
                <input className={styles.input} {...props} />
                {props.type === 'search' && <SearchIcon />}
            </div>
        )
    }

    public render() {
        const {
            name,
            label,
            required,
            type,
            help,
            additionalComponent,
            options,
            ...props
        } = this.props

        return (
            <Row>
                <Label htmlFor={name} required={required}>
                    {label}
                </Label>

                <this.InputComponent
                    id={name}
                    label={label}
                    name={name}
                    required={required}
                    type={type}
                    options={options}
                    {...props}
                    onFocus={this.toggleFocus}
                    onBlur={this.toggleFocus}
                />

                {help && <Help>{help}</Help>}

                {additionalComponent && additionalComponent}
            </Row>
        )
    }
}