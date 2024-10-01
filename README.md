# Intelligent Air Quality Monitoring System v2 (Frontend)

## [System Backend](https://github.com/Wuchieh/IntelligentAirQualityMonitoringSystem)

English | [繁體中文](README_tw.md)

<a href="https://github.com/wuchieh"><img src="public/Logo/Ico/LogoWhile.ico" alt="wuchieh" style="height: 100px;"></a>
&emsp;
<a href="https://github.com/MeowXiaoXiang"><img src="https://github.com/MeowXiaoXiang.png" alt="MeowXiaoXiang" style="height: 100px;"></a>

## Authors
- [Wuchieh](https://github.com/wuchieh)
- [MeowXiaoXiang](https://github.com/MeowXiaoXiang)

## Technology Stack
- Bootstrap v5.2.3
- Google Maps JavaScript API
- Vue.js v3
- Vue Router
- Vue I18n
- Axios

## Requirements
- Web Browser

## Features
- Mark the location of the monitoring station on the map
- Display air quality data from monitoring stations
- Ability to change language (Traditional Chinese, English)
- Identity Verification
- Display the user's settings

## Installation

### Prerequisites
- Install [Node.js](https://nodejs.org/) (version 14 or later)

### Steps
1. Move to the project's directory in the command line tool.
2. Enable Corepack:
   ```sh
   corepack enable
   ```
3. Prepare and activate the specific version of Yarn:
   ```sh
   corepack prepare yarn@3.6.0 --activate
   ```
4. Install the necessary packages:
   ```sh
   yarn install
   ```

## Configuration

1. Replace the `apiKey` in `src/components/Map.vue` at line 169 with your own Google Maps JavaScript API key.
2. Enable the Maps JavaScript API and Places API in your Google Cloud project.

## Running the Application

To start the front-end web preview mode, use the following command:
```sh
yarn dev
```

To build the application for production, use the following command:
```sh
yarn build
```
This will generate the production-ready files in the `dist` directory. You can then serve these files using your preferred web server.

### Explanation
- `corepack enable`: Enables Corepack, which is a tool for managing package managers like Yarn.
- `corepack prepare yarn@3.6.0 --activate`: Prepares and activates Yarn version 3.6.0.
- `yarn install`: Installs all the dependencies listed in the [`package.json`]
- `yarn dev`: Starts the development server for the front-end application.
- `yarn build`: Builds the application for production and outputs the files to the `dist` directory.

## Screen Preview
![indexAnnouncements_en.png](imgs/indexAnnouncements_en.png)
![Login_en.png](imgs/Login_en.png)