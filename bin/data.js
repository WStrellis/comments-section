export const users = [{ name: "Leonard" }, { name: "Martha" }]

export function createThreads(user1, user2) {
    return [
        {
            title: "The Perilous Life of a Chicken",
            created: new Date().toISOString(),
            comments: [
                {
                    user: user2,
                    text: "I'm glad I'm not a chicken",
                    timestamp: new Date().toISOString(),
                    replies: [
                        {
                            user: user1,
                            timestamp: new Date().toISOString(),
                            text: "If I was an animal I would be salamander. I've always wanted to be slimy.",
                        },
                    ],
                },
                {
                    user: user1,
                    text: "Whoa, that sounds terrible",
                    timestamp: new Date().toISOString(),
                    replies: [],
                },
            ],
        },
        {
            title: "Vacuuming For Beginners",
            created: new Date().toISOString(),
            comments: [
                {
                    user: user2,
                    text: "This was so helpful! I never understood the concept of vacuuming until now!",
                    timestamp: new Date().toISOString(),
                    replies: [
                        {
                            user: user1,
                            timestamp: new Date().toISOString(),
                            text: "It took me 10 years to learn to vacuum.",
                        },
                    ],
                },
                {
                    user: user1,
                    timestamp: new Date().toISOString(),
                    text: "Great article. I could plug my vacuum in and turn it on but didn't know what to do after. After reading this article I am able to move the vacuum back and forth over the floor.",
                    replies: [],
                },
            ],
        },
    ]
}
