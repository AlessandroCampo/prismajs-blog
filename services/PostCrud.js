const { PrismaClient } = require('@prisma/client');
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
                categories: {
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

module.exports = {
    createPost,
    readPostFromSlug
}