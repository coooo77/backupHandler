import { copyFileSync, unlinkSync, existsSync } from 'fs'

export function wilderCardHandler(wildCard: string, oriName: string) {
  const targetTime = new Date()

  return wildCard
    .replace('{year}', String(targetTime.getFullYear()).padStart(2, '0'))
    .replace('{month}', String(targetTime.getMonth() + 1).padStart(2, '0'))
    .replace('{day}', String(targetTime.getDate()).padStart(2, '0'))
    .replace('{hr}', String(targetTime.getHours()).padStart(2, '0'))
    .replace('{min}', String(targetTime.getMinutes()).padStart(2, '0'))
    .replace('{sec}', String(targetTime.getSeconds()).padStart(2, '0'))
    .replace('{oriName}', oriName)
}

export function wait(seconds: number) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000))
}

export async function reTry(fn: Function, maxRetries = 3, intervalInSec = 0.5) {
  try {
    await fn()
  } catch (error: any) {
    if (maxRetries <= 0) throw new Error(error?.message)

    await wait(intervalInSec)

    await reTry(fn, --maxRetries)
  }
}

export async function moveFile(fromPath: string, toPath: string, deleteOriFile?: boolean) {
  try {
    await reTry(() => copyFileSync(fromPath, toPath))

    if (deleteOriFile && existsSync(toPath)) unlinkSync(fromPath)
  } catch (error: any) {
    throw new Error(`Error occurred when move file: ${fromPath}, cross device to: ${toPath}, reason: ${error?.message}`)
  }
}
