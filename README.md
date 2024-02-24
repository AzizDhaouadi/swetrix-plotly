# Project Title
A Custom Dashboard for Swetrix Analytics

# Description
This project creates a custom web dashboard to visualize data from Swetrix, a modern, open-source web analytics tool. Leveraging Express, JavaScript, and Plotly.js, the dashboard showcases various metrics essential for website performance analysis. Metrics include pageviews, unique visitors, session duration, bounce rate, average page speed, and traffic demographics.

## Getting Started

### Dependencies

* Node.js
* Express
* Node-fetch
* Dotenv
* Plotly.js (via CDN in the HTML file)

Ensure Node.js is installed on your machine. The project's dependencies are managed with npm, Node.js's package manager.

### Installing

1. Clone the repository to your local machine

``` bash
git clone <repository-url>
```
2. Navigate to the project directory and install the required npm packages

``` bash
cd <project-directory>
npm install
```

### Setup
Create a .env file in the root of your project directory. Add your Swetrix API key and other environment-specific variables:
``` bash
PORT=<application_port>
PROJECTID=<your_swetrix_application_id>
APIKEY=<your_swetrix_api_key>
```
Ensure to add the .env file to your .gitignore file to avoid exposing sensitive information.

## Running the Application
To start the server and launch the dashboard, run:
```bash
node index.js
```
Navigate to http://localhost:3000 in your web browser to view the dashboard.

## License
This project is licensed under the MIT License.

Feel free to customize the dashboard to include additional metrics or integrate with other data sources for a comprehensive overview of your web analytics.
