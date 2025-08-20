# News Aggregation Platform - Frontend

## Overview
This is a React-based frontend for a news aggregation platform that focuses on fact-checking and source reliability. The platform allows users to browse news articles, submit fact-checking requests, and view source reliability scores.

## Demo Data
The application includes comprehensive demo data that displays automatically when:
- The backend API is not available
- The API returns empty results
- There are network errors

### Demo Data Features
- **8 Sample Articles** across different categories (Technology, Politics, Health, Sports)
- **Realistic Content** with proper formatting and metadata
- **Source URLs** that link to example websites
- **Reliability Scores** to demonstrate the fact-checking system
- **Categories and Tags** for filtering and organization

### Demo Data Structure
Each demo article includes:
- Title and description
- Source information
- Publication date
- Reliability score
- Category classification
- Read time estimation
- Source URL for external links

## Components with Demo Data

### 1. NewsFeed Component
- **Location**: `src/page/NewsFeed.jsx`
- **Demo Data**: 8 articles with full content
- **Features**: Filtering, sorting, search functionality
- **Fallback**: Automatically shows demo data if API fails

### 2. ArticleCard Component
- **Location**: `src/components/ArticleCard.jsx`
- **Demo Data**: Built-in fallback for individual cards
- **Features**: Responsive design, hover effects, click handling

### 3. FactCheckingInterface Component
- **Location**: `src/components/FactCheckingInterface.jsx`
- **Demo Data**: Mock fact-checking requests and verifications
- **Features**: Submission forms, status tracking, evidence management

### 4. AdminDashboard Component
- **Location**: `src/page/AdminDashboard.jsx`
- **Demo Data**: Mock metrics and statistics
- **Features**: User management, content moderation, source management

### 5. Home Component
- **Location**: `src/page/Home.jsx`
- **Demo Data**: Testimonials, categories, trending topics
- **Features**: Landing page with animated elements

## How to Use Demo Data

### Automatic Display
Demo data is automatically displayed when:
1. The application starts up
2. API calls fail or return empty results
3. Network connectivity issues occur

### Manual Testing
You can test the demo data by:
1. Starting the application without a backend
2. Disconnecting from the internet
3. Using browser dev tools to simulate network failures

### Customizing Demo Data
Demo data is centralized in `src/data/demoData.js` and includes:
- Articles with realistic content
- User profiles and statistics
- Source information and reliability scores
- Categories and tags for organization

## Development Features

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Responsive grid layouts for articles
- Adaptive navigation and forms

### Interactive Elements
- Hover effects and transitions
- Click handlers for navigation
- Form validation and submission

### Error Handling
- Graceful fallbacks to demo data
- User-friendly error messages
- Loading states and spinners

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation
```bash
cd Frontend
npm install
```

### Running the Application
```bash
npm run dev
```

The application will start on `http://localhost:5173` and automatically display demo data.

### Building for Production
```bash
npm run build
```

## File Structure
```
src/
├── components/          # Reusable UI components
├── data/               # Demo data and mock content
├── page/               # Page components and routes
├── routes/             # Routing configuration
├── service/            # API services and authentication
└── assets/             # Static assets and images
```

## Demo Data Sources
All demo data is fictional and created for demonstration purposes:
- Article titles and content are realistic but not based on real news
- Source names are fictional news organizations
- URLs point to example.com and similar placeholder domains
- Dates are set to recent dates for relevance

## Contributing
When adding new features:
1. Include appropriate demo data
2. Ensure fallback behavior works without backend
3. Test with and without network connectivity
4. Update this README with new demo data features


<!-- password G7Fz2EOurI46nW8W -->
<!-- username hariomtruthseek -->