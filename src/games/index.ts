export type GameStatus = 'released' | 'dev' | 'concept'

export interface Game {
  title: string
  status: GameStatus
  image?: string
  titleImage?: string
  downloadUrl?: string
  description?: string
  changelog?: string
}

export const STATUS_LABEL: Record<GameStatus, string> = {
  released: '',
  dev:      '개발 중',
  concept:  '기획 중',
}

function parseXML(xmlString: string, tags: string[]) {
  const result: Record<string, string> = {}
  tags.forEach(tag => {
    const match = xmlString.match(new RegExp(`<${tag}>(.*?)<\/${tag}>`))
    if (match) result[tag] = match[1]
  })
  return result
}

const xmlModules = import.meta.glob('./*/game.xml', { as: 'raw', eager: true })
const mdModules  = import.meta.glob('./*/description.md', { as: 'raw', eager: true })
const logModules = import.meta.glob('./*/changelog.md', { as: 'raw', eager: true })

export const games: Game[] = Object.entries(xmlModules).map(([path, xml]) => {
  const parts = path.split('/')
  const title = parts[parts.length - 2]

  const data = parseXML(xml as string, ['status', 'image', 'titleImage', 'downloadUrl'])

  return {
    title,
    status: (data.status as GameStatus) || 'released',
    image: data.image,
    titleImage: data.titleImage,
    downloadUrl: data.downloadUrl,
    description: mdModules[`./${title}/description.md`] as string | undefined,
    changelog:   logModules[`./${title}/changelog.md`]  as string | undefined,
  }
})
