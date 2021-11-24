import TypingInfo from "../model/TypingInfo";
import { initGameData, getTypingInfo, getGameResult, setTypingInfo, getTypingInfoList, roundNum } from "../utils/commonUtils";

const setTypingInfoSolve = (index:number, solve:boolean, solve_second?:number) => {
    let typingInfo: TypingInfo = getTypingInfo(index)
    typingInfo.solve = solve
    typingInfo.solve_second = (solve_second !== undefined ? solve_second : typingInfo.solve_second)
    setTypingInfo(index, typingInfo)
}

test("initGameData game size 12", () => {
    initGameData().then((typingInfoList:TypingInfo[])=>{
        //console.log(a)
        expect(typingInfoList.length).toEqual(12)
    })
});

test("getTypingInfo(5) is not null", () => {
    initGameData().then(()=>{
        const typingInfo: TypingInfo = getTypingInfo(5)
        expect(typingInfo).not.toBeNull() 
    })
});

test("no typing result avg_second is 0", () => {
    initGameData().then(()=>{
        const gameResult:GameResult = getGameResult()
        expect(gameResult.avg_second).toEqual(0)
    })
});

const varsList = [
    {idx: 0, solve: true, solve_second: 5},
    {idx: 1, solve: true, solve_second: 7},
    {idx: 2, solve: false, solve_second: 4},
    {idx: 3, solve: true, solve_second: 9},
    {idx: 4, solve: true, solve_second: 1},
    {idx: 5, solve: false, solve_second: 3},
    {idx: 6, solve: true, solve_second: 7},
    {idx: 7, solve: true, solve_second: 3},
    {idx: 8, solve: false, solve_second: 2},
    {idx: 9, solve: true, solve_second: 7},
    {idx: 10, solve: true, solve_second: 2},
    {idx: 11, solve: true, solve_second: 4}
]

const getVarsResult = () => {
    const result = {
        point: 0,
        sum_second: 0,
        avg_second: 0
    }
    varsList.forEach((vars:any)=>{
        if(vars.solve){
            result.point++
            result.sum_second = vars.solve_second
        }
    })

    result.avg_second = result.point > 0 ? result.sum_second / result.point : 0
}

test("game finish result", () => {
    initGameData().then(()=>{

        varsList.forEach((vars:any)=>{
            setTypingInfoSolve(vars.idx, vars.solve, vars.solve_second)
        })
        getVarsResult()

        const gameResult:GameResult = getGameResult()
        expect(gameResult.point).toEqual(9)
        expect(gameResult.sum_second).toEqual(45)
        expect(gameResult.avg_second).toEqual(5)
    })
});