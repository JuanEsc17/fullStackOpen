import { fireEvent, render, screen } from '@testing-library/react'
import Togglable from './Togglable'

describe.skip('<Togglable />', () => {
    let component

    const buttonLabel = 'show'

    beforeEach(() => {
        component = render(
            <Togglable buttonLabelShow={buttonLabel}>
                <div className='testDiv'>testDivContent</div>
            </Togglable>
        )
    })

    test('renders its children', () => {
        component.getByText('testDivContent')
    })

    test('renders its children but they are not visible', () =>{
        const el = component.getByText('testDivContent')
        expect(el.parentNode).toHaveStyle('display: none')
    })

    test('after clicking its children must be shown', () => {
        const button = component.getByText(buttonLabel)
        fireEvent.click(button)

        const el = component.getByText('testDivContent')
        expect(el.parentNode).not.toHaveStyle('display: none')
    })
})
