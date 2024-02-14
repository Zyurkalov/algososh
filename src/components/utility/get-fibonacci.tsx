export const getFibonacci = (num: number) => {
    const memo: number[] = [1, 1]
    if(num <= 0) { 
      return [0]
      // никогда не сработает но пусть будет
    }
    if (num === 1) {
      return memo
    }
    for (let i=2; i<=num; i++) {
      memo.push(memo[i-2] + memo[i-1])
    }
    return memo
  }