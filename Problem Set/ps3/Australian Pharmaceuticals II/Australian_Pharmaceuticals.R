library(tidyverse)
library(ggalluvial)

pbs_full <- read_csv("https://uwmadison.box.com/shared/static/fcy9q1uleqru7gcs287q903y0rcnw2a2.csv") %>%
  mutate(Month = as.Date(Month))

top_atcs <- pbs_full %>%
  group_by(ATC2_desc) %>%
  summarise(total = sum(Scripts)) %>%
  slice_max(total, n = 10) %>%
  pull(ATC2_desc)

pbs <- pbs_full %>%
  filter(ATC2_desc %in% top_atcs, Month > "2007-01-01")

# (a)
ggplot(pbs) + 
  geom_area(aes(Month, Scripts,fill = ATC2_desc))

# (b)
ggplot(pbs) + 
  geom_alluvium(aes(Month, Scripts,fill = ATC2_desc,alluvium = ATC2_desc),decreasing = FALSE)
