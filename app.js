const { createPost } = require("./services/PostCrud");

const testPost = {
    name: 'Test Post',
    content: 'Some random text as example description',
    published: false,
    category: 'Technology',
    tags: ['Entertainment', 'Business', 'Finance']
}


createPost(testPost);