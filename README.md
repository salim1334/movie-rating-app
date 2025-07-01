# MovieMuse 🎬

A modern, responsive movie discovery and rating application built with React, TypeScript, and Tailwind CSS.

![MovieMuse Screenshot](https://via.placeholder.com/800x400/1A1F2C/9b87f5?text=MovieMuse+Screenshot)

## ✨ Features

- **🔍 Movie Search**: Real-time search powered by OMDB API
- **📱 Responsive Design**: Optimized for mobile and desktop
- **⭐ Personal Ratings**: Rate movies 1-5 stars
- **📚 Watchlist Management**: Save and organize watched movies
- **🎨 Modern UI**: Beautiful dark theme with smooth animations
- **⚡ Fast Performance**: Built with Vite for optimal loading
- **🔒 Local Storage**: Persistent user data

## 🛠️ Technologies Used

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **State Management**: TanStack Query (React Query)
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **API**: OMDB API for movie data
- **Icons**: Lucide React
- **Notifications**: Sonner

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd movie-muse-archive
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
```

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
- Connect your GitHub repository
- Build command: `npm run build`
- Publish directory: `dist`

### GitHub Pages
```bash
npm run deploy
```

## 🎯 Key Features Implementation

### Movie Search
- Real-time search with debouncing
- Pagination support
- Error handling for API failures

### Watchlist Management
- Local storage persistence
- Add/remove movies
- Personal rating system
- Visual indicators for watched movies

### Responsive Design
- Mobile-first approach
- Adaptive grid layouts
- Touch-friendly interactions

## 🔧 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Layout.tsx      # Main layout component
│   ├── MovieCard.tsx   # Movie card component
│   ├── MovieDetail.tsx # Movie detail modal
│   └── SearchBar.tsx   # Search functionality
├── pages/              # Page components
├── services/           # API and data services
├── types/              # TypeScript type definitions
├── hooks/              # Custom React hooks
└── lib/                # Utility functions
```

## 🎨 Design System

- **Primary Color**: `#9b87f5` (Movie Purple)
- **Background**: Dark gradient theme
- **Typography**: Clean, readable fonts
- **Animations**: Smooth fade-in effects

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [OMDB API](http://www.omdbapi.com/) for movie data
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Vite](https://vitejs.dev/) for fast development

---

**Built with ❤️ using modern web technologies**
