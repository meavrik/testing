class UnitTest
{
  constructor() {
    const tests = [   {value:"dasd",result:""},
                {value:"10d",result:""},
                {value:0,result:""},
                {value:1,result:"one"},
                {value:5,result:"five"},
                {value:10,result:"ten"},
                {value:11,result:"eleven"},
                {value:15,result:"fifteen"},
                {value:20,result:"twenty"},
                {value:24,result:"twenty-four"},
                {value:79,result:"seventy-nine"},
                {value:101,result:"one hundred one"},
                {value:305,result:"three hundred five"},
                {value:777,result:"seven hundred seventy-seven"},
                {value:1000,result:"one thousand"},
                {value:1002,result:"one thousand, two"},
                {value:1055,result:"one thousand, fifty-five"},
                {value:1114,result:"one thousand, one hundred fourteen"},
                {value:9999,result:"nine thousand, nine hundred ninety-nine"},
                {value:10000,result:"ten thousand"},
                {value:10003,result:"ten thousand, three"},
                {value:20073,result:"twenty thousand, seventy-three"},
                {value:41003,result:"forty-one thousand, three"},
                {value:108003,result:"one hundred eight thousand, three"},
                {value:550003,result:"five hundred fifty thousand, three"},
                {value:990012,result:"nine hundred ninety thousand, twelve"},
                {value:1000003,result:"one million, three"},
                {value:7200013,result:"seven million, two hundred thousand, thirteen"},
                {value:9999999,result:"nine million, nine hundred ninety-nine thousand, nine hundred ninety-nine"},
                {value:10000003,result:"ten million, three"},
                {value:90001003,result:"ninety million, one thousand, three"},
                {value:1000000000,result:"one billion"}];
  }




 testAll(testFunc)
  {
    console.log("test!");
    for (testItem of tests) {
        let success = testFunc(testItem.value) ===  testItem.result?true:false;
        console.log(success?"PASS!":"FAIL!");
    }
  }
}