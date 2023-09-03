'use strict'

interface BackupFileConfigs {
  destinationDir?: string
  deleteOriFile?: boolean;
  overwrite?: boolean
  wildCard?: string
  filePath: string
}

export interface Config {
  cloudFolderPath: string
  backupFileConfigs: BackupFileConfigs[]
}
