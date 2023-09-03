import fs from 'node:fs'
import path from 'node:path'

import config from './config.json'

import type { Config } from './types/config'
import { wilderCardHandler, moveFile } from './utils/helper'

const { cloudFolderPath, backupFileConfigs } = config as Config

async function mainProcess() {
  if (backupFileConfigs.length === 0) return

  const isCloudFolderExist = await fs.existsSync(cloudFolderPath)
  if (!isCloudFolderExist) throw new Error('no cloud folder available')

  for (const config of backupFileConfigs) {
    const { wildCard, filePath, deleteOriFile, destinationDir, overwrite = true } = config

    if (!fs.existsSync(filePath)) continue

    const shouldCreateDir = destinationDir && !fs.existsSync(destinationDir)
    if (shouldCreateDir) fs.mkdirSync(destinationDir, { recursive: true })

    const { name, ext } = path.parse(filePath)
    const exportName = wildCard ? wilderCardHandler(wildCard, name) : name
    const toPath = path.join(destinationDir || cloudFolderPath, `${exportName}${ext}`)

    if (!overwrite && fs.existsSync(toPath)) continue
    moveFile(filePath, toPath, deleteOriFile)
  }
}

mainProcess()
