import typingPage from "../page/typingPage/typingPage";
import resultPage from "../page/resultPage/resultPage";
import TypingInfo from "../model/TypingInfo";

const axios = require('axios')

const renderPage = (pageInfo: PageInfo) => {
    if(!pageInfo)
        return null

    var container = document.querySelector('.container');

    document.title = pageInfo.title || ''
    container.innerHTML = pageInfo.content || '';
}

const initGameData = (): Promise<TypingInfo[]> => {
    return axios({
        url: 'https://my-json-server.typicode.com/kakaopay-fe/resources/words'
    })
    .then((result)=>{
        let typingInfoList: TypingInfo[]
        if(result && result.data && result.data.length){
            typingInfoList = result.data.map((item)=>{
                return new TypingInfo(item)
            })
        }
        setTypingInfoList(typingInfoList)
        return typingInfoList
    })
}

const getGolbal = ():any => {
    try{
        return window
    }
    catch(e){
        return global
    }
}

const getTypingInfoList = (): TypingInfo[] => {
    return getGolbal().__gamedata
}

const setTypingInfoList = (gameData: TypingInfo[]):void => {
    getGolbal().__gamedata = gameData
}

const getTypingInfo = (index:number): TypingInfo => {
    return getTypingInfoList()[index]
}

const setTypingInfo = (index:number, typingInfo: TypingInfo) => {
    const typingInfoList: TypingInfo[] = getTypingInfoList()
    typingInfoList[index] = typingInfo
}

const getGameResult = (): GameResult => {
    const typingInfoList: TypingInfo[] = getTypingInfoList()
    const gameResult: GameResult = {
        point: 0,
        avg_second: 0,
        sum_second: 0,
        count: 0
    }

    if(typingInfoList && typingInfoList.length){
        typingInfoList.forEach((typingInfo: TypingInfo)=>{
            gameResult.count++
            gameResult.sum_second += (typingInfo.solve ? typingInfo.solve_second : 0) 
            gameResult.point = gameResult.point + (typingInfo.solve ? 1 : 0)
            //gameResult.avg_second = gameResult.sum_second / gameResult.point
        })
    
        if(gameResult.point === 0)
            gameResult.avg_second = 0
        else{
            gameResult.avg_second = gameResult.sum_second / gameResult.point
        }
    }


    return gameResult
}

const router = ():void => {
    window.onhashchange = () => {
        let target: LocationTarget = getTarget()
        if(!target)
            target = 'typing'
        changePage(target)
    };
}

const getTarget = (): LocationTarget => {
    return (location.hash || '').replace('#', '')
}

const changePage = (target: LocationTarget) => {
    //console.log('target', target)

    if(target === 'typing' || target === '')
        typingPage()
    else if(target === 'result')
        resultPage()
}

const loadFirstPage = () => {
    changePage(getTarget())
}

const goTypingPage = () => {
    location.replace('#typing')
    location.href = '#typing'
}

const goResultPage = () => {
    location.replace('#result')
}

const roundNum = (num:number) => {
    return Math.round(num * 10) / 10
}

export {
    renderPage,
    initGameData,
    router,
    getTypingInfoList,
    setTypingInfoList,
    getTypingInfo,
    setTypingInfo,
    getGameResult,
    goTypingPage,
    goResultPage,
    loadFirstPage,
    roundNum
}