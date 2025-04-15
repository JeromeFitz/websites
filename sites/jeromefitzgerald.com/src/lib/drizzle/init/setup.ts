import { exec } from 'node:child_process'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import readline from 'node:readline'
import { promisify } from 'node:util'

const execAsync = promisify(exec)

async function getPostgresURL(): Promise<string> {
  console.log('🗃️ Setting up Postgres')
  const dbChoice = await question(
    '(L) Local Postgres w/ Docker; (R) Remote Postgres? (L/R): ',
  )

  if (dbChoice.toLowerCase() === 'l') {
    console.log('🟢 (L) Setting up local Postgres instance w/ Docker...')
    await setupLocalPostgres()
    return 'postgres://postgres:postgres@localhost:54322/postgres'
  } else {
    return await question('📝 POSTGRES_URL: ')
  }
}

async function main() {
  const POSTGRES_URL = await getPostgresURL()

  await writeEnvFile({
    POSTGRES_URL,
  })

  console.log('🏁 Setup completed successfully!')
}

function question(query: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close()
      resolve(ans)
    }),
  )
}

async function setupLocalPostgres() {
  console.log('🐳 Checking if Docker (Podman?) is installed...')
  try {
    await execAsync('docker --version')
    console.log('✅ Docker is installed.')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.error('❎ Docker is not installed. Please install Docker and try again.')
    console.log('📝 To install Docker, visit: https://docs.docker.com/get-docker/')
    process.exit(1)
  }

  console.log('⏳ Creating docker-compose.yml file...')
  const dockerComposeContent = `
services:
  postgres:
    image: postgres:16.4-alpine
    container_name: music_player_postgres
    environment:
      POSTGRES_DB: postgres
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "54322:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
`

  await fs.writeFile(
    path.join(process.cwd(), 'docker-compose.yml'),
    dockerComposeContent,
  )
  console.log('✅ docker-compose.yml file created.')

  console.log('🟢 Starting Docker container with `docker compose up -d`...')
  try {
    await execAsync('docker compose up -d')
    console.log('✅ Docker container started successfully.')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.error(
      '🔴 Failed to start Docker container. Please check your Docker installation and try again.',
    )
    process.exit(1)
  }
}

async function writeEnvFile(envVars: Record<string, string>) {
  console.log('💽 Writing environment variables to .env')
  const envContent = Object.entries(envVars)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n')

  await fs.writeFile(path.join(process.cwd(), '.env'), envContent)
  console.log('✅ .env file created with the necessary variables.')
}

main().catch(console.error)
