# Welcome to PPT!

- [Built with Remix](https://remix.run/docs)

## Features of this app

- Authentication with cookies
- Backed by Prisma and postgres
- Authorizing resource access
- CRUD ops for both pages and presentation

## Development

To run the app locally, first clone the [repo](https://github.com/wmahad/purple-ppt.git)

```sh
git clone https://github.com/wmahad/purple-ppt.git
```

Make sure your project's local dependencies are installed:

```sh
npm i
```

Set up environment variables

```sh
cp .env.sample .env
```

Set up the database, make sure you have [Docker](https://www.docker.com/) installed and running.

```sh
npm run docker:db
```

To set up the database tables, run the following command:

```sh
npm run db:migrate:deploy
```

This will execute prisma migrate deploy, which applies all pending migrations to your database.

The app comes with a dummy user, you can run the below command to seed the db. This will create a user with the following creds:

- `email: admin@ppt.io`
- `password: password`

```sh
npm run db:seed
```

Afterward, start the development server like so:

```sh
npm run dev
```

Open up [http://localhost:5173](http://localhost:5173) and you should be ready to go!

## Additional Tools

### Prisma Studio

Prisma Studio is a visual editor for the data in your database. It allows you to browse and edit data with a simple, intuitive interface. This can be particularly useful for debugging and manually managing your database content.

To open Prisma Studio, run the following command:

```sh
npm run studio
```

This will start Prisma Studio, and you can access it through your web browser. Use it to inspect and modify your database data directly during development.

## Testing

This app has `playwright` setup with `react-testing-library` utilities. Tests are yet to be updated.

It loads up `.env.test` file config, so it uses a different database and a different dev server port for the E2E tests.

All tests are run in sync by a single worker so we can safely reset the database before each test starts.

Before running `npm run dev test` for the first time, make sure to run these commands:

- `npx playwright install`
- `npx playwright install-deps`

---

## Decisions Made

### Technology Choices

- **Remix Stack**: Chosen to expedite development by leveraging its out-of-the-box capabilities, including routing and server-side rendering.
- **Pre-built Editor**: Integrated an existing editor to provide robust functionality quickly, focusing more on core features rather than reinventing the wheel.

### Implementation Choices

- **API Implementation**: Utilized the Remix stack to handle API requests, prioritizing rapid prototyping over custom API development.
- **Content Handling**: Leveraged the pre-built editor's functionality for handling content, without imposing additional restrictions on content size.
- **File Uploads**: Did not implement upload size cap, focusing on core features first and leaving advanced validations for future enhancements. I am using a temporary service to store the images and files.
- **Security**: Minimal focus on security at this stage to prioritize core functionality. Security considerations are earmarked for future iterations.
- **Testing**: Extensive testing planned for future development cycles.

## TODO List

1. **Add Upload Size Limit**

   - Implement validation to restrict file uploads to a maximum of 5MB.

2. **Enhance Security Measures**

   - Conduct a comprehensive security review.
   - Implement necessary security features like input sanitization, authentication, and authorization.

3. **Improve Testing Coverage**

   - Write extensive tests to cover edge cases and ensure robustness.
   - Implement end-to-end tests to validate the entire user flow.

4. **Refine User Interface**

   - Add functionality for resizing content blocks.
   - Implement shortcuts to improve the UX within the content editor.

5. **Performance Optimizations**

   - Optimize image and video handling for better performance.
   - Implement caching strategies for faster load times.

6. **Documentation**
   - Expand documentation to include API usage, and contribution guidelines.
