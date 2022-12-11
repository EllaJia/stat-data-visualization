library(tidygraph)
library(tidyverse)
library(ggraph)
library(igraph)
library(shiny)
library(dplyr)
library(networkD3)
theme_set(theme_bw())

setwd('C:/Users/ellen/Desktop/STAT 679')

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


# create data for the graph
# source, target, value
link_data <- data2 %>% ungroup() %>%
  filter(team == 'alleycats') %>%
  select(from, to, sum_count)
colnames(link_data) <- c('source', 'target', 'value')
link_data <- data.frame(link_data)

mean_value <- mean(link_data$value)
mean_sd <- sd(link_data$value)

for (i in 1: nrow(link_data)){
  link_data[i, "source"] <- as.numeric(which(edge_data$name == link_data[i, "source"])) - 1
  link_data[i, "target"] <- as.numeric(which(edge_data$name == link_data[i, "target"])) - 1
  link_data[i, "value"] <- ((as.numeric(link_data[i, "value"]) - mean_value)/ mean_sd + 1) * 10
}
link_data

# name, group, size
name_list <- unique(link_data$from)
name_list_2 <- unique(link_data$to)
concat_data <- c(name_list, name_list_2)
edge_data <- data.frame(unique(concat_data), col = '1')
colnames(edge_data) <- c('name', 'group')

# with a simple click action - make the circles bigger when clicked
MyClickScript <- 
  '      d3.select(this).select("circle").transition()
.duration(750)
.attr("r", 20)'

# Create graph
forceNetwork(Links = link_data, 
             Nodes = edge_data, 
             Source = "source",
             Target = "target", 
             Value = "value", 
             NodeID = "name",
             Group = "group",
             opacity = 1, 
             zoom = F, 
             bounded = T,
             fontSize = 15,
             clickAction = MyClickScript)
