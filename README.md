This is a donation website created for a competition. It is built upon Next 13 + Typescript (app directory). It is currently hosted [here](www.hoohle.com)



## Running the server locally
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Most important libraries used
- [TailwindCSS](https://tailwindcss.com/) : Handles most of the website's CSS
- [Shadcdn/UI](https://ui.shadcn.com/docs/components/accordion) : Used to create small reusable UI pieces that are properly animated (accordion component, toaster handling notification of a new donation etc.) You will find all of Shadcdn's components in /src/components/ui
- [React Spring](https://www.react-spring.dev/docs/getting-started) : Used to animate different components (for example the loading circle animation, the adding of a new donor in the donor list etc.)
- [React Hook Form](https://www.react-hook-form.com/) : Manages the forms that the user needs to input data in 
- [Zod](https://zod.dev/) : Validation library. Used to validate form data on submit and some backend API routes
- [Jotai](https://jotai.org/docs/introduction) Very simple global state manager for React. Used to share things like the website theme across components


## Project Structure
This is the current structure of the */src* directory 

- `App` Includes all the website's route alongside and every static asset that should be sent
    - `api` All of the backend API routes
        - `checkout-session`Handles creating a stripe checkout
        - `mock` Mock data. meant to simulate fetches relating to donors or donation goal metadata
- `Components`Includes all created React's components
    - `ui` All of the generated shadcn's components
    - `homepage` All of the components meant to exist only on the homepage of the website
        - `PageSections` The big sections that the page is divided in
- `Constants` Includes all of the constant elements (JSON files, typescript definitions etc.) that a project has
- `Lib` All of the functions used by multiple files
    - `Fetches` All of the fetching functions and the related helper functions used across the site
    - `Utils` Niche utility functions