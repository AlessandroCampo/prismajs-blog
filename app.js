const { createPost, readPostFromSlug } = require("./services/PostCrud");

const testPost = {
    name: 'Test Post',
    content: 'Some random text as example description',
    published: false,
    category: 'Technology',
    tags: ['Entertainment', 'Business', 'Finance']
};

const sampleSlug = 'quis-demum-copiose';


// createPost(testPost);
// readPostFromSlug(sampleSlug);