# How to Install SonarLint

## Method 1: VS Code/Cursor Extensions Marketplace

### Step-by-Step:

1. **Open Extensions Panel:**
   - Press `Ctrl+Shift+X` (Windows/Linux) or `Cmd+Shift+X` (Mac)
   - Or click the Extensions icon in the left sidebar (looks like 4 squares)

2. **Search for SonarLint:**
   - In the search box at the top, type: `SonarLint`
   - Make sure you spell it: **S-o-n-a-r-L-i-n-t** (not "SolarLint")

3. **Look for:**
   - **Extension Name:** "SonarLint"
   - **Publisher:** "SonarSource"
   - **Icon:** Blue/green circular icon with "SL" or a shield
   - **Downloads:** Should show millions of downloads

4. **Install:**
   - Click the green "Install" button
   - Wait for installation to complete
   - Click "Reload" when prompted

## Method 2: Direct Marketplace Link

If you can't find it in the search, try this:

1. **Open this URL in your browser:**
   ```
   https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarlint-vscode
   ```

2. **Click "Install" in the browser**
   - This will open VS Code/Cursor
   - Confirm the installation

## Method 3: Command Palette

1. **Open Command Palette:**
   - Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)

2. **Type:**
   ```
   Extensions: Install Extensions
   ```

3. **Search:**
   - Type: `SonarSource.sonarlint-vscode`
   - Press Enter

## Method 4: Manual Installation via Command Line

If you're using VS Code/Cursor from terminal:

```bash
code --install-extension SonarSource.sonarlint-vscode
```

Or for Cursor:
```bash
cursor --install-extension SonarSource.sonarlint-vscode
```

## Troubleshooting

### Can't find it in search?

**Common issues:**
- Typo: Make sure it's "SonarLint" not "SolarLint" or "Sonar Link"
- Search filters: Clear any filters in the Extensions panel
- Marketplace connection: Check your internet connection

### Alternative Search Terms:
- Try searching: `SonarSource`
- Or: `sonarlint-vscode`
- Or: `code quality`

### Still can't find it?

1. **Check VS Code/Cursor version:**
   - Make sure you're using a recent version
   - SonarLint requires VS Code 1.60.0 or later

2. **Check Marketplace:**
   - Go to: https://marketplace.visualstudio.com/
   - Search for "SonarLint"
   - Install from there

3. **Manual Download:**
   - Visit: https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarlint-vscode
   - Download the `.vsix` file
   - In VS Code/Cursor: `Ctrl+Shift+P` → "Extensions: Install from VSIX..."

## Verify Installation

After installing:

1. **Check Extensions Panel:**
   - Look for "SonarLint" in your installed extensions
   - Status should show "Enabled"

2. **Open a TypeScript file:**
   - Open any `.ts` or `.tsx` file
   - SonarLint will automatically start analyzing

3. **Check Output Panel:**
   - Press `Ctrl+Shift+U` (or `Cmd+Shift+U` on Mac)
   - Select "SonarLint" from the dropdown
   - You should see SonarLint activity logs

## Need Help?

- **SonarLint Documentation:** https://www.sonarlint.org/
- **VS Code Extension Page:** https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarlint-vscode
- **GitHub Issues:** https://github.com/SonarSource/sonarlint-vscode/issues
