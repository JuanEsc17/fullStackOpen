const mongoose = require('mongoose')
const Blog = require('../models/Blog')
const { blogs, api } = require('../utils/list_helper')

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of blogs){
        const newBlog = new Blog(blog)
        await newBlog.save()
    }
})

describe.skip('existing blogs', () => {
    test('there are two blogs', async () => {
        const response = await api.get('/api/blogs')
        
        expect(response.body).toHaveLength(blogs.length)
    })

    test('the first blog is about react', async () => {
        const response = await api.get('/api/blogs')
        const titles = response.body.map(blog => blog.title)

        expect(titles).toContain('React patterns')
    })
})

describe.skip('add a blog', () => {
    test('a valid blog can be added', async () => {
        const newBlog = {
            title: "Maniana paro",
            author: "pepito",
            url: "www.hdsahsahs.com/sajs",
            likes: 2313
        }

        await api
            .post('/api/blogs/')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        const titles = response.body.map(blog => blog.title)

        expect(titles).toContain(newBlog.title)
        expect(response.body).toHaveLength(blogs.length + 1)
    })

    test('blog without title is not added', async () => {
        const newBlog = {
            author: 'pepe',
            url: 'blogger.com/dasdas',
            likes: 1
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(blogs.length)
    })
})

describe.skip('blogs id', () => {
    test.skip('blog posts have id property instead of _id', async () => {
        const response = await api.get('/api/blogs')
        response.body.forEach(blog => {
            expect(blog.id).toBeDefined()
            expect(blog._id).toBeUndefined()
        })
    })
})

describe.skip('blog creation with missing properties', () => {
    test('if likes property is missing from request, it defaults to 0', async () => {
        const newBlog = {
            title: "nueva yerba muy rica",
            author: "miguel angel",
            url: "yerbasricas.com/abc123"
        }
        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        expect(response.body.likes).toBe(0)
    })
    test('if url is missing from request, it returns 400 Bad Request', async () => {
        const newBlog = {
            title: "Avion estrella en el mar",
            author: "Spinetta",
            likes: 2312
        }

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
        
        expect(response.status).toBe(400)
    })
    test('if title is missing from request, it returns 400 Bad Request', async () => {
        const newBlog = {
            author: "Sandro",
            url: "www.unblogcualquiera.com/blog",
            likes: 2312
        }

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
        
        expect(response.status).toBe(400)
    })
})

describe.skip('delete blogs', () => {
    test('a blog can be delete', async () => {
        const blogsAtStart = await api.get('/api/blogs')
        const blogToDelete = blogsAtStart.body[0]
        
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)
        
        const blogsAtEnd = await api.get('/api/blogs')
        expect(blogsAtEnd.body).toHaveLength(blogsAtStart.body.length - 1)
    })
    test('a blog cant be delete', async () => {
        const blogsAtStart = await api.get('/api/blogs')
        const blogIdToDelete = -1

        await api
            .delete(`/api/blogs/${blogIdToDelete}`)
            .expect(404)
        
        const blogsAtEnd = await api.get('/api/blogs')
        expect(blogsAtEnd.body).toHaveLength(blogsAtStart.body.length)
    })
})

describe.skip('update likes', () => {
    test('a blog can be update', async () => {
        const blogs = await api.get('/api/blogs')
        const blogToUpdate = blogs.body[0]

        const blogUpdate = {
            ...blogToUpdate,
            likes: 1000
        }

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .expect(200)
        
        const finalBlog = await api.get(`/api/blogs/${blogToUpdate.id}`)
        expect(finalBlog.likes).not.toBe(blogToUpdate.likes)
    })
})

afterAll(async () => {
    mongoose.connection.close()
})