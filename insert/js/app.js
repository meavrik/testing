var app = angular.module('App', ['ngMaterial']);

app.controller('AppCtrl', function ($scope,$http) {
  const DEBUG_MODE = true;
  const MAX_VALUE = 1000000000;
  const MIN_VALUE = 0;
  const onesArr = ["","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"];
  const dozens = ["","ten","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];

  // on every change to the textfield string number we test the string result
  $scope.onChangeInputText = function(value){
      /*if not a number, or not between the define bounds we return the remark
      if is valid we try to translate the number to words
      */
      if (isNaN(value) || value<MIN_VALUE || value>MAX_VALUE)
      {
          $scope.resultText = "Please enter a number, that is bigger then 0 and smaller than 1,000,000,000.";
      }
      else
      {
          $scope.resultText = numberToWords(value);
      }
    }

    //translate number to words
    function numberToWords(value)
    {
        if (!value || isNaN(value)) return "";
        let numberInWordsStr="";
        if (value && value.length)
        {
          let digitsGroupArr = [
                                {arr:[],showStr:"billion"},
                                {arr:[],showStr:"million"},
                                {arr:[],showStr:"thousand"},
                                {arr:[],showStr:""},
                              ];
          //we take the number and split it into parts of 3 digits, each in a group accordingly
          let numberAsString=value.split("").reverse().join('');

          for (var i = 0; i < numberAsString.length; i++) {
              let digit = numberAsString[i];
              if (i<3){
                digitsGroupArr[3].arr.push(digit);
              } else
              if (i<6){
                digitsGroupArr[2].arr.push(digit);
              } else
              if (i<9){
                digitsGroupArr[1].arr.push(digit);
              } else
              if (i<12){
                digitsGroupArr[0].arr.push(digit);
              }
          }

          //loop through the groups and get the right sentence for each 3 digit group
          for (item of digitsGroupArr) {
            if (item.arr.length && parseInt(item.arr.join(''))>0)
            {
                let str=getSentenceFor(item.arr.reverse().join(''),item.showStr);
                if (str)
                {
                  //if we get a sentence, add it to the full sentence string
                  numberInWordsStr+=numberInWordsStr.length?", "+str:str;
                }
            }
          }
        }

        return numberInWordsStr;
      }

      function getSentenceFor(value,add="")
      {
        let wordNum="";
        if (parseInt(value)==0) return "";
        if (value.length)
        {
          // function for getting the dozens words
          let calcDozens = (num) => {
            if (num==0) return "";
            if (num<20) return onesArr[num];
            let firstNumWord = dozens[num.toString()[0]];
            let secondNumWord = onesArr[num.toString()[1]];

            return secondNumWord?`${firstNumWord}-${secondNumWord}`:firstNumWord;
          }

          if (value.length<3)
          {
              // handle dozens
              wordNum+=calcDozens(parseInt(value));
          } else {
              // handle hundreds + dozens
              let arr = value.split("");
              let hundredNumWord = onesArr[arr[0]]
              if (hundredNumWord) wordNum+=hundredNumWord+" hundred";
              //remove the hundred digit (we used)
              arr.shift();
              if (arr.length>1)
              {
                  let dozens = calcDozens(parseInt(arr.join('')));
                  if (dozens)
                  {
                      wordNum+=hundredNumWord?", "+dozens:dozens;
                  }
              }
          }

          if (add) wordNum+=` ${add}`;
        }
        return wordNum
      }




    //unit test for varius types of numbers
    function runSomeTests()
    {
      const tests = [   {value:"dasd",result:""},
                  {value:"10d",result:""},
                  {value:"0",result:""},
                  {value:"1",result:"one"},
                  {value:"5",result:"five"},
                  {value:"10",result:"ten"},
                  {value:"11",result:"eleven"},
                  {value:"15",result:"fifteen"},
                  {value:"20",result:"twenty"},
                  {value:"24",result:"twenty-four"},
                  {value:"79",result:"seventy-nine"},
                  {value:"100",result:"one hundred"},
                  {value:"101",result:"one hundred, one"},
                  {value:"305",result:"three hundred, five"},
                  {value:"777",result:"seven hundred, seventy-seven"},
                  {value:"1000",result:"one thousand"},
                  {value:"1002",result:"one thousand, two"},
                  {value:"1055",result:"one thousand, fifty-five"},
                  {value:"1114",result:"one thousand, one hundred, fourteen"},
                  {value:"9999",result:"nine thousand, nine hundred, ninety-nine"},
                  {value:"10000",result:"ten thousand"},
                  {value:"10003",result:"ten thousand, three"},
                  {value:"20073",result:"twenty thousand, seventy-three"},
                  {value:"41003",result:"forty-one thousand, three"},
                  {value:"108003",result:"one hundred, eight thousand, three"},
                  {value:"550003",result:"five hundred, fifty thousand, three"},
                  {value:"990012",result:"nine hundred, ninety thousand, twelve"},
                  {value:"1000000",result:"one million"},
                  {value:"1000003",result:"one million, three"},
                  {value:"3003000",result:"three million, three thousand"},
                  {value:"7200013",result:"seven million, two hundred thousand, thirteen"},
                  {value:"9999999",result:"nine million, nine hundred, ninety-nine thousand, nine hundred, ninety-nine"},
                  {value:"10000003",result:"ten million, three"},
                  {value:"90001003",result:"ninety million, one thousand, three"},
                  {value:"1000000000",result:"one billion"}
                ];

        let totalSuccess=0;

        for (testItem of tests) {
             let result = numberToWords(testItem.value);
             if (result == testItem.result) {
                totalSuccess++;
                console.debug(`PASS! ${testItem.value} : [${result}] = [${testItem.result}]`);
             } else {
                console.warn(`FAIL! ${testItem.value} : [${result}] = [${testItem.result}]`);
             }
         }
         console.log(`total success : ${totalSuccess} / ${tests.length}`);
     }

     if (DEBUG_MODE===true) runSomeTests();

});
