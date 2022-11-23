library(ggHoriPlot)

spotify_full <- read_csv("https://uwmadison.box.com/shared/static/xj4vupjbicw6c8tbhuynw0pll6yh1w0d.csv")
top_songs <- spotify_full %>%
  group_by(track_name) %>%
  summarise(total = sum(streams)) %>%
  slice_max(total, n = 10) %>%
  pull(track_name)

spotify <- spotify_full %>%
  filter(region == "global", track_name %in% top_songs)

# (a)
ggplot(spotify) + 
  geom_line(aes(date,streams,col = track_name)) +
  theme(legend.position = 'right')

# (b)
max_stream <- max(spotify$streams)
cutpoints <- c(0, 1000000, 2000000, 3000000, 4000000, 12000000)
ggplot(spotify) + 
  geom_horizon(aes(date, streams, fill = ..Cutpoints..), origin=10000, horizonscale = cutpoints)+
  facet_grid(reorder(artist,-streams) ~ .)+
  theme(strip.text.y = element_text(angle=0), axis.text.y = element_blank())

