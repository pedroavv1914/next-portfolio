#!/bin/bash
# Calibração de custo: gera 1 still + 1 dive (da cena jundiai, que são reaproveitados)
# e mede o gasto real de créditos antes de aprovar a corrida completa.
set -u
. "$(dirname "$0")/env.sh"

echo "== créditos ANTES =="
higgsfield workspace list 2>&1 | tee "$WORK/credits_before.txt"

gen_still jundiai

echo "== créditos após o still =="
higgsfield workspace list 2>&1 | tee "$WORK/credits_after_still.txt"

gen_video dive_jundiai "$PROMPTS/dive_jundiai.txt" "$DIVE_DUR" "$WORK/still_jundiai.png"

echo "== créditos após o dive =="
higgsfield workspace list 2>&1 | tee "$WORK/credits_after_video.txt"

echo
echo "Calibração concluída. Compare os três snapshots de créditos acima:"
echo "  custo do still  = ANTES - APÓS_STILL"
echo "  custo do vídeo  = APÓS_STILL - APÓS_VIDEO"
echo "Corrida completa restante: 5 stills + 10 vídeos 16:9 + 11 vídeos 9:16 (+ ~15% re-rolls)"
