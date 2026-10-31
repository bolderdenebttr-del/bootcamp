#!/usr/bin/env bash
# Final encode: x264 two pass, yuv420p, +faststart, AAC 192 kbps 48 kHz.
#   ./encode.sh <video> <output name>
set -euo pipefail
cd "$(dirname "$0")"
v=$1; out=out/$2; b=build/$v; rate=${RATE:-5000k}
# BT.709, limited range, tagged, so phones and re-encoders read the khadag blue correctly.
vf="scale=in_color_matrix=bt601:out_color_matrix=bt709:in_range=tv:out_range=tv:flags=lanczos+accurate_rnd+full_chroma_int,format=yuv420p"
tags=(-colorspace bt709 -color_primaries bt709 -color_trc bt709 -color_range tv)
ffmpeg -y -v error -i "$b/silent.mp4" -vf "$vf" -c:v libx264 -preset slow -b:v "$rate" -pass 1 -passlogfile "$b/x264" \
  "${tags[@]}" -r 30 -an -f mp4 /dev/null
ffmpeg -y -v error -i "$b/silent.mp4" -i "$b/mix.wav" -map 0:v -map 1:a -vf "$vf" -c:v libx264 -preset slow -b:v "$rate" -pass 2 \
  -passlogfile "$b/x264" "${tags[@]}" -r 30 -c:a aac -b:a 192k -ar 48000 -ac 2 -movflags +faststart -shortest "$out"
rm -f "$b"/x264*.log*
ls -la "$out"
