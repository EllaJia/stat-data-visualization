library(tidyverse)
library(sf)
library(tmap)

# (a)
data <- read_sf('data/GL_3basins_2015.dbf')
nrow(data)

largest <- data %>% 
  group_by(Sub_Basin) %>%
  top_n(1,Area)

largest['Latitude']
largest['Longitude']

# (b)
tm_shape(largest) +
  tm_polygons(title='lake',size = 0.1) +
  tm_layout(legend.outside = TRUE)+
  tm_facets("Sub_Basin") +
  tm_scale_bar(position = c("left", "bottom"))

# (C)
criteria <- data %>%
  filter(Latitude > 28.2 & Latitude < 28.4 & Longitude > 85.8 & Longitude < 86)

tm_shape(criteria) +
  tm_polygons(title='lake',size = 0.1)+
  tm_layout(legend.outside = TRUE)+
  tm_scale_bar(position = c("left", "bottom"))

