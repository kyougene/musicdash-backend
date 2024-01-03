...
# Music Dashboard Backend
...

## Deployment URL: https://solo-backend-b6ea6f5e7f39.herokuapp.com/
* The deployment is slightly more functional than the local version 

## Features

- View detailed insights into your Spotify listening history. (WIP)
- Discover personalized playlists and track recommendations. (WIP)
- Engage with a community of music enthusiasts and share your achievements. (WIP)
 

## Getting Started

Follow these steps to get the Music Dashboard backend up and running locally


### Prerequisites

- Node.js: Node must be installed


### Installation 

1. Clone the repository
2. Navigate to the project directory:
3. Install the required dependencies
   
   ```
   npm install
   ```

4. To interact with the your database and Spotify API, you'll need to set up your environment variables. Create a .env file in the root of the project and provide the necessary configuration. An example .env file might look like this:

   ```
   URL="your/frontend/url"
   SECRET="your session secret"
   CLIENT_ID="your Client Id From Spotify"
   CLIENT_SECRET="your Client Secret From Spotify"
   DATABASE_URL="your Database URL"
   ```
5. For Development run:

   ```
   npm run dev
   ```
6. For production run:

   ```
   npm run build
   npm start
   ```

### Built With: 
<div align="center">
	<code><img width="50" src="https://github.com/marwin1991/profile-technology-icons/assets/136815194/5f8c622c-c217-4649-b0a9-7e0ee24bd704" alt="Next.js" title="Next.js"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/183859966-a3462d8d-1bc7-4880-b353-e2cbed900ed6.png" alt="Express" title="Express"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" alt="Node.js" title="Node.js"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/117208740-bfb78400-adf5-11eb-97bb-09072b6bedfc.png" alt="PostgreSQL" title="PostgreSQL"/></code>
	<code><img width="50" src="https://user-images.githubusercontent.com/25181517/202896760-337261ed-ee92-4979-84c4-d4b829c7355d.png" alt="Tailwind CSS" title="Tailwind CSS"/></code>
</div>

## ISSUES AND NOTES
* Directly accessing the backend endpoints successfully retrieves data from spotify's API
