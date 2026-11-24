#!/bin/bash
# Script to push fullstack-student-management to GitHub

set -e

echo "=========================================="
echo " Pushing to GitHub: aiswaryabala17"
echo " Repo: fullstack-student-management"
echo "=========================================="

# Ensure branch is main
git branch -M main

# Push to GitHub
git push -u origin main

echo ""
echo "✅ Successfully pushed to https://github.com/aiswaryabala17/fullstack-student-management"
