#!/bin/bash

# Push portfolio to GitHub
# Usage: bash PUSH_TO_GITHUB.sh

echo "🚀 Pushing portfolio to GitHub..."

# Check if git is initialized
if [ ! -d .git ]; then
    git init
    git config user.name "Brandon Canniff"
    git config user.email "iambrandomoon@gmail.com"
    git branch -M main
fi

# Add and commit
git add .
git commit -m "Portfolio website" -m "Updated portfolio with latest content" 2>/dev/null || echo "Already up to date"

# Add remote if not exists
if ! git remote get-url origin &>/dev/null; then
    git remote add origin git@github.com:gobrando/portfolio.git
    echo "Remote added: git@github.com:gobrando/portfolio.git"
fi

# Push to GitHub
git push -u origin main

echo "✓ Done! View at: https://github.com/gobrando/portfolio"
echo "📝 To enable GitHub Pages:"
echo "   1. Go to https://github.com/gobrando/portfolio/settings"
echo "   2. Find 'Pages' in the left sidebar"
echo "   3. Set source to 'Deploy from a branch'"
echo "   4. Select 'main' branch and 'root' folder"
echo "   5. Your site will be live at: https://gobrando.github.io/portfolio"
