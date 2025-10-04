# Roblox Utils Extension - Code Structure

This document describes the organized structure of the Roblox Utils extension code.

## File Organization

### Core Files
- **`main.js`** - Main content script that initializes all modules
- **`background.js`** - Service worker for extension background tasks
- **`manifest.json`** - Extension configuration and permissions

### Module Files

#### `utils.js`
Contains utility functions for DOM manipulation and data parsing:
- `waitForElementToExist()` - Wait for DOM elements
- `waitForElement()` - Wait for elements with specific conditions
- `parsePlayerCount()` - Parse player count text with K/M/B suffixes
- `parseRobuxText()` - Parse Robux amounts
- `isSmallCard()` - Check if a card element is small
- `ensureCardId()` - Ensure unique IDs for card elements

#### `greetings.js`
Contains language greetings data and functions:
- `greetings` - Object with greetings in multiple languages
- `getGreeting()` - Get greeting for specific language code

#### `income-estimator.js`
Handles game income estimation functionality:
- `estimateIncome()` - Calculate income estimates based on players and approval
- `getApprovalRating()` - Extract approval rating from card elements
- `setVotePercentageColor()` - Color-code vote percentages
- `applyEstimateToCard()` - Apply income estimates to game cards
- `scanPageForCards()` - Scan page for game cards
- `initializeIncomeEstimator()` - Initialize the income estimation system

#### `robux-converter.js`
Handles Robux to USD conversion:
- `updateRobuxUSD()` - Update Robux display with USD equivalent
- `observeRobuxChanges()` - Monitor Robux changes
- `initializeRobuxConverter()` - Initialize the converter

#### `profile-customizer.js`
Handles profile customization features:
- `setProfilePicture()` - Set profile picture for avatar
- `createVerifiedBadgeSVG()` - Create verification badge SVG
- `createOldAccountStarSVG()` - Create old account star SVG
- `customizeProfile()` - Customize the home page profile display
- `initializeProfileCustomizer()` - Initialize profile customization

#### `supabase-client.js`
Handles database operations with Supabase:
- `initializeSupabaseClient()` - Initialize Supabase client and save user data

#### `extension-menu.js`
Handles extension menu functionality:
- `addExtensionMenuItem()` - Add menu item to Roblox settings
- `initializeExtensionMenu()` - Initialize the extension menu system

## Loading Order

The files are loaded in the following order in `manifest.json`:

1. `utils.js` - Utility functions (loaded first as dependencies)
2. `greetings.js` - Language data
3. `income-estimator.js` - Income estimation
4. `robux-converter.js` - Robux conversion
5. `profile-customizer.js` - Profile customization
6. `supabase-client.js` - Database operations
7. `extension-menu.js` - Extension menu
8. `main.js` - Main initialization script

## Benefits of This Structure

1. **Modularity** - Each file has a specific responsibility
2. **Maintainability** - Easy to find and modify specific functionality
3. **Reusability** - Functions can be easily reused across modules
4. **Debugging** - Easier to debug specific features
5. **Collaboration** - Multiple developers can work on different modules
6. **Testing** - Individual modules can be tested separately

## Usage

The main.js file automatically initializes all modules when the content script loads. Each module exports its functions for potential use by other modules, though the current implementation uses a simple object-based approach for organization.
