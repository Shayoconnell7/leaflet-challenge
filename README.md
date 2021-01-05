
1. **Get the data set**

   The USGS provides earthquake data in a number of different formats, updated every 5 minutes. I chose a dataset from [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) to visualize.

2. **Import & Visualize the Data**

   I created a map using Leaflet that plots all of the earthquakes from my chosen data set based on their longitude and latitude.

   * The data markers reflect the magnitude of the earthquake in their size and color. Earthquakes with higher magnitudes appear larger and darker in color.

   * I also included popups that provides additional information about the earthquake when a marker is clicked.

   * I created a legend that provides context for the magnitude coloration map data.
