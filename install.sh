#!/bin/bash

# Pi Orchestrator Installer
# This script installs dependencies and builds the project for Pi Agent Coder.

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🤖 Starting Pi Orchestrator Installation...${NC}"

# Check if we are in the repo, if not, clone it (for curl | bash support)
if [ ! -f "package.json" ] || [ "$(basename $(pwd))" != "pi_orchestator" ]; then
    echo -e "${BLUE}📥 Downloading project from repository...${NC}"
    REPO_URL="https://github.com/YOUR_USERNAME/pi_orchestator.git"
    git clone "$REPO_URL" pi_orchestator
    cd pi_orchestator
fi

# 1. Check for Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install it first.${NC}"
    exit 1
fi

# 2. Check for npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed. Please install it first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Environment check passed.${NC}"

# 3. Install Dependencies & Build
echo -e "${BLUE}📦 Setting up project...${NC}"
npm install
npm run build

# 4. Link package globally
echo -e "${BLUE}🔗 Linking package for Pi...${NC}"
npm link

# 5. Update Pi settings.json automatically
SETTINGS_FILE="$HOME/.pi/agent/settings.json"
if [ -f "$SETTINGS_FILE" ]; then
    echo -e "${BLUE}⚙️  Configuring Pi settings.json...${NC}"
    if grep -q "npm:pi_orchestator" "$SETTINGS_FILE"; then
        echo -e "${GREEN}✅ Already configured in Pi.${NC}"
    else
        # Add the package to the packages array using sed
        # This assumes the packages array exists and is not empty
        sed -i 's/"packages": \[/"packages": [\n    "npm:pi_orchestator",/' "$SETTINGS_FILE"
        echo -e "${GREEN}✅ Pi settings updated.${NC}"
    fi
else
    echo -e "${RED}⚠️  Pi settings.json not found at $SETTINGS_FILE. You may need to run Pi once first.${NC}"
fi

echo -e "${GREEN}✅ Installation successful!${NC}"

# 6. Final message
echo -e "\n${GREEN}🚀 Pi Orchestrator is now integrated with Pi!${NC}"
echo -e "Just restart Pi and your new agents (Planner, Developer, Tester) will be available."
echo -e "Use ${BLUE}Tab${NC} to switch agents and ${BLUE}/orchestrator_init${NC} to document your project."
