export type GameStatus = 'released' | 'dev' | 'concept'

export interface GameDownload {
  os: string
  url: string
  label?: string
  version?: string
}

export interface Game {
  slug: string
  title: string
  status: GameStatus
  image?: string
  titleImage?: string
  downloadTitle: string
  downloads: GameDownload[]
  description?: string
  changelog?: string
}

export const STATUS_LABEL: Record<GameStatus, string> = {
  released: '',
  dev: '개발 중',
  concept: '기획 중',
}

function textContent(parent: Element, tag: string) {
  return parent.querySelector(tag)?.textContent?.trim()
}

function childText(parent: Element, tag: string) {
  return Array.from(parent.children)
    .find((child) => child.tagName.toLowerCase() === tag.toLowerCase())
    ?.textContent
    ?.trim()
}

function parseDownloads(gameNode: Element, fallbackTitle: string): GameDownload[] {
  const downloads = Array.from(gameNode.querySelectorAll('downloads > download, game > download'))
    .map((node) => ({
      os: node.getAttribute('os') || childText(node, 'os') || 'Windows',
      url: node.getAttribute('url') || node.getAttribute('href') || childText(node, 'url') || '',
      label: node.getAttribute('label') || childText(node, 'label') || undefined,
      version: node.getAttribute('version') || childText(node, 'version') || undefined,
    }))
    .filter((download) => download.url)

  const legacyUrl = textContent(gameNode, 'downloadUrl')
  if (downloads.length > 0 || !legacyUrl) return downloads

  return [{
    os: textContent(gameNode, 'downloadOs') || 'Windows',
    url: legacyUrl,
    label: `${fallbackTitle} 다운로드`,
  }]
}

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, '-')
    .replace(/^-|-$/g, '')
}

const xmlModules = import.meta.glob('../../../content/games/*/game.xml', { as: 'raw', eager: true })
const mdModules = import.meta.glob('../../../content/games/*/description.md', { as: 'raw', eager: true })
const logModules = import.meta.glob('../../../content/games/*/changelog.md', { as: 'raw', eager: true })

export const games: Game[] = Object.entries(xmlModules).map(([path, xml]) => {
  const parts = path.split('/')
  const folder = parts[parts.length - 2]
  const document = new DOMParser().parseFromString(xml as string, 'application/xml')
  const gameNode = document.querySelector('game')

  if (!gameNode) {
    throw new Error(`Invalid game.xml: ${path}`)
  }

  const title = textContent(gameNode, 'title') || folder
  const slug = textContent(gameNode, 'slug') || slugify(title)

  return {
    slug,
    title,
    status: (textContent(gameNode, 'status') as GameStatus) || 'released',
    image: textContent(gameNode, 'image'),
    titleImage: textContent(gameNode, 'titleImage'),
    downloadTitle: textContent(gameNode, 'downloadTitle') || '## 다운로드',
    downloads: parseDownloads(gameNode, title),
    description: mdModules[`../../../content/games/${folder}/description.md`] as string | undefined,
    changelog: logModules[`../../../content/games/${folder}/changelog.md`] as string | undefined,
  }
})
