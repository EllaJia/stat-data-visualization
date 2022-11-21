library(tidygraph)
library(tidyverse)
library(ggraph)
library(igraph)
library(shiny)
library(dplyr)
library(networkD3)
theme_set(theme_bw())

data <- read_csv("pass1.csv") %>%
  group_by(receiver, thrower, team, year) %>%
  filter(receiver != '0') %>%
  summarise(count = n()) %>%
  arrange(year, team, desc(count)) # sort by year, and then team, and then count
data

# combine the same pair of players link, (a, b) and (b, a) are considered the same
data1 <- data
data1$pair_col <- paste(data$receiver, data$thrower)

for (i in 1:nrow(data1)){
  temp = strsplit(data1$pair_col[i], " ")
  if (temp[[1]][1] > temp[[1]][2]){
    data1$pair_col[i] <- paste(temp[[1]][2], temp[[1]][1], collapse = ' ')
  }
}

data2 <- data1 %>%
  group_by(team, year, pair_col) %>%
  summarise(sum_count = sum(count)) %>%
  arrange(team, year, desc(sum_count)) %>%
  slice_max(order_by = sum_count, n = 10) %>%
  separate(pair_col, c('from', 'to'))
data2


# draw the graph
test_data <- data2 %>% 
  filter(team == "alleycats", year == 2021) %>%
  ungroup() %>% 
  select(from, to)
test_data

p <- simpleNetwork(test_data, height = "100px", width="100px",
                   Source = 1,
                   Target = 2,
                   linkDistance = 10,
                   charge = -900,
                   fontSize = 14,
                   fontFamily = "serif",
                   linkColour = "#666",
                   nodeColour = "#69b3a2",
                   opacity = 0.9,
                   zoom = T)
p