# Introduction

This is the final project for WPI CS573 Data Visualization. In this project, I'm dedicating to create interactive visualization focusing on a dataset. I dedicate to visualize the sports career of Kobe Bryant. I'll map all his shots and add some statistical analysis for different season.

![kobe](http://www.thatsmags.com/image/view/201603/Kobe-Bryant.jpg)

# Data Source

1. Shot Dataset

   This is the main dataset using in this project. This data contains all of the shots information for Kobe Bryant. Originally, I found this data from Kaggle's playground event, Kobe Bryant Shot Selection. But in this dataset, Kaggle had removed few thousands entries for the machine learning purpose. Then I use API provided by NBA Stats to obtain the complete dataset.

   The data is obtained from [Kaggle](https://www.kaggle.com/c/kobe-bryant-shot-selection/) and [NBA Stats](https://stats.nba.com/)

2. Injury Dataset

   Another data set that I use in this project is the Kobe Bryant injury transaction data. As we all know, as a professional sports player, the injury is one of the biggest factor to effect his performance. Combining the injury dataset with the other dataset will provide us an insight to how Injury influence Kobe's performance.

   The data is obtained from [Pro Sports Transactions](http://www.prosportstransactions.com/)

3. Season stats Dataset

   This data set is the usually seasonal stats you can find on TV while you are watching sports events.

   The data is obtained from [Basketball Reference](https://www.basketball-reference.com/players/b/bryanko01.html)

# Data Preprocessing

In this part, since injury dataset and season stats dataset have already been cleaned and well organized. All I have to deal with is the shot dataset from NBA stats. Unlike the dataset provided by Kaggle, the original data obtained via API had redundant information that we don't need for this project. So, in this phase, I deleted some columns that we won't use in future(e.g. the team name, player name, game id). In addition to that, I've added a new column to indicate the score this shot made based on the shot_made_flag attribute.

The remaining dataset will have the following columns,

- Describe shot zone and action type:
  - action_type, combined_shot_type
  - shot_zone_area, shot_zone_basic, shot_zone_range, shot_distance
  - Shot_distance, shot_made_flag, score
- Describe shots position on the court:
  - loc_x, loc_y
- Describe game info:
  - game_date, season, playoff
  - period, minutes_remaining, seconds_remaining
  - opponent

# Question & Task

- How Kobe’s shooting accuracy varies in different season?
- Did Kobe’s injuries effect on his performance?
- Are there any spatial patterns of Kobe’s shot(the transition of preferred area)?

# Visualizations

In order to solve these question, I've created contour map, line chart and scatter plot. And all of these visualizations can be controlled by buttons and slider. The layout for the page is the following,

![layout](https://github.com/YouthBread/kobe-bryant-dataviz-project/blob/master/other_resource/layout.png)

The left part is the contour map, stat table, control button and the slider bar. This part is floating which means while users scrolling down the website, this part will sticky on the left.

The right part is the text information and some line charts. The text will be the analysis based on the visualization.

**the content text inside the page is still being developed**

### Sketches

In the proposal, I've draw a first verion of sketch.

![Sketch](https://github.com/YouthBread/kobe-bryant-dataviz-project/blob/master/other_resource/sketch_v1.png)

After few weeks development, I've draw another verison of sketch.

![Sketch](https://github.com/YouthBread/kobe-bryant-dataviz-project/blob/master/other_resource/sketch_v2.png)

Both sketches play important role during the development of the whole project.\


### Interactions

In thir project, right now the main interaction is completed by using control buttons and slider. By clicking the button, the scatter plot and contour map will only display the kind of shot users want to see. By sliding the slider, users can change the default seaon. And the scatter plot, contour map and the line chart will be updated and displayed the data belongs to the season users choose.


### Basketball Court

One of the greatest way to help us visualizing the dataset is to map every shots on the court. The basketball court in this project has the most important role. Many interactions are based on the court canvas. In order to replicate the correct size court, I referenced  [Court Dimension Website](http://www.courtdimensions.net/basketball-court/index.php)

### Contour Map

In order to solve the question3, my design is to add a heat map on the back of the court. By changing the selection of different season, users can see the change of the heat map which will directly tells you where is the hot zone for Kobe.

![contour_map_prototype](https://github.com/YouthBread/kobe-bryant-dataviz-project/blob/master/other_resource/contour_map_prototype.png)

In the prototype, the contour map is controlled by the slider and by defaulting showing all of the shots. In the recent version, I've add control buttons for users to choose whether to display all shots or just those he missed or made.

![contour_map_final](https://github.com/YouthBread/kobe-bryant-dataviz-project/blob/master/other_resource/contour_map_final.png)

### Scatter Plot

Besides the contour map, I also added a very low opacity scatter plot to map each shot. In order to differentiate those shot Kobe made and those his missed, I used 2 different marks.

Also, by adding the control buttons, the scatter plot can support for users to choose whether to display all shots or just those he missed or made.

![beta](https://github.com/YouthBread/kobe-bryant-dataviz-project/blob/master/other_resource/scatter_plot_final.png)

### Stat Table

This is a simple table that can display the average information for certain fields in given season.

![beta](https://github.com/YouthBread/kobe-bryant-dataviz-project/blob/master/other_resource/stat_table.png)

### Line Chart

For this project, I've created some line chart for userss to take an insight into Kobe's performance in both season level and career level.

The first kind of line chart is the line chart that showing the career level stats. The given screenshot is showing the entire career Kobe's points per season.

![beta](https://github.com/YouthBread/kobe-bryant-dataviz-project/blob/master/other_resource/line_chart_stat.png)

In the future development for this kind of line chart, I'll add a drop down menu for userss to choose a different kind of stats that they want to see. As you can see that there is already a menu button displayed right beside the title of line chart.

The second kind of line chart is the line chart that showing the season level stats. The given screenshot is showing the entire season's points per game. Since Kobe is the showing guards, it will be more reasonable for us to pay more attention on the scoring ability per game of him.

In addition to that, as you can see, the line chart has some red line. Those red lines represents the injury happened in that season. And if you hovering on the red line, you can read the content for that injury.

![beta](https://github.com/YouthBread/kobe-bryant-dataviz-project/blob/master/other_resource/line_chart_score.png)

### Radar Chart

What’s more, I’d like to add a simple algorithm to compute the performance score for the player. As you can see from both video game and tv networks, people like scoring the player which can give you a direct sense of how well this player is playing. So I’d like to spend some time doing this work.

Rather than making prediction on winning rate, I’ll do a ranking on the past performance of the player for each season. When people see the stats for a basketball player, we are tend to see the big picture for him, the average points, average rebounds and average assists. What’s more, people also want to see the winning rate for the team. If we can quantify all this aspects and calculate a final score for the player, that will be a nice feature for this visualization project.

![beta](https://github.com/YouthBread/kobe-bryant-dataviz-project/blob/master/other_resource/radar_chart.png)

**the content inside the section is still being developed**

# Reference

- The Slider is referencing [Andrew Wang's](https://bl.ocks.org/wonga00) block [Chart Slider](https://bl.ocks.org/wonga00/1e2e28b19129637ff41b986cf0a05aba/68a0f03be6aeefb1f6d008041366fa20542862ed)
- The function that I use to draw the arc of the court is referencing [virajsanghvi/d3.basketball-shot-chart](https://github.com/virajsanghvi/d3.basketball-shot-chart).
- The size of the court is referencing [Basketball Court Dimensions & Measurements](http://www.courtdimensions.net/basketball-court/index.php)
- The player season stats is referencing [Basketball reference](https://www.basketball-reference.com/players/b/bryanko01.html)
- The debounce function is referencing [Stackoverflow Question](https://stackoverflow.com/questions/28773113/d3-event-is-null-inside-of-debounced-function)
- The radar chart is referencing [[Nadieh Bremer](http://bl.ocks.org/nbremer)’](http://bl.ocks.org/nbremer/21746a9668ffdf6d8242)



# Deployment

The project is built and tested using Python web server. After go to the root in this project folder, we can run the python command for building local web server

```
python -m http.server
```

# Enhancements

- Transition effect: Make you more comfortable exploring the visualizations
- Using front UI framework: Using Bootstrap for a modern display
- Better response time: Again, make you more comfortable exploring the visualizations



