const React = require('react')
const {
	render,
	getByLabelText,
	fireEvent,
	queryByLabelText,
	screen,
} = require('@testing-library/react')
const SwitchCanvasEnv = require('./index')
const { getCookie } = require('../../../../utils/strings')
require('../../../../../__mocks__/localStorage')

jest.mock('../../../../utils/strings', () => ({
	getCookie: jest.fn(),
}))

describe('SwitchCanvasEnv', () => {
	const renderComponent = () =>
		render(<SwitchCanvasEnv label="label" keyName="local" />)

	it('should render checked input', () => {
		localStorage.setItem('local', true)
		renderComponent()
		const switchInput = screen.getByRole('switch', {
			name: 'label',
			checked: true,
		})

		expect(switchInput).toBeInTheDocument()
	})

	it('should render unchecked input', () => {
		getCookie.mockReturnValueOnce('lartiles')
		localStorage.setItem('local', false)
		renderComponent()
		const switchInput = screen.getByRole('switch', {
			name: /label/i,
		})

		expect(switchInput).toBeInTheDocument()
	})

	it('should not render input', () => {
		localStorage.setItem('local', false)
		getCookie.mockReturnValueOnce('lartiles')

		const component = renderComponent()
		const switchInput = queryByLabelText(component.container, 'label')

		expect(switchInput).toBeInTheDocument()

		getCookie.mockReturnValueOnce('adsfg')
		component.rerender()
		expect(switchInput).not.toBeInTheDocument()
	})

	it('should set localStorage', () => {
		localStorage.setItem('local', true)
		const { container } = renderComponent()
		const switchInput = getByLabelText(container, 'label')

		const setItemSpy = jest.spyOn(localStorage, 'setItem')
		fireEvent.click(switchInput)

		expect(setItemSpy).toHaveBeenCalledTimes(1)
	})

	it('should reload window', () => {
		localStorage.setItem('local', true)
		Object.defineProperty(window, 'location', {
			configurable: true,
			value: { reload: jest.fn() },
		})

		const { container } = renderComponent()
		const switchInput = getByLabelText(container, 'label')

		fireEvent.click(switchInput)

		expect(window.location.reload).toHaveBeenCalledTimes(1)
	})
})
