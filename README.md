# Project Overview

This web application allows users to interact with Pokémon data through the **PokéAPI**. Users can search for Pokémon by name, save their favorites, and toggle between light and dark themes for a more personalized experience. The app is built using **Next.js** for its React framework and **Docker** for containerization, ensuring a smooth setup both locally and in production environments.

---

## Key Features

1. **Pokémon Search**:
   - Users can search for Pokémon by name using the **PokéAPI**.
   - Display essential details such as names, images, types, and stats.

2. **Favorites List**:
   - Users can save their favorite Pokémon to a personalized list.
   - View saved favorites on a section.

3. **Theme Toggling**:
   - Option to switch between **light** and **dark** themes.
   - Provides a more comfortable and user-centric experience, adapting to user preferences.

4. **Pagination**:
   - Implemented pagination to manage the display of Pokémon search results.
   - Enhances user experience by breaking down large sets of data into manageable pages.

5. **Containerization with Docker**:
   - The application is packaged using **Docker**, allowing easy setup and deployment.
   - Can be run in any Docker-supported environment, ensuring portability and ease of deployment.

---

## Tech Stack

- **Next.js** for the frontend framework.
- **PokéAPI** for accessing Pokémon data.
- **Docker** for containerizing the application, enabling flexible deployment options.
  
This version of the app is simpler compared to the more optimized version of the **Poke Now** app, focusing on core functionalities like searching, saving favorites, and switching themes.

---

## Potential Future Enhancements

- **User Authentication** to enable saving Pokémon on a user profile.
- **Advanced Search Filters** to allow searches by Pokémon type, abilities, or other attributes.
- **Performance Optimizations** like lazy loading components
- **Implement functionality to persist the user's favorite Pokémon using **localStorage**, allowing favorites to be saved across sessions.
- **Custom Hook Logic for Local Storage** Create a custom React hook to manage interactions with **localStorage**, abstracting the logic for saving and retrieving pokemons .
- **Fetch Data**: Add features like fetching additional data for each Pokémon, such as abilities, stats, and evolutions, to enrich the user experience.
- **Skeleton UI Screens**: - Implement **skeleton loading screens** to enhance the UI experience while fetching data, improving perceived performance.
  
---

### Prerequisites

Make sure you have the following installed:

1. [Docker](https://docs.docker.com/get-docker/)
2. [Docker Compose](https://docs.docker.com/compose/install/)

---

### Running the Application Locally

Follow these steps to run the application locally:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/AndresPastrana/pokesearch.git
   cd pokesearch
   ```

2. **(Optional) Ensure Dependencies Are Up to Date**:
    If you're developing outside Docker, install dependencies with:

    ```bash
    pnpm install
    ```

3. **Run with Docker Compose**:
   Build and start the application using Docker Compose:

   ```bash
   docker-compose up -d
   ```

4. **Access the Application**:
   Once the application is running, open your browser and navigate to:

   ```
   http://localhost:3000
   ```

---

### File Structure

Below is a brief overview of the file structure:

```plaintext
├── .dockerignore   # Files to exclude from the Docker build
├── Dockerfile      # Docker configuration for the app
├── docker-compose.yml # Docker Compose configuration
├── package.json    # Project dependencies
├── pnpm-lock.yaml  # Lock file for dependencies
├── public/         # Static files (e.g., images, fonts)
├── app/          # Next.js pages
├── components/     # Reusable React components
├── .template.example    # Example environment variables
└── README.md       # Project documentation
```

---

### Environment Variables

You can configure environment variables by creating a `.env` file in the root directory. Use `.env.template` as a reference.

```plaintext
NEXT_PUBLIC_API_URL=http://api.example.com
```

---

### Useful Commands

- **Start Development Server**:

  ```bash
  pnpm run dev
  ```

- **Build for Production**:

  ```bash
  pnpm run build
  ```

- **Start Production Server**:

  ```bash
  pnpm start
  ```

---

### Troubleshooting

- **Issue**: Container fails to start.
  - **Fix**: Ensure Docker is running and the `.dockerignore` file excludes `node_modules`.

- **Issue**: Port conflicts.
  - **Fix**: Update the exposed port in `docker-compose.yml` or shut down other applications using the same port.

---

### Contributions

Contributions, issues, and feature requests are welcome! Feel free to open an issue or a pull request.

---

### License

This project is licensed under the [MIT License](LICENSE).

---

### Author

Created by [Andres Pastrana]
