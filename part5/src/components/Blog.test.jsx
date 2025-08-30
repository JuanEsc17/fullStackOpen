import { fireEvent, render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
    const blog = {
            title: 'Component testing is done with react-testing-library',
            author: 'testing',
            likes: 1000,
            url: 'http://testblog.com',
            user: {
                username: 'unUserTesting',
            },
            id: 3123121
        }
    
    test('renders title but not url or likes by default', () => {
        render(<Blog blog={blog}/>)
        
        // Verifica que el titulo existe
        const titleElement = screen.getByText('Component testing is done with react-testing-library')
        expect(titleElement).toBeDefined()
        const authorElement = screen.getByText('testing')
        expect(authorElement).toBeDefined()

        // Verifica que los detalles no esten visibles
        const likes = screen.queryByText(`likes ${blog.likes}`)
        const url = screen.queryByText(blog.url)
        expect(likes).toBeNull()
        expect(url).toBeNull()
    })

    test('renders content', () => {
        render(<Blog blog={blog}/>)

        const element = screen.getByText('Component testing is done with react-testing-library')
        expect(element).toBeDefined()
    })

    test('clicking the button calls event handler once', () => {
        const mockHandler = vi.fn()

        const component = render(<Blog blog={blog} updateBlog={mockHandler}/>)
        const button = component.getByText('like')

        fireEvent.click(button)

        expect(mockHandler).toHaveBeenCalledTimes(1)
    })

    test('double-clicking the like button calls the event handler twice.', () => {
        const mockHandler = vi.fn()

        const component = render(<Blog blog={blog} updateBlog={mockHandler}/>)
        const button = component.getByText('like')

        fireEvent.click(button)
        fireEvent.click(button)

        expect(mockHandler).toHaveBeenCalledTimes(2)
    })

})