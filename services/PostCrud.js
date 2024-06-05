const { PrismaClient, Prisma } = require('@prisma/client');
const slugify = require('slugify');
const prisma = new PrismaClient();

const createPost = async function (post) {
    const categories = await prisma.category.findMany();
    const tags = await prisma.tag.findMany();
    console.log(categories)
    const foundCategory = categories.find(c => c.name.toLocaleLowerCase() === post.category.toLocaleLowerCase()).id;
    const foundTags = post.tags.reduce((acc, t) => {
        const foundTag = tags.find(tag => tag.name.toLocaleLowerCase() === t.toLocaleLowerCase())
        if (foundTag) {
            return [...acc, { id: foundTag.id }]
        }
        return acc
    }, [])
    if (!foundCategory) {
        throw new Error(`There is no category with name ${post.category}`)
    }
    if (foundTags.length === 0) {
        throw new Error(`None of the provided tags exists in the tag table`)
    }

    try {
        const newPost = await prisma.post.create({
            data: {
                name: post.name,
                slug: slugify(post.name),
                image: post.image || null,
                content: post.content,
                categoryId: foundCategory,
                published: post.published,
                tags: {
                    connect: foundTags
                }

            }
        })
        return newPost
    } catch (error) {
        console.error(error);
    }
}

const readPostFromSlug = async function (slug) {
    try {
        const foundPost = await prisma.post.findUnique({
            where: {
                slug
            },
            include: {
                tags: {
                    select: {
                        name: true
                    }
                },
                category: {
                    select: {
                        name: true
                    }
                },
            }
        });
        console.log(`Found post with title ${foundPost.name}`)
        console.log(foundPost);
        return foundPost
    } catch (error) {
        console.error(error);
    }


};

const getAllPosts = async function () {
    try {
        const allPosts = await prisma.post.findMany({
            include: {
                category: {
                    select: {
                        name: true
                    }
                },
                tags: {
                    select: {
                        name: true
                    }
                }
            }
        });
        console.log(allPosts[0])
        console.log(`Correctly found ${allPosts.length} posts`);
        return allPosts;
    } catch (error) {
        console.error(error);
    }
}

const modifyPost = async function (newData, postId) {
    const allPosts = await prisma.post.findMany();
    if (!allPosts.some(p => p.id === postId)) {
        throw new Error(`No post with id ${postId}`)
    };
    const categories = await prisma.category.findMany();
    if (newData.category) {
        const foundCategory = categories.find(c => c.name.toLocaleLowerCase() === newData.category.toLocaleLowerCase()).id;
        if (!foundCategory) {
            throw new Error(`There is no category with name ${post.category}`)
        }
        newData.categoryId = foundCategory.id;
        delete newData.category;
    }

    const tags = await prisma.tag.findMany();
    if (newData.tags) {
        const foundTags = newData.tags.reduce((acc, t) => {
            const foundTag = tags.find(tag => tag.name.toLocaleLowerCase() === t.toLocaleLowerCase())
            if (foundTag) {
                return [...acc, { id: foundTag.id }]
            }
            return acc
        }, [])
        if (foundTags.length === 0) {
            throw new Error(`None of the provided tags exists in the tag table`)
        }
        newData.tags = foundTags;
    }

    //In case name is provided, update the slug accordingly

    if (newData.name) {
        newData.slug = slugify(newData.name)
    }


    try {
        const modifiedPost = await prisma.post.update({
            where: { id: postId },
            data: {
                ...newData,
                tags: { set: newData.tags }
            }
        })
        console.log(`The following post has been modified`, modifiedPost)
        return modifiedPost;
    } catch (error) {
        console.error(error);
    }
}

const deletePostFromId = async function (postId, areYouSure) {
    const allPosts = await prisma.post.findMany();
    if (!allPosts.some(p => p.id === postId)) {
        throw new Error(`No post found with id ${postId}`)
    }
    if (!areYouSure) return
    try {
        const deletedPost = await prisma.post.delete({
            where: { id: postId }
        })
        console.log('succesfully deleted one post', deletedPost)
        return deletedPost
    } catch (error) {
        console.error(error);
    }
};


module.exports = {
    createPost,
    readPostFromSlug,
    getAllPosts,
    modifyPost,
    deletePostFromId
}