import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Togglabe from './Togglable'

describe('Togglabe', () => {
  let component = null
  const buttonLabel = 'show'

  beforeEach(() => {
    component = render(
      <Togglabe buttonLabel={buttonLabel}>
        <div className='testDiv'>testdivContent</div>
      </Togglabe>
    )
  })

  test('render its children', () => {
    component.getByText('testdivContent')
  })

  test('have styles', () => {
    const el = component.getByText('testdivContent')
    expect(el.parentNode).toHaveStyle('display: none')
  })

  test('after clicking its children must be shown', () => {
    const button = component.getByText(buttonLabel)

    fireEvent.click(button)

    const el = component.getByText('testdivContent')
    expect(el.parentNode).not.toHaveStyle('display: none')
  })
})
