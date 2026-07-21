#!/bin/bash
# Encoda os clipes desktop (nativo 1080p, crf 20, GOP 8, faststart).
set -u
. "$(dirname "$0")/env.sh"

for n in $NAMES; do enc "$WORK/dive_$n.mp4" "$ASSETS/vid/$n.mp4"; done
for i in 1 2 3 4 5; do
  [ -f "$WORK/conn_$i.mp4" ] && enc "$WORK/conn_$i.mp4" "$ASSETS/vid/conn$i.mp4"
done
echo "Encodes desktop concluídos em $ASSETS/vid"
