import { Prisma, PrismaClient } from "../../../prisma/generated";
import { BadGatewayException, BadRequestException, Logger } from "@nestjs/common";
import { hash } from "argon2";

const prisma = new PrismaClient({
    transactionOptions: {
        maxWait: 5000,
        timeout: 10000,
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable
    }
})
async function main() {
    try {
        Logger.log('Starting database population')
        await prisma.$transaction([
            prisma.user.deleteMany(),
            prisma.socialLink.deleteMany(),
            prisma.stream.deleteMany(),
            prisma.category.deleteMany()
        ])

        const categoriesData = [
            {
                title: 'Minecraft',
                slug: 'minecraft',
                description:
                    'Immerse yourself in the endless world of creativity and adventure in Minecraft! This category is dedicated to the most popular sandbox, where you can build, explore, and survive in unique worlds. Follow streams, get inspired by creative builds, participate in collaborative projects, and share your achievements. Join a community where imagination knows no bounds, and discover the insane possibilities that Minecraft offers!',
                thumbnailUrl: '/categories/minecraft.webp'
            },
            {
                title: 'Grand Theft Auto V',
                slug: 'grand-theft-auto-v',
                description:
                    'Welcome to the criminal world of Los Santos! This category is dedicated to one of the most popular open-world games, where you can freely explore, complete missions, and enjoy insane adventures. Follow streams, participate in thrilling races and heists, discuss strategies, and share your unique moments from the game. Join a community where everyone will find something to do — from street racing to creating your own stories within GTA V!',
                thumbnailUrl: '/categories/grand-theft-auto-v.webp'
            },
            {
                title: 'Rust',
                slug: 'rust',
                description:
                    'Welcome to the harsh and exciting world of Rust! This category is dedicated to one of the most popular survival games, where strategy and skills play a key role. Follow streams, watch base building, thrilling battles, and resource raids. Share your tactics, discuss updates, and find like-minded people ready to challenge this brutal world. Join us to learn how to survive and thrive in conditions of fierce competition!',
                thumbnailUrl: '/categories/rust.webp'
            },
            {
                title: 'Cyberpunk 2077',
                slug: 'cyberpunk-2077',
                description:
                    'Welcome to the dark and thrilling world of Night City! This category is dedicated to Cyberpunk 2077, where you can immerse yourself in an atmosphere of the future, full of technology, adventure, and complex choices. Follow streams, discuss quests and storylines, and share your tactics and experience in this unique RPG. Join a community where everyone can explore the cyberpunk world and uncover its secrets, becoming part of this incredible story!',
                thumbnailUrl: '/categories/cyberpunk-2077.webp'
            },
            {
                title: 'Just Chatting',
                slug: 'just-chatting',
                description:
                    'Immerse yourself in a world of lively discussions and communication! This category offers you a unique opportunity to exchange opinions, participate in engaging conversations, and find like-minded people. Share your thoughts, ask questions, and get answers in real time. Join the streams where everyone can express their opinion and become part of a friendly community!',
                thumbnailUrl: '/categories/just-chatting.webp'
            },
            {
                title: 'Red Dead Redemption 2',
                slug: 'red-dead-redemption-2',
                description:
                    'Immerse yourself in the atmosphere of the Wild West with one of the most thrilling adventures in gaming history! This category is dedicated to Red Dead Redemption 2, where you can follow epic stories, explore picturesque landscapes, and participate in engaging streams. Discuss strategies, share moments from the game, and find like-minded people who share your passion for this cult masterpiece. Join us and discover a world full of adventure, freedom, and the spirit of cowboy life!',
                thumbnailUrl: '/categories/red-dead-redemption-2.webp'
            },
            {
                title: 'Learning',
                slug: 'learning',
                description:
                    'Expand your knowledge and skills in this category dedicated to learning! Here you will find streams and courses on diverse topics — from art and music to languages and personal productivity. Participate in interactive lessons, ask questions, and get advice from experienced mentors. Learning has become even more accessible and engaging! Join a community of those striving for self-improvement and discover new horizons for your development!',
                thumbnailUrl: '/categories/learning.webp'
            },
            {
                title: 'Fortnite',
                slug: 'fortnite',
                description:
                    'Immerse yourself in the vibrant and dynamic world of Fortnite! This category is dedicated to the iconic game where building, strategy, and battling opponents combine into one exciting process. Follow streams, watch matches featuring the best players, and learn unique tactics from them. Share your achievements, discuss new updates, and find like-minded people for collaborative play. Join our community and become part of epic battles on the island of Fortnite!',
                thumbnailUrl: '/categories/fortnite.webp'
            },
            {
                title: 'Counter-Strike',
                slug: 'counter-strike',
                description:
                    'Welcome to the world of intense battles and strategic gameplay! This category is dedicated to the popular game Counter-Strike, where you can watch thrilling matches, learn from the best players, and share your tactics. Join the streams, discuss the latest updates, and compete with other players. Keep up with the most vivid moments and become part of an engaging esports culture!',
                thumbnailUrl: '/categories/counter-strike.webp'
            },
            {
                title: 'Programming',
                slug: 'programming',
                description:
                    'Discover the fascinating world of code and technology! This category is dedicated to programming, where you can learn, share experiences, and be inspired by new ideas. Follow streams dedicated to various programming languages, tools, and project development. Participate in discussions, ask questions, and get advice from experienced developers. Join a community where code becomes art, and every line is a step toward your next achievement!',
                thumbnailUrl: '/categories/programming.webp'
            },
            {
                title: 'Dota 2',
                slug: 'dota-2',
                description:
                    'Immerse yourself in the world of strategic battles and team play with Dota 2! This category is intended for all fans of the cult MOBA, where you can follow exciting matches, study strategies, and share your experience with other players. Join the streams, discuss the latest updates and tactics, and find like-minded people for collaborative play. Discover an exciting world of heroes, skills, and team battles, where every decision can change the course of the fight!',
                thumbnailUrl: '/categories/dota-2.webp'
            },
            {
                title: 'Brawl Stars',
                slug: 'brawl-stars',
                description:
                    'Immerse yourself in dynamic battles and fast-paced tactics in the world of Brawl Stars! This category is created for all fans of exciting 3v3 battles and epic fights in "Battle Royale" mode. Here you can watch the best streams, discuss strategies, and develop new tactics for your brawlers. Join a community of players, follow the latest updates, unlock new characters, and upgrade their abilities. Every battle is a new challenge where teamwork and skill determine the winner!',
                thumbnailUrl: '/categories/brawl-stars.webp'
            },
            {
                title: 'Clash Royale',
                slug: 'clash-royale',
                description:
                    'Immerse yourself in the exciting world of Clash Royale, where strategy and instant decisions determine the outcome of battles! This category is intended for all fans of card battles, where you can watch engaging tournaments, study successful decks, and share your experience with other players. Join the streams, discuss the latest updates and tactics, unlock new cards, and upgrade your favorite cards to the maximum. Explore endless possibilities for creating unique strategies and fight against opponents to become a master of the arena!',
                thumbnailUrl: '/categories/clash-royale.webp'
            },
            {
                title: 'Music',
                slug: 'music',
                description:
                    'Immerse yourself in the world of music, where every chord and rhythm fills the atmosphere with inspiration and emotions! This category is intended for all music lovers and musicians, where you can enjoy live performances, discover new genres, and share your experience with like-minded people. Join the streams, discuss the latest releases and music industry events, and also share your creations and plays. Discover an amazing world of sounds, where every performance is a unique story waiting for its listener!',
                thumbnailUrl: '/categories/music.webp'
            },
            {
                title: 'Call of Duty',
                slug: 'call-of-duty',
                description:
                    'Immerse yourself in the world of thrilling military operations and team battles with Call of Duty! This category is created for all fans of the legendary franchise, where you can watch intense matches, study tactics, and share your experience with other players. Join the streams, discuss the latest updates and innovations, and also find allies for collaborative play in various modes. Explore dynamic maps, master unique weapons and tactics, where every decision you make can be the key to victory in this epic combat world!',
                thumbnailUrl: '/categories/call-of-duty.webp'
            },
            {
                title: 'World of Tanks',
                slug: 'world-of-tanks',
                description:
                    'Immerse yourself in the world of armored battles and strategic tactics with World of Tanks! This category is intended for all fans of legendary tank battles, where you can watch exciting matches, study the features of various tanks, and share your experience with like-minded people. Join the streams, discuss the latest updates and balancing, and find teammates for collaborative play in various modes. Discover exciting battles on diverse maps, upgrade your army, and develop strategic skills, where every decision you make can change the course of the fight!',
                thumbnailUrl: '/categories/world-of-tanks.webp'
            },
            {
                title: 'League of Legends',
                slug: 'league-of-legends',
                description:
                    'Immerse yourself in a world of epic battles and strategic gameplay with League of Legends! This category is created for all fans of the cult MOBA, where you can follow exciting matches, study strategies, and share your experience with other players. Join the streams, discuss the latest updates and patches, and also find like-minded people for collaborative play. Discover a multitude of unique champions, explore their abilities, and develop your skills to become a master of the battlefield. Every game is a new challenge, where teamwork and the ability to adapt to the situation determine the victory!',
                thumbnailUrl: '/categories/league-of-legends.webp'
            },
            {
                title: 'Sport',
                slug: 'sport',
                description:
                    'Immerse yourself in the exciting world of sports, where passion, competition, and the spirit of team play merge into one! This category is intended for all fans of an active lifestyle and sporting events, where you can follow engaging matches, discuss team strategies, and share your experience with other fans. Join the streams, follow the latest news and results, and also find like-minded people for collaborative training and discussions. Discover an amazing world of sports, where every competition is an opportunity to show your strength and striving for victory!',
                thumbnailUrl: '/categories/sport.webp'
            }
        ]
        await prisma.category.createMany({
            data: categoriesData
        })
        Logger.log('Categories created successfully')
        const categories = await prisma.category.findMany()

        const categoriesBySlug = Object.fromEntries(
            categories.map(category => [category.slug, category])
        )

        const streamTitles = {
            minecraft: [
                'Playing Minecraft: survival from scratch!',
                'Building epic structures in Minecraft',
                'Secrets of Minecraft: the adventure begins!',
                'Creating a farm in Minecraft',
                'Killing the Ender Dragon!',
                'Exploring Minecraft dungeons',
                'Magic potions and enchantments in Minecraft',
                'Automating resource gathering in Minecraft',
                'Fishing and hunting in Minecraft: gathering loot',
                'Crafting unique items in Minecraft'
            ],
            'grand-theft-auto-v': [
                'Completing GTA 5 at 100%',
                'Racing and stunts in GTA Online',
                'GTA 5 Story Mode: back in business!',
                'Heists in GTA V: doing the job',
                'Having fun in Los Santos',
                'Opening secret locations in GTA 5',
                'Playing "The Contract" missions in GTA Online',
                'Missions against the police in GTA 5',
                'Review of new cars and tuning in GTA Online',
                'Starting our own business in Los Santos'
            ],
            rust: [
                'Raiding bases in Rust',
                'Survival in the wasteland: Rust',
                'New Rust mechanics: testing!',
                'From noob to pro in Rust',
                'PvP battles in the world of Rust',
                'Preparing raids in Rust: tactics and strategies',
                'Traps and defensive structures in Rust',
                'Looking for rare resources in Rust',
                'Exploring huge Rust maps',
                'Surviving in the harsh conditions of Rust'
            ],
            'cyberpunk-2077': [
                'Exploring Night City in Cyberpunk 2077',
                'Completing Cyberpunk story quests',
                'Modding and customization in Cyberpunk',
                'Weapons and hacks: Cyberpunk combat tactics',
                'Agent missions in the world of the future',
                'Cyberimplants: upgrading the character',
                'Exploring the world of corporate conspiracies',
                'Missions with fast network attacks',
                'Doing side quests in Cyberpunk 2077',
                'Review of game updates and expansions'
            ],
            'just-chatting': [
                'Chatting with subscribers!',
                'Q&A: ask anything!',
                'Chill stream: chatting about everything',
                'Your stories, our discussions',
                'Cozy talks and news',
                'Discussing the latest movies and series',
                'Music recommendations from viewers',
                'Your questions, our answers!',
                'Thinking about the future of technology',
                'Trends in the gaming industry: discussing'
            ],
            'red-dead-redemption-2': [
                'Adventures in the world of Red Dead Redemption 2',
                'Completing RDR2 story: the Wild West calls',
                'Hunting and survival in RDR2',
                'Exploring the wild lands of RDR2',
                'Best missions in Red Dead Redemption 2',
                'Raiding bandit hideouts in RDR2',
                'Traveling through the Wild West world',
                'Trading and gathering resources in RDR2',
                'Becoming bounty hunters in RDR2',
                'Review of legendary animals and trophies'
            ],
            learning: [
                'Learning the basics of photography',
                'How to become a master of public speaking',
                'Immersing ourselves in the art of drawing',
                'How to properly learn foreign languages',
                'Time management for a productive life',
                'Understanding the psychology of communication',
                'Guitar basics for beginners',
                'Speed reading and memory techniques',
                'Learning the basics of cooking: cooking together',
                'Learning the basics of financial literacy'
            ],
            fortnite: [
                'Fortnite stream: battle royale!',
                'Building secrets in Fortnite',
                'Best tactics for victory in Fortnite',
                'Seasonal events in Fortnite: participating!',
                'Playing in duos and squads in Fortnite',
                'Unlocking new skins in Fortnite',
                'How to get a victory in Fortnite',
                'Fortnite challenges: completing!',
                'Review of the new Fortnite battle pass',
                'Training in building and shooting'
            ],
            'counter-strike': [
                'Counter-Strike heroes: strategy and tactics',
                'Best moments in CS:GO',
                'Participating in CS:GO tournaments',
                'Map review in Counter-Strike',
                'PvP battles in Counter-Strike',
                'Weapons and equipment in CS: choosing the best',
                'Tactics for victory in CS:GO matches',
                'Competitive games: learning how to win',
                'Esports teams: following the matches',
                'Participating in CS:GO practice matches'
            ],
            programming: [
                'Programming in JavaScript: from simple to complex',
                'Game development with Python: step by step',
                'Creating web applications with React: a practical guide',
                'Learning to develop mobile applications',
                'Analyzing algorithms and data structures',
                'Working with APIs in modern applications',
                'Code testing: what you need to know',
                'Automating development processes',
                'Secrets of effective debugging',
                'Review of modern web frameworks'
            ],
            'dota-2': [
                'Completing Dota 2: victory secrets',
                'Dota 2 heroes review: choosing your strategy',
                'Preparing for a Dota 2 tournament',
                'Analysis of the best Dota 2 matches',
                'Tips for improving gameplay in Dota 2',
                'Support heroes: how to play correctly?',
                'Secrets of macro-gaming in Dota 2',
                'Map control and roaming in Dota 2',
                'Playing as carry: winning matches',
                'Victory secrets in team battles'
            ],
            'brawl-stars': [
                'Streaming Brawl Stars: best brawlers!',
                'Brawl Stars gameplay tips',
                'Participating in Brawl Stars events',
                'New modes in Brawl Stars: testing!',
                'Discussing strategies for Brawl Stars',
                'How to choose the best brawler for each mode',
                'Playing duos and teams in Brawl Stars',
                'Completing seasonal events in Brawl Stars',
                'Unlocking new skins and rewards',
                'Secrets of leveling up brawlers'
            ],
            'clash-royale': [
                'Battles in Clash Royale: strategies and tactics',
                'Participating in Clash Royale tournaments',
                'Card review in Clash Royale',
                'Reaching new heights in Clash Royale',
                'Secrets of successful play in Clash Royale',
                'Creating decks for victories in Clash Royale',
                'Review of new cards and mechanics in Clash Royale',
                'Best moments of Clash Royale tournaments',
                'Streaming clan battles in Clash Royale',
                'Winning in duels and competitions'
            ],
            music: [
                'New music: discussing hits!',
                'Listening to and discussing favorite albums',
                'Discussing music genres: what to listen to?',
                'Creating music together!',
                'Music challenges: participate!',
                'Musical instruments review: choosing yours',
                'Studying music trends of 2024',
                'Music reactions: listening together',
                'Chill-out stream: listening to relaxing music',
                'Interactive playlist: choose the tracks'
            ],
            'call-of-duty': [
                'Preparing for battle in Call of Duty',
                'Call of Duty story missions: completing together',
                'Best moments from Call of Duty',
                'Review of new maps in Call of Duty',
                'Multiplayer in Call of Duty: tips and tactics',
                'Creating clans and participating in battles in Call of Duty',
                'Setting up weapons for maximum efficiency',
                'Secrets of the game in Call of Duty: how to be a leader',
                'Completing zombie mode in Call of Duty',
                'Review of the new Call of Duty battle pass'
            ],
            'world-of-tanks': [
                'Battles in World of Tanks: tactics and strategies',
                'Best tanks in World of Tanks',
                'Completing quests in World of Tanks',
                'Review of updates in World of Tanks',
                'Streaming battles in World of Tanks',
                'PvP battles: learning how to win',
                'Creating your own team for WoT tournaments',
                'Tank setups for the best gameplay',
                'Unlocking rare tanks and achievements',
                'Secrets of capturing key points in battles'
            ],
            'league-of-legends': [
                'League of Legends heroes: studying strategies',
                'Review of new updates in LoL',
                'Competing in League of Legends',
                'Gameplay tips for League of Legends',
                'Tournaments and championships in League of Legends',
                'Playing as support: how to be the best?',
                'Secrets of macro-gaming in League of Legends',
                'Best tactics for team play in LoL',
                'Playing ranked games in League of Legends',
                'Review of new skins and events in League of Legends'
            ],
            sport: [
                'Discussing sports events: latest news!',
                'Sports training: secrets of success',
                'Best moments in the world of sports',
                'Sports challenges: participate!',
                'Review of sports games and events',
                'Keeping fit: tips and life hacks',
                'Secrets of successful athletes: what is important to know?',
                'Discussing tactics and strategies for team sports',
                'Reactions to the latest sports broadcasts',
                'Participating in sports tournaments and competitions'
            ]
        }
        const usernames = [
            'stintik',
            'teacoder',
            'alex',
            'bella',
            'carter',
            'dylan',
            'ethan',
            'fiona',
            'grace',
            'henry',
            'isabella',
            'jackson',
            'kate',
            'liam',
            'mia',
            'noah',
            'oliver',
            'paige',
            'quinn',
            'ryan',
            'sophia',
            'thomas',
            'ursula',
            'victor',
            'willow',
            'xander',
            'yara',
            'zoe',
            'adrian',
            'bella',
            'caroline',
            'daniel',
            'elena',
            'felix',
            'gabriel',
            'hannah',
            'ian',
            'julia',
            'kevin',
            'lily',
            'michael',
            'nina',
            'oscar',
            'peter',
            'quincy',
            'rachel',
            'samuel',
            'taylor',
            'ulysses',
            'vanessa',
            'wyatt',
            'xenia',
            'yuri',
            'zoey',
            'amelia',
            'benjamin',
            'charlotte',
            'david',
            'emma',
            'frederick',
            'georgia',
            'harper',
            'isaac',
            'joseph',
            'katie',
            'lucas',
            'madison',
            'nathan',
            'olivia',
            'patrick',
            'quincy',
            'rebecca',
            'sebastian',
            'tiffany',
            'ulyana',
            'victoria',
            'wesley',
            'xavier',
            'yasmin',
            'zoella',
            'aaron',
            'brianna',
            'claire',
            'diego',
            'ella',
            'frank',
            'george',
            'holly',
            'ivan',
            'jessica',
            'kyle',
            'logan',
            'mason',
            'nicolas',
            'olga',
            'paul',
            'quinn',
            'ryder',
            'scarlett',
            'tristan',
            'ulysses',
            'violet'
        ]
        await prisma.$transaction(async tx => {
            for( const username of usernames) {
                const randomCategory = 
                categoriesBySlug[
                    Object.keys(categoriesBySlug)[
                        Math.floor(
                            Math.random() *
                            Object.keys(categoriesBySlug).length
                        )
                    ]
                ]
                const randomTitles = streamTitles[randomCategory.slug]

                const userExists = await tx.user.findUnique({
                    where: {
                        username
                    }
                })
                if(!userExists) {
                    const createdUser = await tx.user.create({
                        data: {
                            email: `${username}@teastream.com`,
                            password: await hash('12345678'),
                            username,
                            displayName: username,
                            avatar: `/channels/${username}.webp`,
                            isEmailVerified: true,
                            socialLinks: {
                                createMany: {
                                    data: [
                                        {
                                            title: 'Telegram',
                                            url: 'https://t.me/${username}',
                                            position: 1
                                        },
                                        {
                                            title: 'Youtube',
                                            url: `https://youtube.com/@${username}`,
                                            position: 2
                                        }
                                    ]
                                }
                            }
                        }
                    })
                    const randomTitles = streamTitles[randomCategory.slug]
                    const randomTitle = randomTitles[
                        Math.floor(Math.random() * randomTitles.length)
                    ]
                    await tx.stream.create({
                        data: {
                            title: randomTitle,
                            thumbnailUrl: `/streams/${createdUser.username}.webp`,
                            user: {
                                connect: {
                                    id: createdUser.id
                                }
                            },
                            category: {
                                connect: {
                                    id: randomCategory.id
                                }
                            }
                        }
                    })

                    Logger.log(
                        `User "${createdUser.username}" and their stream have been 
                        successfully created`
                    )
                }

            }
        })
    } catch (error) {
        Logger.error(error)
        throw new BadRequestException('Error while populating the database')

    } finally {
        Logger.log('Closing connection to database...')
        await prisma.$disconnect()
        Logger.log('Database connection closed successfully')

    }

}
main()