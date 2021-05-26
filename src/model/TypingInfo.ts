interface TypingInfo {
    text: string,
    second: number,
    solve?: boolean,
    solve_second?: number
}

class TypingInfo {
    constructor(obj?:any){
        if(obj){
            this.text = obj.text
            this.second = obj.second
            this.solve = obj.solve || true
            this.solve_second = obj.solve_second || 0
        }
    }
}

export default TypingInfo