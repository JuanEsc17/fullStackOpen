import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
    test('calls the event handler with correct details when creating a new blog', () => {
        const createBlog = jest.fn()
        
        render(<BlogForm createBlog={createBlog} />)
        
        const titleInput = screen.getByPlaceholderText('title')
        const authorInput = screen.getByPlaceholderText('author')
        const urlInput = screen.getByPlaceholderText('URL')
        const submitButton = screen.getByText('create')
        
        // Simula el ingreso de datos
        fireEvent.change(titleInput, {
            target: { value: 'Testing a form...' }
        })
        fireEvent.change(authorInput, {
            target: { value: 'Test Author' }
        })
        fireEvent.change(urlInput, {
            target: { value: 'http://testurl.com' }
        })
        
        // Simula el envío del formulario
        fireEvent.click(submitButton)
        
        // Verifica que el manejador fue llamado con los datos correctos
        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0][0]).toEqual({
            title: 'Testing a form...',
            author: 'Test Author',
            url: 'http://testurl.com'
        })
    })
})