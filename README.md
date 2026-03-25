# Assailing Falcons Aerodesign Team Website

This is a React-based website for the Assailing Falcons Aerodesign team. It showcases team information, projects, galleries, and sponsorship opportunities.

## Prerequisites

- Node.js (v14+)
- npm (v6+)

## Initial Setup

```bash
npm install
```

## Available Scripts

### Development

#### `npm start`
Runs the app in development mode.
- Opens [http://localhost:3000](http://localhost:3000) automatically
- Hot reloads when you make changes
- Shows lint errors in the console

```bash
npm start
```

#### `npm test`
Launches the test runner in interactive watch mode.

```bash
npm test
```

### Production Build

#### `npm run build`
Builds the app for production to the `build` folder.
- Minifies and bundles all code
- Optimizes images and assets
- Ready for deployment

```bash
npm run build
```

#### `npm run deploy`
Deploys the built app to GitHub Pages (requires gh-pages setup).

```bash
npm run deploy
```

## Editing Content

### Edit Team Data

All text content is stored in [src/data.js](src/data.js). To update:

1. Open `src/data.js`
2. Modify the following objects:
   - `TEAM_INFO` - Team name, logo, contact details, social links
   - `HERO_DATA` - Homepage hero section
   - `PROJECTS_DATA` - Project information and gallery
   - `SPONSORS` - Sponsor listings
   - `HIGHLIGHTS` - Team highlights and achievements
   - `TEAM_MEMBERS` - Team roster (if available)
   - `CONTACT_INFO` - Contact page information

3. Save the file - changes will hot-reload in development mode

Example:
```javascript
export const TEAM_INFO = {
  name: "Assailing Falcons",
  email: "assailingfalcons@vit.ac.in",
  phone: "+91 98250 55701",
  // ... other fields
};
```

## Managing Images

### Add Pictures

1. Place high-resolution images in `public/images/all/` folder
2. Supported formats: JPG, JPEG, PNG
3. Name images clearly without size suffixes (e.g., `project-photo.jpg`, not `project-photo-800.jpg`)
4. Generate optimized versions (see next section)

For sponsor logos, place them in `public/images/sponsors/`

### Generate Optimized Images (Low-res Versions)

The `generate-images.js` script creates optimized versions of your images for different screen sizes and formats:

```bash
npm run generate-images
```

This automatically:
- Creates low-res versions at 400px, 800px, and 1600px widths
- Generates WebP format variants for better compression
- Generates thumbnail images (320px)
- Outputs to `public/images/all/` and `build/images/all/`

**Run this script every time you add or update images before deploying.**

### Image Workflow

1. Add high-resolution image to `public/images/all/`
2. Run: `npm run generate-images`
3. Update image paths in [src/data.js](src/data.js) or components to use the generated variants
4. The LazyImage component will automatically load the right resolution based on device

## Debugging

### Development Mode
- Keep `npm start` running in a terminal
- Use browser DevTools (F12) to inspect elements and debug
- Check console for React and lint warnings
- Changes auto-reload as you edit files

### Common Issues

- **Images not showing**: Run `npm run generate-images` after adding images
- **Port 3000 in use**: Change port with `PORT=3001 npm start`
- **Git Pages deploy fails**: Ensure `homepage` in package.json matches your repo URL

### Check Image Paths
Run helper scripts to validate image paths:

```bash
node ./scripts/check-image-paths.js
node ./scripts/fix-image-extensions.js
```

## Deployment

### Deploy to GitHub Pages

1. Ensure `homepage` in `package.json` is set correctly:
   ```json
   "homepage": "https://assailingfalcons.in"
   ```

2. Build and deploy:
   ```bash
   npm run build
   npm run deploy
   ```

3. Or in one step:
   ```bash
   npm run predeploy && npm run deploy
   ```

4. After steps 2 or 3:
   - 1. Check: GitHub repo -> Actions.
         Wait till "pages build and deployment" is complete.

   - 2. GitHub repo -> Settings -> Pages (Left Pane) -> Custom Domain
         Enter custom domain:
         ```bash
            npm run build
         ```

### Deploy to Custom Server

1. Build the app:
   ```bash
   npm run build
   ```

2. The `build/` folder contains all production files - upload these to your server

3. Make sure your server is configured to route all requests to `index.html` for client-side routing to work

## Learn More

For more information:
- [React Documentation](https://reactjs.org/)
- [Create React App Documentation](https://facebook.github.io/create-react-app/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [Sharp Image Processing](https://sharp.pixelplumbing.com/)
