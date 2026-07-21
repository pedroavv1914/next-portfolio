#!/bin/bash
# Extrai frames de fronteira DOS VÍDEOS RENDERIZADOS e gera os 5 connectors 16:9.
set -u
. "$(dirname "$0")/env.sh"

for n in $NAMES; do
  ffmpeg -v error -y -ss 0 -i "$WORK/dive_$n.mp4" -frames:v 1 -q:v 2 "$WORK/first_$n.png"
  ffmpeg -v error -y -sseof -0.15 -i "$WORK/dive_$n.mp4" -frames:v 1 -q:v 2 "$WORK/last_$n.png"
done

set -- $NAMES
i=0; prev=""
for n in "$@"; do
  if [ -n "$prev" ]; then
    i=$((i+1))
    [ -f "$WORK/conn_$i.mp4" ] && { echo "conn $i já existe, pulando"; prev="$n"; continue; }
    gen_video "conn_$i" "$PROMPTS/conn_$i.txt" "$CONN_DUR" "$WORK/last_$prev.png" "$WORK/first_$n.png" &
  fi
  prev="$n"
done
wait

for i in 1 2 3 4 5; do
  [ -f "$WORK/conn_$i.mp4" ] || echo "FALTANDO: conn_$i (o engine aceita null — mas tente re-rolar / kling3_0 antes)"
done
echo "Connectors concluídos."
