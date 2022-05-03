# Comments Section App

This is a GraphQL, React, Typesccript, and MongoDB project to create a website comments section.

- Bind mount the project files that change to the container
- Use Nodemon to run the app
- Store `node_modules` in an anonymous volume

Start with:
```
dk run -d -p 3000:80 --rm -v ./dist:/srv:ro -v /srv/node_modules comments_section:latest
```