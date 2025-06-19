# WearMai UI Prototype

A modern, responsive UI prototype for the WearMai mobile application, built with React and TypeScript.

## Project Overview

This repository contains the frontend implementation of the WearMai mobile application UI prototype. The project is built with modern web technologies and follows best practices for component architecture and state management.

## 🎨 Project Context – Initial UI Prototype
This repository features the exploratory, mid-fidelity UI prototype for the runner coaching interface, built using React, Tailwind CSS, and CDN-based libraries.

The goal of this version was to rapidly prototype and test various screen layouts, interaction flows, and information hierarchies. The interface includes over 11 distinct screens with multiple variants, enabling users to engage with an interactive wireframe that simulates the coaching experience.

This version was intentionally exploratory — focusing on:

Information architecture

Visual hierarchy

Component structure

Tone of feedback presentation

It allowed for quick iteration based on user input, helping the research team gather early insights into usability and interface preferences before committing to high-fidelity development.

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
