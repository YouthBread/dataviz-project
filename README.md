This is the final project for Data visualization course WPI 2017Fall.

In this project, I'll dedicate to visualize the sports career of Kobe Bryant. I'll map all his shots and add some statistical analysis for different season.


## Kobe Shots
![kobe](http://www.thatsmags.com/image/view/201603/Kobe-Bryant.jpg)
This data is from [Kobe Bryant Shot Selection](hhttps://www.kaggle.com/c/kobe-bryant-shot-selection/). This is a kaggle playgroup event. The data contains the location and circumstances of every field goal attempted by Kobe Bryant took during his 20-year career. Your task is to predict whether the basket went in.
The data contains the location and circumstances of every field goal attempted by Kobe Bryant took during his 20-year career. The dataset has these columns:

- Describe shot zone and action type:
  - Action_type, combined_shot_type
  - Shot_type, shot_zone_area, shot_zone_basic, shot_zone_range
  - Shot_distance, shot_made_flag
- Describe shots position on the court:
  - Lat, loc_x, loc_y, lon
Describe game info:
  - Game_event_id, game_id
  - period, playoffs
  - season
  - Minutes_remaining, seconds_remaining
  - Team_id, team_name, game_date, matchup, opponent


## Implementation
Current version has a basketball court and a basic stats table but has an interaction feature of selecting different season that Kobe played.
![beta](https://github.com/YouthBread/kobe-bryant-dataviz-project/blob/master/other_resource/pic.png)
The page will be constantly modified and updated with new visualization part.



## Development
For this project, I'm using `python -m http.server` for building local site and testing the codes.


## Reference
The Slider is referencing [Andrew Wang's](https://bl.ocks.org/wonga00) block [Chart Slider](https://bl.ocks.org/wonga00/1e2e28b19129637ff41b986cf0a05aba/68a0f03be6aeefb1f6d008041366fa20542862ed)

The function that I use to draw the arc of the court is referencing [virajsanghvi/d3.basketball-shot-chart](https://github.com/virajsanghvi/d3.basketball-shot-chart).

The size of the court is referencing [Basketball Court Dimensions & Measurements](http://www.courtdimensions.net/basketball-court/index.php)

The player season stats if referencing [Basketball reference](https://www.basketball-reference.com/players/b/bryanko01.html)
