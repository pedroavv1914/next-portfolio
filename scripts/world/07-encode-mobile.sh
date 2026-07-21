#!/bin/bash
# Encoda a cadeia retrato como os -m.mp4 (720 de largura, GOP 4, crf 23)
# e extrai os pôsteres stillMobile do primeiro frame de cada dive 9:16.
set -u
. "$(dirname "$0")/env.sh"

for n in $NAMES; do encp "$WORK/pdive_$n.mp4" "$ASSETS/vid/$n-m.mp4"; done
for i in 1 2 3 4 5; do
  [ -f "$WORK/pconn_$i.mp4" ] && encp "$WORK/pconn_$i.mp4" "$ASSETS/vid/conn$i-m.mp4"
done

for n in $NAMES; do
  ffmpeg -v error -y -ss 0 -i "$WORK/pdive_$n.mp4" -frames:v 1 -vf "scale=720:-2" \
    "$ASSETS/$n-m.webp" && echo "poster mobile $n-m.webp ok"
done
echo "Mobile pronto. Agora vire WORLD_READY=true em src/lib/world-config.ts"
