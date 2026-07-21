#!/bin/bash
# Gera os 5 stills restantes (jundiai vem da calibração) e converte todos p/ webp.
set -u
. "$(dirname "$0")/env.sh"

for n in faculdade fagron aithos projetos irlanda; do
  [ -f "$WORK/still_$n.png" ] && { echo "still $n já existe, pulando"; continue; }
  gen_still "$n" &
done
wait

fail=0
for n in $NAMES; do
  [ -f "$WORK/still_$n.png" ] || { echo "FALTANDO: still_$n"; fail=1; }
done
[ $fail -eq 1 ] && { echo "Re-rode os que falharam antes de seguir."; exit 1; }

# Pôsteres desktop (ffmpeg faz webp; sem cwebp nesta máquina)
for n in $NAMES; do
  ffmpeg -v error -y -i "$WORK/still_$n.png" -vf "scale=1800:-2" -q:v 84 "$ASSETS/$n.webp" \
    && echo "poster $n.webp ok"
done
echo "Revise a coesão visual dos stills em $WORK antes de rodar 03-dives.sh"
