const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const tags = [
    'Technology',
    'Health',
    'Travel',
    'Food',
    'Fashion',
    'Lifestyle',
    'Education',
    'Entertainment',
    'Business',
    'Finance',
    'Sports',
    'Politics',
    'Science',
    'Art',
    'Music',
    'Photography',
    'Gaming',
    'Books',
    'Movies',
    'DIY',
    'Fitness',
    'Parenting',
    'Relationships',
    'Environment',
    'News',
    'Innovation',
    'Startups',
    'Marketing',
    'Cooking',
    'Recipes',
    'Beauty',
    'Wellness',
    'SelfCare',
    'MentalHealth',
    'Adventure',
    'Nature',
    'Culture',
    'History',
    'Celebrities',
    'Memes',
    'Animals',
    'Pets',
    'Humor',
    'Quotes',
    'Inspiration',
    'Motivation',
    'PersonalDevelopment',
    'Productivity',
    'Career',
    'Coding',
    'WebDevelopment',
    'UXDesign',
    'DataScience',
    'ArtificialIntelligence',
    'Blockchain',
    'Cryptocurrency',
    'Investing',
    'Economy',
    'RealEstate',
    'Sustainability',
    'ClimateChange',
    'Volunteer',
    'Charity',
    'Hobbies',
    'Crafts',
    'HomeDecor',
    'Gardening',
    'FitnessTips',
    'Workout',
    'Yoga',
    'Meditation',
    'Mindfulness',
    'Family',
    'Kids',
    'PetsOfInstagram',
    'Viral',
    'Trends',
    'Events',
    'Concerts',
    'Festivals',
    'Holidays',
    'TravelTips',
    'Destinations',
    'Foodie',
    'RestaurantReviews',
    'HealthyEating'
];



const createTags = async function (tags) {
    try {
        const newTags = await prisma.tag.createMany({
            data: tags.map(t => ({ name: t })),
            skipDuplicates: true
        });
        console.log(newTags);
        return newTags;
    } catch (error) {
        console.error(error);
    }
};

createTags(tags);