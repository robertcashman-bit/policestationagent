# SonarLint Setup Guide

## What is SonarLint?

SonarLint is a free IDE extension that provides real-time code quality and security analysis as you write code. It helps detect bugs, vulnerabilities, and code smells before they reach production.

## Installation

### For VS Code / Cursor

1. **Open Extensions:**
   - Press `Ctrl+Shift+X` (Windows/Linux) or `Cmd+Shift+X` (Mac)
   - Or click the Extensions icon in the Activity Bar

2. **Search for SonarLint:**
   - Type "SonarLint" in the search box
   - Look for "SonarLint" by SonarSource

3. **Install:**
   - Click the "Install" button
   - Wait for installation to complete
   - Reload the window if prompted

4. **Verify Installation:**
   - SonarLint will automatically start analyzing your code
   - You'll see issues highlighted in the Problems panel

## Configuration

### Automatic Configuration

The project includes:
- `.vscode/settings.json` - SonarLint settings
- `.vscode/extensions.json` - Recommends SonarLint extension
- `sonar-project.properties` - SonarQube/SonarCloud configuration

### Manual Configuration (Optional)

If you want to connect to SonarQube or SonarCloud:

1. **Open SonarLint Settings:**
   - Press `Ctrl+,` (or `Cmd+,` on Mac)
   - Search for "SonarLint"

2. **Connect to SonarQube/SonarCloud:**
   - Click "Add SonarQube Connection" or "Add SonarCloud Connection"
   - Enter your server URL and token
   - This enables additional rules and project-specific settings

## Features

- **Real-time Analysis:** Issues are highlighted as you type
- **Security Vulnerabilities:** Detects security issues in your code
- **Code Smells:** Identifies maintainability issues
- **Bugs:** Finds potential bugs before runtime
- **TypeScript/JavaScript Support:** Full support for your Next.js project

## Usage

Once installed, SonarLint will:
- Automatically analyze files as you open them
- Show issues in the Problems panel
- Provide inline suggestions and fixes
- Highlight code with different severity levels (Blocker, Critical, Major, Minor, Info)

## Integration with Existing Tools

SonarLint works alongside:
- ✅ ESLint (already configured)
- ✅ Prettier (just installed)
- ✅ Next.js linting

## Troubleshooting

### SonarLint not showing issues?
- Make sure the extension is enabled
- Check the Output panel → Select "SonarLint" from dropdown
- Reload the window: `Ctrl+Shift+P` → "Reload Window"

### Too many issues?
- Adjust rules in `.vscode/settings.json`
- Disable specific rules if needed
- Focus on Blocker and Critical issues first

## Resources

- [SonarLint Documentation](https://www.sonarlint.org/)
- [SonarLint for VS Code](https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarlint-vscode)
- [SonarQube Rules](https://rules.sonarsource.com/)
