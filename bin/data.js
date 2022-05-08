export const users = [{ name: "Leonard" }, { name: "Martha" }]

export function createthreads(user1, user2) {
    return [
        {
            title: "The Perilous Life of a Chicken",
            comments: [
                {
                    user: user2,
                    text: "I'm glad I'm not a chicken",
                    timestamp: new Date(),
                    replies: [
                        {
                            user: user1,
                            timestamp: new Date(),
                            text: "If I was an animal I would be salamander. I've always wanted to be slimy.",
                        },
                    ],
                },
                {
                    user: user1,
                    text: "Whoa, that sounds terrible",
                    timestamp: new Date(),
                    replies: [],
                },
            ],
        },
        {
            title: "Vacuuming For Beginners",
            comments: [
                {
                    user: user2,
                    text: "This was so helpful! I never understood the concept of vacuuming until now!",
                    timestamp: new Date(),
                    replies: [
                        {
                            user: user1,
                            timestamp: new Date(),
                            text: "It took me 10 years to learn to vacuum.",
                        },
                    ],
                },
                {
                    user: user1,
                    timestamp: new Date(),
                    text: "Great article. I could plug my vacuum in and turn it on but didn't know what to do after. After reading this article I am able to move the vacuum back and forth over the floor.",
                    replies: [],
                },
            ],
        },
    ]
}
