#!/usr/bin/env bash
# Full build of one explainer: frames -> silent MP4, cues + beats, audio mix, final encode.
#   ./build.sh v1 AISM_Diploma_MN_explainer_v1.mp4
# (Run `python3 audio.py align <v>` first whenever the script or the voice changes.)
set -euo pipefail
cd "$(dirname "$0")"
node render.js "$1" motion 4 | tail -1
node render.js "$1" cues
node render.js "$1" beats
python3 audio.py mix "$1"
./encode.sh "$1" "$2" 2>&1 | grep -v "2pass stats" || true
