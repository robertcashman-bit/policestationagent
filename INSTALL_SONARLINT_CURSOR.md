# Install SonarLint in Cursor

## Quick Install (Easiest Method)

### Option 1: Direct Link (Recommended)
1. **Click this link to open the extension page:**
   ```
   https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarlint-vscode
   ```
2. Click the **"Install"** button
3. It will open Cursor and install automatically

---

## Option 2: Search in Cursor

### Step-by-Step:

1. **Open Extensions:**
   - Press `Ctrl+Shift+X` 
   - Or click the Extensions icon (4 squares) in the left sidebar

2. **Search:**
   - In the search box, type exactly: **`SonarLint`**
   - Make sure it's spelled: **S-o-n-a-r-L-i-n-t** (not "Solar")

3. **Look for:**
   - **Name:** "SonarLint"
   - **Publisher:** SonarSource
   - **Icon:** Blue/green circular badge
   - Should show "1M+ downloads"

4. **Install:**
   - Click the green "Install" button
   - Wait for it to install
   - Click "Reload" if prompted

---

## Option 3: Command Palette

1. Press `Ctrl+Shift+P`
2. Type: `Extensions: Install Extensions`
3. Press Enter
4. Search for: `SonarLint`
5. Click Install

---

## Option 4: Extension ID (If search doesn't work)

1. Press `Ctrl+Shift+P`
2. Type: `Extensions: Install from VSIX...`
3. Or use extension ID: `SonarSource.sonarlint-vscode`

---

## Still Can't Find It?

### Try These Search Terms:
- `SonarSource` (the publisher name)
- `sonarlint-vscode` (the extension ID)
- `code quality` (broader search)

### Check Your Cursor Version:
- SonarLint requires Cursor/VS Code version 1.60.0 or later
- Check version: Help → About

### Direct Download:
1. Go to: https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarlint-vscode
2. Click "Download Extension"
3. Save the `.vsix` file
4. In Cursor: `Ctrl+Shift+P` → "Extensions: Install from VSIX..."
5. Select the downloaded file

---

## Verify It's Working

After installation:

1. **Open any `.ts` or `.tsx` file** in your project
2. **Check the Problems panel** (bottom of screen)
3. You should see SonarLint issues appear
4. **Check Output panel:** `Ctrl+Shift+U` → Select "SonarLint" from dropdown

---

## Quick Test

Open this file: `app/page.tsx`
- SonarLint should automatically analyze it
- Issues will appear in the Problems panel
- Hover over code to see SonarLint suggestions

---

## Need More Help?

- **Extension Page:** https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarlint-vscode
- **Documentation:** https://www.sonarlint.org/
- **GitHub:** https://github.com/SonarSource/sonarlint-vscode
