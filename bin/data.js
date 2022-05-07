export const users = [{ name: "Leonard" }, { name: "Martha" }]

export const threads = [
    {
        id: 0,
        title: "The Perilous Life of a Chicken",
        comments: [
            {
                id: 0,
                user: 1,
                text: "I'm glad I'm not a chicken",
                replies: [
                    {
                        id: 0,
                        user: 0,
                        text: "If I was an animal I would be salamander. I've always wanted to be slimy.",
                    },
                ],
            },
            {
                id: 1,
                user: 0,
                text: "Whoa, that sounds terrible",
            },
        ],
    },
    {
        id: 1,
        title: "Vacuuming For Beginners",
        comments: [
            {
                id: 0,
                user: 1,
                text: "This was so helpful! I never understood the concept of vacuuming until now!",
                replies: [
                    {
                        id: 0,
                        user: 1,
                        text: "It took me 10 years to learn to vacuum.",
                    },
                ],
            },
            {
                id: 1,
                user: 0,
                text: "Great article. I could plug my vacuum in and turn it on but didn't know what to do after. After reading this article I am able to move the vacuum back and forth over the floor.",
            },
        ],
    },
]
