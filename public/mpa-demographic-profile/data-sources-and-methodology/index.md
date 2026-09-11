## Title VI Population Data Sources

Population data are reviewed regularly to ensure that CCRPC/CUUATS continues to meet the requirements of the Title VI program. CCRPC/CUUATS has gathered demographic and statistical data on race, ethnicity, poverty status, disability status, English proficiency, sex, and age of residents in the MPA through Census data and self-identification on questionnaires. CCRPC/CUUATS uses this in transportation planning for the following reasons:

<ol>
<li>To determine impacts and benefits of potential projects on minority and low income neighborhoods;</li>
<li>To ensure staff is collecting input from a representative sample of the population; and</li>
<li>To develop public outreach strategies.</li>
</ol>

### US Census Data

This report relies on the US Census for consistent data on area demographics and transportation behavior. Census results for the urban areas were taken from <a href="https://data.census.gov/">data.census.gov</a>. Results for the block groups used a new QGIS plug-in tool developed in-house called the Census Data Downloader. This tool uses <a href="https://www.census.gov/data/developers/data-sets.html">US Census APIs</a> to extract Census data at difference geography levels directly into GIS maps used for the block group demographic analysis. 

This report uses the 2018-2022 five-year American Community Survey estimates as the most recent and reliable data source for the study area, also known as the Metropolitan Planning Area (MPA). However, since the MPA is not a boundary defined by the Census, Census data boundaries do not correspond directly to the MPA boundary. For that reason, CUUATS relies on Census Urban Area boundaries and Block Group boundaries to represent the MPA in this report. The definitions of each geography type are provided below.

<style>
.pquote {
    float: right;
    width: 300px;
    background: #3399CC;
    color: #ffffff;
    font-weight: bold;
    padding: 13px;
    margin: 0 13px 13px 0;
}

blockquote {
    margin: 0; /* gets rid of the default blockquote margin */
}
</style>

### Block Groups

<aside class="pquote">
    <blockquote>
        <p>Block Groups are smaller divisions of census tracts whose data provide the greatest available detail for each Title VI demographic group.</p>
    </blockquote>
</aside>Block groups are statistical divisions of census tracts, generally defined to contain between 600 and 3,000 people, and are used to present data and control block numbering. Block groups allow users to see data at a smaller scale within the municipalities in the MPA,
but the units get larger outside of urban areas where the population is more spread out. Block group data tends to be better for CUUATS' analysis as the smaller geographical areas covered allow for the greatest demographic detail on which areas may require greater attention.


### Urban Areas

Before 2020, the Census identified two types of highly populated areas: urban clusters and urbanized areas. As of the 2020 Census, the Census now only defines one type of area, which is called an urban area. From the <a href="https://www.census.gov/programs-surveys/geography/guidance/geo-areas/urban-rural.html#:~:text=To%20qualify%20as%20an%20urban,population%20of%20at%20least%205%2C000">US Census Bureau</a>, "to qualify as an urban area, the territory identified according to criteria must encompass at least 2,000 housing units or have a population of at least 5,000."


<aside class="pquote">
    <blockquote>
        <p>Urban Areas are areas that have at least 5,000 people or at least 2,000 housing units whose data can provide a reasonable summary of regional trends.</p>
    </blockquote>
</aside>

With this new definition, Champaign-Urbana qualifies as an urban area; this area includes the Cities of Champaign and Urbana as well as the Villages of Savoy and Bondville. The Village of Mahomet is its own separate urban area. The Census defines Mahomet as being too far away from the Champaign-Urbana urban area to be geographically combined. However, as CUUATS considers any impacts of geographic growth to the municipal boundaries in the region, CUUATS incorporates the Villages of Mahomet and Tolono into its Metropolitan Planning Area. See the map below for details.


While the urban areas represent only a portion of the land area in the MPA, they contain the vast majority of residents. Table 1 shows that the population of the urban areas combined equals nearly 95 percent of the population of the MPA block groups combined. <b> It should be noted that this report uses block group data to visualize the data spatially in the Title VI Access Score analysis and uses urban area data to communicate the regional data in the Demographic Overview section.</b> With one exception, Tables 3 & 4 use both block group and urban area data, and the different populations are noted.

 <iframe src="https://maps.ccrpc.org/mpa-cuuats-and-municipal-boundaries/" 
    width="100%" height="700" allowfullscreen="true"> 
    Map of the metropolitan planning area, CUUATS, and municipal boundaries. 
    </iframe> 


<rpc-table 
url="MPA_Pop_BG_v_UA.csv" 
text-alignment="1,r" 
table-title="Table 1. 2017 MPA Population, Census Block Groups v. Urban Areas" 
switch="false" 
source-url="https://data.census.gov/table?q=B01001:%20Sex%20by%20Age&g=010XX00US_040XX00US17_400XX00US15211,53416" 
source="US Census Bureau 2018-2022 ACS 5-Year Estimates, Table B01001">
</rpc-table>
    

### Access Score

CUUATS staff developed a geography-neutral, multi-modal accessibility assessment tool known as Access Score. <a href="https://www.ccrpc.org/planning/sustainable_neighborhoods_toolkit.php">Access Score</a> answers questions about how easy it is to reach common destinations using four modes of transportation: pedestrian, bicycle, bus, and vehicle. This tool applies travel times and level of traffic stress (LTS) assessments for each mode of transportation to calculate accessibility scores to several destination types. These accessibility scores help staff to assess the current and potential future status of accessibility in the Champaign-Urbana region, identify areas in need of improvement, and observe potential benefits of new infrastructure. 

To develop Access Score, staff used an existing bicycle level of traffic stress (BLTS) assessment methodology from the Mineta Transportation Institute, and an existing pedestrian level of traffic stress (PLTS) assessment methodology from the Oregon Department of Transportation. The pedestrian and bicycle infrastructure data comes from the CUUATS Sidewalk Explorer 2018 database for the Champaign Urbana Urbanized Area (which excludes the Village of Mahomet) and the CUUATS Champaign County Greenways and Trails database, respectively. Automobile level of traffic stress (ALTS) is assessed using an in-house analysis, created by CUUATS staff to emulate the assessments for BLTS and PLTS, by considering elements of the automobile transportation network and its interactions with other modes. 

In each of these levels of traffic stress assessments, network infrastructure characteristics were assessed and assigned a level of stress, one being the lowest stress and four being the highest. Each segment in the network was assigned an overall level of stress based on the highest, or most stressful score it received for any one of the characteristics considered. 

Transit trips were assessed using the Pandana accessibility tool, which uses general transit feed specification (GTFS) data and transit headway and schedule data to assess transit trips based on the time required to reach a destination. This was then combined with the pedestrian score associated with the trip required to get from the point of origin to the nearest bus stop. Areas in the MPA where passengers had to walk greater distances to reach bus stops received low scores, as well as areas where transit travel time to destinations were higher. The public transit data comes from the Champaign Urbana Mass Transit District (MTD) fall 2023 weekday route schedule. 

Once the modal LTS scores were complete, accessibility was calculated by multiplying the LTS scores by the travel time. The assessment includes accessibility to ten different destination types- grocery stores, health facilities, jobs, parks, public facilities, retail stores, restaurants, schools, arts and entertainment, and services. Ultimately, Access Score produces separate scores for pedestrian, bicycle, transit, and vehicle access as well as an overall score that is an average of the four mode-specific scores for most roadway segments in the MPA.

### USDOT Equity and Justice40 Tools

Both the Justice 40 Initiative and the BIL look to provide greater investment and connection for historically disadvantaged and underserved communities. Part of USDOT’s investment has created the <a href= "https://www.transportation.gov/priorities/equity/justice40/etc-explorer"> Equitable Transportation Community (ETC) Explorer </a>, an interactive web application that “uses 2020 Census Tracts and data, to explore the cumulative burden communities experience, as a result of underinvestment in transportation, in the following five components:  Transportation Insecurity, Climate and Disaster Risk Burden, Environmental Burden, Health Vulnerability, and Social Vulnerability”.<sup><a href="#fn1" id="ref1">1</a></sup> Similarly, the U.S. Council on Environmental Quality has a <a href="https://screeningtool.geoplatform.gov/en/#3/33.47/-97.5">Climate and Economic Justice Screening Tool (CEJST) </a>, which identifies areas in the U.S. that face significant climate, environmental, health, and socioeconomic burdens. This tool specifically identifies census tracts that experience undue hardship in regard to environmental justice.

As recipients of federal transportation funding, CUUATS seeks to support implementation of the BIL in all its planning processes including the Title VI Program. CUUATS can use the data from the Title VI program to help prioritize projects and strategies toward providing a transportation system that is equitable.

### Methodology for Title VI Analysis

Title VI group access scores are calculated by averaging the scores of the block groups in the MPA with average and above average rates of each group population. Since the margin of error for this data is unknown, access scores are listed as a range, instead of a specific number. The ranges cover intervals of ten from 0 to 100, representing the possible Access Scores (e.g. 0-9,10-19, etc.), and the averages are rounded to the nearest whole number to determine the range. The overall transportation network access score is an average of the pedestrian, transit, bicycle, and vehicle access scores.

CUUATS staff aggregated and averaged the roadway segment scores in order to compare different levels of transportation access at the Census block group level throughout the MPA. Block groups were identified for each Title VI population at or above the regional level, and averages for the identified block groups were taken to determine relative access by demographic population by mode.

<hr>

<sup id="fn1">1. <a href="https://www.transportation.gov/equity-Justice40"> Justice40 Initiative. </a> US Department of Transportation. <a href="#ref1" title="Jump back to footnote 1 in the text.">↩</a></sup>