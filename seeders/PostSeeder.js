const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const slugify = require('slugify');
const prisma = new PrismaClient();


const createRandomPosts = async function (totalPosts) {
    const categories = await prisma.category.findMany();
    const tags = await prisma.tag.findMany();
    const newPosts = []

    for (let i = 0;i < totalPosts;i++) {
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        const randomTags = faker.helpers.arrayElements(tags, Math.floor(Math.random() * tags.length) + 1);
        const name = faker.lorem.words(3);
        newPosts.push({
            name,
            slug: slugify(name),
            image: faker.image.urlLoremFlickr({ category: 'cats' }),
            content: faker.lorem.paragraphs(1),
            published: faker.datatype.boolean(),
            categoryId: randomCategory.id,
            tags: {
                connect: randomTags.map(tag => ({ id: tag.id }))
            }
        })
    }

    const createdPosts = [];

    try {
        for await (const newPost of newPosts) {
            const createdPost = await prisma.post.create({
                data: newPost
            });
            createdPosts.push(createdPost);
        }


    } catch (error) {
        console.error(error);
    }

    console.log(`${createdPosts.length} posts have been succesfully created`);
    return createdPosts;
};

createRandomPosts(50);