#!/bin/bash
# Ambiente comum do pipeline scroll-world (rodar via Git Bash).
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
PROMPTS="$ROOT/scripts/world/prompts"
WORK="${WORK:-$HOME/AppData/Local/Temp/scroll-world-work}"
ASSETS="$ROOT/public/world"
mkdir -p "$WORK" "$ASSETS/vid"

# Ferramentas instaladas via winget nesta máquina (links ainda fora do PATH da sessão)
export PATH="$PATH:/c/Users/pedro/AppData/Local/Microsoft/WinGet/Links"
FFBIN="$(ls -d /c/Users/pedro/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg*/ffmpeg-*/bin 2>/dev/null | head -1)"
export PATH="$FFBIN:$PATH"

NAMES="jundiai faculdade fagron aithos projetos irlanda"
VMODEL="${VMODEL:-seedance_2_0}"
case "$VMODEL" in
  kling3_0)          VOPTS="--mode std --sound off";        DIVE_DUR=10; CONN_DUR=5 ;;
  seedance_2_0_mini) VOPTS="--mode std --resolution 720p";  DIVE_DUR=8;  CONN_DUR=5 ;;
  *)                 VOPTS="--mode std --resolution 1080p"; DIVE_DUR=8;  CONN_DUR=5 ;;
esac

result_url() { jq -r '.[0].result_url // empty' "$1" 2>/dev/null; }

gen_still() { # name
  higgsfield generate create gpt_image_2 --prompt "$(cat "$PROMPTS/still_$1.txt")" \
    --aspect_ratio 3:2 --resolution 2k --quality high --wait --wait-timeout 15m --json \
    > "$WORK/still_$1.json" 2> "$WORK/still_$1.err"
  url=$(result_url "$WORK/still_$1.json")
  [ -n "$url" ] && curl -fsSL "$url" -o "$WORK/still_$1.png" && echo "still $1 ok" || echo "still $1 FAIL"
}

# gen_video <output-prefix> <prompt-file> <duration> [start.png] [end.png]
# Até 3 tentativas (filtro NSFW dá falso positivo de forma não determinística).
gen_video() {
  out="$1"; prompt="$2"; dur="$3"; start="$4"; end="$5"
  extra=""
  [ -n "$start" ] && extra="$extra --start-image $start"
  [ -n "$end" ] && extra="$extra --end-image $end"
  for attempt in 1 2 3; do
    # shellcheck disable=SC2086
    higgsfield generate create "$VMODEL" --prompt "$(cat "$prompt")" \
      $extra $VOPTS --aspect_ratio "${AR:-16:9}" --duration "$dur" \
      --wait --wait-timeout 20m --json > "$WORK/$out.json" 2> "$WORK/$out.err"
    url=$(result_url "$WORK/$out.json")
    if [ -n "$url" ]; then
      curl -fsSL "$url" -o "$WORK/$out.mp4" && echo "$out ok (tentativa $attempt)" && return 0
    fi
    echo "$out falhou (tentativa $attempt): $(head -c 200 "$WORK/$out.err" "$WORK/$out.json" 2>/dev/null | tr '\n' ' ')"
    sleep 5
  done
  echo "$out FAIL depois de 3 tentativas"
  return 1
}

enc() { ffmpeg -v error -y -i "$1" -an -vf "unsharp=5:5:0.8:5:5:0.0" \
  -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p \
  -g 8 -keyint_min 8 -sc_threshold 0 -movflags +faststart "$2" && echo "enc $2 $(du -h "$2" | cut -f1)"; }

encp() { ffmpeg -v error -y -i "$1" -an -vf "scale=720:-2,unsharp=5:5:0.6:5:5:0.0" \
  -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p \
  -g 4 -keyint_min 4 -sc_threshold 0 -movflags +faststart "$2" && echo "encp $2 $(du -h "$2" | cut -f1)"; }

credits() { higgsfield workspace list 2>/dev/null | grep -io 'credit[^,]*' | head -2; }
