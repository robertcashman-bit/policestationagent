#!/usr/bin/env bash
# One-shot: fetch sibling mirror branches from policestationagent and push to real remotes.
# Run from a machine authenticated as you (gh auth login / git credentials with write access).
set -euo pipefail

MIRROR_REMOTE="${MIRROR_REMOTE:-https://github.com/robertcashman-bit/policestationagent.git}"
BRANCH="${BRANCH:-cursor/workspace-error-fixes-571e}"
ROOT="${SIBLING_ROOT:-$HOME}"

apply_one() {
  local name="$1"
  local mirror_ref="$2"
  local dest="$3"
  local push_remote="${4:-origin}"

  if [[ ! -d "$dest/.git" ]]; then
    echo "SKIP $name — missing checkout at $dest"
    return 0
  fi

  echo "==> $name"
  git -C "$dest" fetch "$MIRROR_REMOTE" "$mirror_ref"
  git -C "$dest" checkout -B "$BRANCH" FETCH_HEAD
  git -C "$dest" push -u "$push_remote" "$BRANCH"
  echo "OK $name -> $push_remote $BRANCH"
}

# Adjust paths if your local clones live elsewhere:
apply_one "Policestationrepuk" \
  "sibling/repuk/$BRANCH" \
  "$ROOT/Policestationrepuk"

apply_one "psrtrain" \
  "sibling/psrtrain/$BRANCH" \
  "$ROOT/pstrain-rebuild"

apply_one "custody-note-website" \
  "sibling/custody-note/$BRANCH" \
  "$ROOT/custody-note-website"

echo
echo "PSA PR (open in browser if not already open):"
echo "https://github.com/robertcashman-bit/policestationagent/compare/master...cursor/cloud-agent-1786365590430-jswq2"
echo "Done."
