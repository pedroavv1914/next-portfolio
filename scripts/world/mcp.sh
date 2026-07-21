#!/bin/bash
# Helpers para falar com o MCP hospedado da Higgsfield (modo trial: só MCP gera).
export PATH="$PATH:/c/Users/pedro/AppData/Local/Microsoft/WinGet/Links"
FFBIN="$(ls -d /c/Users/pedro/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg*/ffmpeg-*/bin 2>/dev/null | head -1)"
export PATH="$FFBIN:$PATH"
TOKEN=$(higgsfield auth token 2>/dev/null | head -1)
MCP_URL="https://mcp.higgsfield.ai/mcp"
WORK="${WORK:-$HOME/AppData/Local/Temp/scroll-world-work}"
mkdir -p "$WORK"

mcall() { # json-rpc payload -> data json on stdout (aceita SSE e JSON puro)
  local pf="$WORK/.mcp_payload_$$.json" rf="$WORK/.mcp_resp_$$.txt"
  printf '%s' "$1" > "$pf"
  curl -s -X POST "$MCP_URL" \
    -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
    -H "Accept: application/json, text/event-stream" --data-binary @"$pf" > "$rf"
  if grep -q '^data: ' "$rf"; then
    grep '^data: ' "$rf" | sed 's/^data: //'
  else
    cat "$rf"
  fi
  rm -f "$pf" "$rf"
}

tool() { # name args_json
  mcall "{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"tools/call\",\"params\":{\"name\":\"$1\",\"arguments\":$2}}"
}

# poll_job <job_set_id> <timeout_s> — imprime o json final do job_status
poll_job() {
  local id="$1" t="${2:-900}" out
  local start=$(date +%s)
  while :; do
    out=$(tool job_status "{\"job_set_id\":\"$id\"}")
    st=$(echo "$out" | jq -r '.result.structuredContent.status // .result.structuredContent.jobs[0].status // empty' 2>/dev/null)
    case "$st" in
      completed|succeeded|done) echo "$out"; return 0 ;;
      failed|nsfw|canceled) echo "$out"; return 1 ;;
    esac
    [ $(( $(date +%s) - start )) -gt "$t" ] && { echo "$out"; return 2; }
    sleep 20
  done
}
