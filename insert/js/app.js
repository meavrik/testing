var app = angular.module('App', ['ngMaterial']);

app.controller('AppCtrl', function ($scope) {
  const MAX_VALUE = 1000000000;
  const MIN_VALUE = 0
  const onesArr =["","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"];
  const dozens=["","ten","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];

  $scope.onChangeInputText = function(value){
      if (isNaN(value) || value<MIN_VALUE || value>MAX_VALUE)
      {
          $scope.resultText = "Please enter a number, that is bigger then 0 and smaller than 1,000,000,000.";
      }
      else
      {
          $scope.resultText = translateNumber(value);
      }
    }

    function translateNumber(value)
    {
        if (!value || isNaN(value)) return "";
        let newstr="";
        if (value && value.length)
        {
          let tempStr=value.split("").reverse().join('');

          var handreds=[];
          var thousand=[];
          var millions=[];
          var billions=[];
          for (var i = 0; i < tempStr.length; i++) {

              if (i<3){
                handreds.push(tempStr[i])
              } else
              if (i<6){
                thousand.push(tempStr[i])
              } else
              if (i<9){
                millions.push(tempStr[i])
              } else
              if (i<12){
                billions.push(tempStr[i])
              }
          }

          let numberStrArr = [
                                {arr:billions,showStr:"billion"},
                                {arr:millions,showStr:"million"},
                                {arr:thousand,showStr:"thousand"},
                                {arr:handreds,showStr:""},
                              ];
          /*let str;
          if (billions.length && parseInt(billions.join(''))>0) {newstr+=getSentenceFor(billions.reverse().join('')," billion");}
          if (millions.length && parseInt(millions.join(''))>0) {
            str=getSentenceFor(millions.reverse().join('')," million");
            newstr+=newstr.length?", "+str:str;
          }
          if (thousand.length && parseInt(thousand.join(''))>0) {
            str=getSentenceFor(thousand.reverse().join('')," thousand");
            newstr+=newstr.length?", "+str:str;
          }
          if (handreds.length && parseInt(handreds.join(''))>0)
          {
              str=getSentenceFor(handreds.reverse().join(''));
              newstr+=newstr.length?", "+str:str;
          }*/

          for (obj of numberStrArr) {
            if (obj.arr.length && parseInt(obj.arr.join(''))>0)
            {
                let str=getSentenceFor(obj.arr.reverse().join(''),obj.showStr);
                newstr+=newstr.length?", "+str:str;
            }
          }
        }

        return newstr;
      }



      function getSentenceFor(value,add="")
      {
        let wordNum="";
        if (parseInt(value)==0) return "";
        if (value.length)
        {
          /*let firstStr = value.toString().substring(value.length-2,value.length);

          if (value.length>2 && value.toString()[0]!=0)
          {
              wordNum+=onesArr[parseInt(value.toString()[0])]+" handred ";
          }

          let valArr=firstStr.split("").join("");
          if (parseInt(value)<20)
          {
              wordNum+=onesArr[parseInt(valArr)];
          } else {

              wordNum += dozens[valArr[1]]+" "+onesArr[valArr[0]];
          }

          return wordNum?wordNum+" "+add:"";*/

          var a = (num) => {return num<20?onesArr[num]:dozens[num.toString()[0]]+" "+onesArr[num.toString()[1]]};
          if (value.length<3)
          {
              //let num =parseInt(value);
              //wordNum+=num<20?onesArr[num]:dozens[num[0]]+" "+onesArr[num[1]];
              wordNum+=a(parseInt(value));
          } else {
              //value=value.join("").shift();
              wordNum+=onesArr[value[0]]+" handred ";
              wordNum+=a(parseInt(value.join("").shift()));
          }

          return wordNum?wordNum+" "+add:"";
        }
      }

      //unit test
    function testAll()
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
                  {value:"101",result:"one hundred one"},
                  {value:"305",result:"three hundred five"},
                  {value:"777",result:"seven hundred seventy-seven"},
                  {value:"1000",result:"one thousand"},
                  {value:"1002",result:"one thousand, two"},
                  {value:"1055",result:"one thousand, fifty-five"},
                  {value:"1114",result:"one thousand, one hundred fourteen"},
                  {value:"9999",result:"nine thousand, nine hundred ninety-nine"},
                  {value:"10000",result:"ten thousand"},
                  {value:"10003",result:"ten thousand, three"},
                  {value:"20073",result:"twenty thousand, seventy-three"},
                  {value:"41003",result:"forty-one thousand, three"},
                  {value:"108003",result:"one hundred eight thousand, three"},
                  {value:"550003",result:"five hundred fifty thousand, three"},
                  {value:"990012",result:"nine hundred ninety thousand, twelve"},
                  {value:"1000003",result:"one million, three"},
                  {value:"7200013",result:"seven million, two hundred thousand, thirteen"},
                  {value:"9999999",result:"nine million, nine hundred ninety-nine thousand, nine hundred ninety-nine"},
                  {value:"10000003",result:"ten million, three"},
                  {value:"90001003",result:"ninety million, one thousand, three"},
                  {value:"1000000000",result:"one billion"}
                ];

        for (testItem of tests) {
             let result = translateNumber(testItem.value);
             let success = result == testItem.result?true:false;
             let resultStr = success?" PASS!":" FAIL!"
             console.log(`test ${testItem.value} ${resultStr}  got ${result} need to ${testItem.result}`);
         }
     }
     testAll();

});
