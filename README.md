# Wage Defenders

## Team Members: LaTisha Habersham, Manny Mejia, Alice Satori and Jack Griffin

![Min Wage](https://media.giphy.com/media/McTlbb1oyHvHm2ToXp/giphy.gif)

### Summary and Motivation
The purpose of the minimum wage was to stabilize the post-depression economy and protect the workers in the labor force. The minimum wage was designed to create a minimum standard of living to protect the health and well-being of employees.

Greater equity will be achieved, and the distribution of income between the high paid and the low pay may be narrowed. Poverty may be reduced as the low paid gain more income and the unemployed may be encouraged to join the labour market.
#### Situation
Wage Defenders decieded to review at the United States State and Federal minimum wage between 1970 - 2020. We wanted see how minimum wages increase over time as well as compare the minimum wage between the states.<br>

#### Task
1. Scripting: We gather our data from the following;<br>

    1. Minimum wage Data in the US by state: https://www.kaggle.com/lislejoem/us-minimum-wage-by-state-from-1968-to-2017?select=Minimum+Wage+Data.csv<br>
    2. US States Lat & Long: https://www.kaggle.com/washimahmed/usa-latlong-for-state-abbreviations<br>
    3. Total Personal Consumption Expenditures by State: https://apps.bea.gov/iTable/iTable.cfm?reqid=70&step=1&acrdn=7#reqid=70&step=1&acrdn=7<br>
    4. Shape File of United States: https://eric.clst.org/tech/usgeojson/

2. Scripting: We transform our data by using Python (Pandas) to create cleaner CSVs to help create our visualizations. Some of our transformations included;<br>
    1. Importing libraries
        1. Numpy<br>
        2. Pandas<br>
        3. Matplot<br>
        4. Json<br>
        5. SQLalchemy<br>
        6. Renaming columns<br>
        7. Scipy.stats<br>
        8. linregress<br>
        9. Plotly<br>
        10. Textwrap<br>
        11. Geopandas<br>
    2. Transformations
        1. Loading and Reading CSVs<br>
        2. Encoding<br>
        3. Dropping columns<br>
        4. Renaming colums<br>
        5. Merging<br>
        6. Boolean<br>
        7. Statistics<br>
3. Backend (Database Layer)<br>
    1. We imported our new dataframe into a SQL Database<br>
    
4. Backend (API Layer)<br>
    1. We used Flask API app to create our routes to deploy to a web sever. (HTML)<br>
    
5. Frontend (Data Visualization)<br>
    1. We were able to create the following visualization;<br>
        1. Chloropleth Map<br>
        2. Line Graph<br>
        3. Bar Graph<br>
        4. Time Line<br>

#### Action
(Link to notebooks here)<br>
(Link to python here)<br>

#### Results
(Link to picture of Chloropleth Map)<br>
(Link to picture of Line graph)<br>
(Link to picture of Bar Graph)<br>
(Link to picture of Time Line)<br>
