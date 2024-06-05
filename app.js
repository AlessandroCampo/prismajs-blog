const { createPost, readPostFromSlug, getAllPosts, modifyPost } = require("./services/PostCrud");

const testPost = {
    name: 'Test Post',
    content: 'Some random text as example description',
    published: false,
    category: 'Technology',
    tags: ['Entertainment', 'Business', 'Finance']
};

const sampleSlug = 'quis-demum-copiose';
const editedProperites = {
    name: 'Titolo modificato',
    category: 'Books',
    tags: ['Art',
        'Music']
}


// createPost(testPost);
// readPostFromSlug(sampleSlug);
// getAllPosts();
// modifyPost(editedProperites, 50)
// readPostFromSlug('cornu-decumbo-valetudo');