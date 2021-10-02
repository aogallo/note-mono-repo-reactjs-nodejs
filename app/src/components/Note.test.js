import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Note from './Note'

describe('Notes', () => {
  test('render content', () => {
    const note = {
      content: 'This is a test',
      important: true
    }

    const component = render(<Note note={note} />)

    component.getByText('This is a test')

    expect(component.container).toHaveTextContent(note.content)
  })

  test('clicking thebutton calls even handler', () => {
    const note = {
      content: 'This is a test',
      important: true
    }

    const mockHandler = jest.fn()

    const component = render(
      <Note note={note} toggleImportance={mockHandler} />
    )

    const button = component.getByText('make not important')
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler).toHaveBeenCalledTimes(1)
  })
})
