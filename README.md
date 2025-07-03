# Event Listing Application

A modern web application for browsing and filtering event listings built with Next.js, TypeScript, and Tailwind CSS.

## Project Overview

This application provides a clean, responsive interface for users to browse through events, filter them by various criteria, and view detailed information about each event. The project demonstrates modern React patterns, TypeScript integration, and responsive design principles.

### Key Features

- **Event Browsing**: Browse through a collection of events with image previews
- **Advanced Filtering**: Filter events by location, date, category, and price range
- **Search Functionality**: Search for events by title, description, or tags
- **Detailed Event Pages**: View comprehensive information about each event
- **Responsive Design**: Optimized for all device sizes

## Approach

The application is built using the following approach:

1. **Component-Based Architecture**: Modular components for better maintainability and reusability
2. **Static Site Generation**: Leveraging Next.js SSG capabilities for performance
3. **Type Safety**: TypeScript for improved developer experience and code quality
4. **Responsive UI**: Mobile-first design approach with Tailwind CSS
5. **Data Management**: JSON data source with efficient filtering and search algorithms

## Folder Structure

```
event-listing/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── button.tsx      # Button component with variants
│   │   ├── eventCard.tsx   # Event card component for listings
│   │   └── filter.tsx      # Filter component for search/filtering
│   ├── data/
│   │   └── data.json       # Mock event data
│   ├── lib/
│   │   └── event.ts        # Event-related utility functions
│   ├── pages/
│   │   ├── api/            # API routes
│   │   ├── events/
│   │   │   └── [id].tsx    # Dynamic event detail page
│   │   ├── _app.tsx        # Custom App component
│   │   ├── _document.tsx   # Custom Document component
│   │   └── index.tsx       # Home page with event listings
│   ├── styles/
│   │   └── globals.css     # Global styles and Tailwind imports
│   └── types/
│       └── event.ts        # TypeScript types for events
├── next.config.ts          # Next.js configuration
├── package.json            # Project dependencies
└── tsconfig.json           # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm, yarn, or pnpm package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/BhattAnsh/eventListing.git
   cd eventListing
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Building for Production

To create an optimized production build:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

To start the production server:

```bash
npm run start
# or
yarn start
# or
pnpm start
```

## Future Improvements

With additional time, the following improvements could be implemented:


1. **Event Registration**: Implement a complete registration flow for events
2. **Event Creation**: Enable users or admins to create and manage events
3. **Favorites/Bookmarks**: Allow users to save events for later viewing
4. **Advanced Search**: Implement more advanced search capabilities with filters

## Technologies Used

- **Next.js**: React framework for server-rendered applications
- **TypeScript**: For type safety and better developer experience
- **Tailwind CSS**: For utility-first styling
- **React**: For building the user interface
- **Static Site Generation**: For performance and SEO benefits
