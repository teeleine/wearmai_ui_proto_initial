# WearMai UI Prototype

A modern, responsive UI prototype for the WearMai mobile application, built with React and TypeScript.

## Project Overview

This repository contains the frontend implementation of the WearMai mobile application UI prototype. The project is built with modern web technologies and follows best practices for component architecture and state management.

## 🚀 Project Context – Refined Back-End Prototype
This repository houses the second, improved version of the back-end system built for the LLM-based running coach interface. Like the initial prototype, it was developed in Python and supports both Gemini and OpenAI models, with extensibility for other LLMs.

This refined version incorporates direct feedback from users of the initial prototype, addressing key issues such as model accuracy, interaction flow, and feedback clarity. Enhancements include:

Speech recognition support

Improved LLM response quality

Cleaner, more structured feedback outputs

Basic data visualisation capabilities

The prototype serves as a testbed for enhanced interaction between time-series running data and LLM-generated coaching responses, aiming to improve the quality and contextual relevance of system feedback.

It was created to evaluate how the improved features perform in comparison to the first prototype, and to iteratively advance the LLM-runner communication interface based on user-centered design principles.

## Tech Stack

- **Vite** - Next Generation Frontend Tooling
- **TypeScript** - Type-safe JavaScript
- **React** - UI Library
- **shadcn-ui** - Re-usable components built with Radix UI and Tailwind CSS
- **Tailwind CSS** - Utility-first CSS framework

## Project Structure

```
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components and routing
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions and configurations
│   ├── App.tsx        # Main application component
│   └── main.tsx       # Application entry point
├── public/            # Static assets
├── index.html         # HTML entry point
└── configuration files
    ├── tailwind.config.ts
    ├── tsconfig.json
    ├── vite.config.ts
    └── postcss.config.js
```

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm (comes with Node.js)

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm i

# Start the development server
npm run dev
```

The development server will start at `http://localhost:8080` by default.

## Development Workflow

### Local Development

1. Create a new branch for your feature
2. Make your changes
3. Test locally using `npm run dev`
4. Commit your changes
5. Create a pull request

### Code Style and Quality

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Component-based architecture
- Responsive design principles

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is proprietary and confidential.

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.
