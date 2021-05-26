import typingPage from "../typingPage/typingPage"
import { getGameResult, goTypingPage, renderPage, roundNum } from "../../utils/commonUtils"

const showResult = () => {
    const gameResult: GameResult = getGameResult()
    document.getElementById("point").innerHTML = gameResult.point + ''
    document.getElementById("avg_second").innerHTML = roundNum(gameResult.avg_second) + ''
}


const makeEvent = () => {
    document.getElementById('restartBtn').addEventListener('click', (e:MouseEvent)=>{
        //console.log('다시 시작'),
        goTypingPage()
    })
}

const initPage = () => {
    const content = `
        <div class="box result">
            <div class="subject">Misson Complete!</div>
            <div class="score">당신의 점수는 <span id="point"></span>점입니다.</div>
            <div class="avgTime">단어당 평균 답변 시간은 <span id="avg_second"></span>초 입니다.</div>
            <div class="btnArea"><button class="restartBtn" id="restartBtn">다시 시작</button></div>
        </div>
    `

    renderPage({
        title: '결과',
        content
    })
}

const resultPage = () => {
    initPage()
    makeEvent()
    showResult()
}

export default resultPage