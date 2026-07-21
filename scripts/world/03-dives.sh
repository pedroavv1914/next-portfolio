#!/bin/bash
# Gera os dives 16:9 restantes (dive_jundiai vem da calibração).
set -u
. "$(dirname "$0")/env.sh"

for n in faculdade fagron aithos projetos irlanda; do
  [ -f "$WORK/dive_$n.mp4" ] && { echo "dive $n já existe, pulando"; continue; }
  gen_video "dive_$n" "$PROMPTS/dive_$n.txt" "$DIVE_DUR" "$WORK/still_$n.png" &
done
wait

for n in $NAMES; do
  [ -f "$WORK/dive_$n.mp4" ] || { echo "FALTANDO: dive_$n"; exit 1; }
done
echo "Dives completos."
