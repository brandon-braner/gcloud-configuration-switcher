# GCloud Config Manager for Raycast

A Raycast extension to easily manage Google Cloud SDK configurations. Create, duplicate, and switch between gcloud configurations with a few keystrokes.

## Features

- **List Configurations**: View all your gcloud configurations with their associated projects, accounts, and regions
- **Switch Configurations**: Quickly activate a different configuration
- **Create Configurations**: Create new configurations with project, account, and region settings
- **Duplicate Configurations**: Copy an existing configuration to create a new one
- **Delete Configurations**: Remove configurations you no longer need

## Prerequisites

- [Raycast](https://www.raycast.com/) installed
- [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) installed and available in your PATH
- The `gcloud` command must be accessible from your terminal

## Installation

### Development Mode

1. Clone or navigate to this directory:
   ```bash
   cd ~/code/raycast-gcloud-config
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Open Raycast and run "Import Extension"

4. Select the `raycast-gcloud-config` directory

### Build for Distribution

```bash
npm run build
```

## Usage

### List GCloud Configurations

1. Open Raycast (⌘ Space)
2. Type "List GCloud Configurations"
3. Press Enter to view all configurations
4. Use the action panel to:
   - Activate a configuration (Enter)
   - Delete a configuration (⌘ Delete)
   - Refresh the list

### Create GCloud Configuration

1. Open Raycast
2. Type "Create GCloud Configuration"
3. Fill in the form:
   - Configuration Name (required)
   - Project ID (optional)
   - Account Email (optional)
   - Region (optional, defaults to us-central1)
4. Press ⌘ Enter to create

### Duplicate GCloud Configuration

1. Open Raycast
2. Type "Duplicate GCloud Configuration"
3. Select the source configuration
4. Enter a new name
5. Press ⌘ Enter to duplicate

## Commands

- `list-configs` - List and manage gcloud configurations
- `create-config` - Create a new gcloud configuration
- `duplicate-config` - Duplicate an existing gcloud configuration

## Development

To run the extension in development mode:

```bash
npm run dev
```

This will open the extension in Raycast's development mode where you can test changes in real-time.

## License

MIT
