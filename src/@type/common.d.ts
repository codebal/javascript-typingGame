
type PageInfo = {
    title: string,
    content: string
}

type LocationTarget = string | 'typing' | 'result'

type GameStatus = 'STOP' | 'START'

type GameResult = {
    point: number
    avg_second: number
    sum_second: number
    count: number
}