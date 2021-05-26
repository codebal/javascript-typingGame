import TypingInfo from "../../model/TypingInfo"
import { renderPage, getTypingInfoList, getTypingInfo, setTypingInfo, getGameResult, roundNum, goResultPage, initGameData } from "../../utils/commonUtils"


let currentIndex: number = -1
let typingEnd: boolean = false
let typingEndTime: number
let gameStatus: GameStatus = 'STOP'

const startTypingInfo = (index:number) => {
    const typingInfo:TypingInfo = getTypingInfo(index)
    //console.log('typingInfo', index, typingInfo)
    document.querySelector('#text').innerHTML = typingInfo.text
    document.querySelector('#leftTime').innerHTML = typingInfo.second + ''

    typingEndTime = (new Date()).getTime() + (typingInfo.second * 1000)
    //typingEndTime = (new Date()).getTime() + 2000
    typingEnd = false
    currentIndex = index
    watchGameStatus()
}

const watchGameStatus = () => {
    if(gameStatus !== 'START')
        return null

    const typingInfo:TypingInfo = getTypingInfo(currentIndex)
    const leftSecond: number = typingEndTime - (new Date()).getTime()
    const solveSecond = typingInfo.second - (leftSecond / 1000)

    if(leftSecond <= 0){
        typingEnd = true
        typingInfo.solve = false
        typingInfo.solve_second = 0
    }
    else if(leftSecond > 0 && typingEnd){
        typingInfo.solve = true
        typingInfo.solve_second = solveSecond
    }

    if(!typingEnd){
        setTimeout(watchGameStatus, 100)
    }
    else{
        setTypingInfo(currentIndex, typingInfo)

        const typingInfoList:TypingInfo[] = getTypingInfoList()
        currentIndex++
        if(currentIndex <= typingInfoList.length-1){
            startTypingInfo(currentIndex)
        }
        else{
            //console.log('게임종료', typingInfoList)
            goResultPage()
        }
    }
    
    const gameResult: GameResult = getGameResult()
    if(document.querySelector('#leftTime')){
        document.getElementById('leftTime').innerHTML = Math.max(roundNum(leftSecond/1000), 0) + ''
        document.getElementById("typingInput").focus();
        document.getElementById("point").innerHTML = gameResult.point + ''
    }
}

const endTypingInfo = () => {
    typingEnd = true
}

const checkAnswer = (answer:string) => {
    if(gameStatus !== 'START')
        return
        
    (document.getElementById('typingInput') as HTMLInputElement).value = ''
    const currentTypingInfo:TypingInfo = getTypingInfo(currentIndex)
    if(currentTypingInfo.text === answer){
        
        endTypingInfo()
    }
}

const startGame = () => {
    gameStatus = 'START'
    typingEnd = false
    currentIndex = 0

    initGameData().then(()=>{
        startTypingInfo(0)
        //console.log('startGame', getTypingInfoList())
    })
    

}

const stopGame = () => {
    gameStatus = 'STOP'
    endTypingInfo()

    initPage()
}

const changeGameStatus = (nextGameStatus: GameStatus) => {
    gameStatus = nextGameStatus
    //console.log('gameStatus', gameStatus)

    const startBtn = document.getElementById('startBtn')
    if(gameStatus === 'START'){
        startGame()
        startBtn.innerHTML = '초기화'
    }
    else if(gameStatus === 'STOP'){
        stopGame()
        startBtn.innerHTML = '시작'
        
    }
}

const toggleGameStatus = () => {
    let nextGameStatus: GameStatus = gameStatus === 'STOP' ? 'START' : 'STOP'
    changeGameStatus(nextGameStatus)
}

const makeEvent = () => {
    document.getElementById('startBtn').addEventListener('click', (e:MouseEvent)=>{
        toggleGameStatus()
    })

    document.getElementById('typingInput').addEventListener('keyup', (e:KeyboardEvent)=>{
        if(e.key === 'Enter'){
            //console.log('typingInput', (e.target as HTMLInputElement).value)
            checkAnswer((e.target as HTMLInputElement).value)
        }
    })
}

const initPage = () => {
    const content = `
        <div class="box typing">
            <div class='monitor'>
                <div class='left'>남은시간: <span id="leftTime">0</span>초</div>
                <div class='right'>점수: <span id="point">0</span></div>
            </div>
            <div id="text" class="subject">문제단어</div>
            <div><input id="typingInput" class="typingInput"/></div>
            <div><button id="startBtn" class="startBtn">시작</button></div>
        </div>
    `

    renderPage({
        title: '타이핑',
        content
    })
    
    makeEvent()
}


const typingPage = () => {
    stopGame()
}

export default typingPage