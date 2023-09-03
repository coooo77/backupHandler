## BackupHandler

Designed to backup files to a cloud folder.

## config

- cloudFolderPath: [string] Default location, which should be a cloud folder.
- destinationDir: [string] Specify a folder for file relocation. If this parameter is set, files will be moved to the specified location instead of the default folder.
- deleteOriFile: [boolean] Whether to delete the original file after moving it.
- overwrite: [boolean] Whether to delete the file at the target location if it already exists.
- wildCard: [string] Wildcard options available: {year}, {month}, {day}, {hr}, {min}, {sec}, {oriName}, which can be used to customize the filename.
- filePath: [string] Name of the file to be moved.

## usage

build js file first

```
git clone https://github.com/coooo77/backupHandler.git
cd backupHandler
npm run build
```

use batch file with task scheduler in windows
