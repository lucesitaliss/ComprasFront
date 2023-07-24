const React = require('react')
const { string, bool } = require('prop-types')
const Switch = require('@andes/switch')
const { isDevEnv } = require('../../constants/config')

const SwitchCanvasEnv = (props) => {
	const { label, keyName, value, disabled } = props

	const handleChange = (event) => {
		localStorage.setItem(keyName, event.target.checked)
		window.location.reload()
	}

	if (!isDevEnv) {
		return null
	}

	return (
		<Switch
			inverted
			label={label}
			disabled={disabled}
			checked={value?.toString().toLowerCase() !== 'false'}
			onChange={handleChange}
		/>
	)
}

SwitchCanvasEnv.displayName = 'SwitchCanvasEnv'

SwitchCanvasEnv.propTypes = {
	label: string.isRequired,
	keyName: string.isRequired,
	value: string,
	disabled: bool,
}

module.exports = SwitchCanvasEnv
