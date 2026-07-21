#!/bin/bash
# Cadeia retrato 9:16 nativa (versão mobile): canvases, dives, frames e connectors.
# A cadeia retrato trava seams contra os PRÓPRIOS renders 9:16, nunca os 16:9.
set -u
. "$(dirname "$0")/env.sh"
AR="9:16"

# 1. Canvases retrato: still 3:2 composto num canvas 1080x1920 cor do fundo,
#    ilha a ~94% da largura, centro visual a ~45% da altura.
for n in $NAMES; do
  ffmpeg -v error -y -i "$WORK/still_$n.png" \
    -vf "scale=1015:-2,pad=1080:1920:(ow-iw)/2:(oh*0.45)-(ih/2):color=0xF4EFE6" \
    "$WORK/pstill_$n.png" && echo "canvas retrato $n ok"
done

# 2. Dives 9:16
for n in $NAMES; do
  [ -f "$WORK/pdive_$n.mp4" ] && { echo "pdive $n já existe, pulando"; continue; }
  gen_video "pdive_$n" "$PROMPTS/dive_${n}_p.txt" "$DIVE_DUR" "$WORK/pstill_$n.png" &
done
wait
for n in $NAMES; do [ -f "$WORK/pdive_$n.mp4" ] || { echo "FALTANDO: pdive_$n"; exit 1; }; done

# 3. Frames de fronteira dos renders 9:16
for n in $NAMES; do
  ffmpeg -v error -y -ss 0 -i "$WORK/pdive_$n.mp4" -frames:v 1 -q:v 2 "$WORK/pfirst_$n.png"
  ffmpeg -v error -y -sseof -0.15 -i "$WORK/pdive_$n.mp4" -frames:v 1 -q:v 2 "$WORK/plast_$n.png"
done

# 4. Connectors 9:16
set -- $NAMES
i=0; prev=""
for n in "$@"; do
  if [ -n "$prev" ]; then
    i=$((i+1))
    [ -f "$WORK/pconn_$i.mp4" ] && { echo "pconn $i já existe, pulando"; prev="$n"; continue; }
    gen_video "pconn_$i" "$PROMPTS/conn_${i}_p.txt" "$CONN_DUR" "$WORK/plast_$prev.png" "$WORK/pfirst_$n.png" &
  fi
  prev="$n"
done
wait
echo "Cadeia retrato concluída."
