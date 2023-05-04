function penTowTimes(str){
    let result = "";
  const charCount = {};
  
  for (let i = 0; i < s.length; i++) {
    charCount[s[i]] = (charCount[s[i]] || 0) + 1;
    if (charCount[s[i]] <= 2) {
      result += s[i];
    }
  }
  
  let isPalindrome = true;
  for (let i = 0; i < Math.floor(result.length / 2); i++) {
    if (result[i] !== result[result.length - 1 - i]) {
      isPalindrome = false;
      break;
    }
  }
  
  if (isPalindrome) {
    return result;
  } else {
    return "notfound";
  }
}
console.log(penTowTimes("abaacbfcb")) 
console.log(penTowTimes("aaaaaaaa")) 
console.log(penTowTimes("psxxyyyyyxszzzpzyyyy"))


function missing(arr){
    let missingNo = [];
    let max = Math.max(...arr);
    for(let i = 1; i<= max; i++)
    {
        if(!arr.includes(i)){
            missingNo.push(i);
        }
    }
    return missingNo;
}

console.log(missing([1,6,3,5,2]))
console.log(missing([1,7,3,5,2] )) 
console.log(missing([2,5]))
console.log(missing([5,2]))
/*console.log(missing([99999997, 99999999])) */

function largestConsec(arr)
{
    let sum = -Infinity;
    for( let i = 0; i<arr.length-2;i++)
    {
        let some = arr[i]+ arr[i+1]+arr[i+2];
        if(some>sum)
        {
            sum = some;
        }
    }

    return sum;
}

console.log(largestConsec([2,0,1,110,200,10,7,2,300,2,10]))
console.log(largestConsec([2,1,0,20,8]))