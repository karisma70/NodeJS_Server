/**
 * Created by Administrator on 2017-05-22.
 */

var chapterNameArray = [
    { nick : "창", name : "창세기" },
    { nick : "출", name: "출애굽기" },
    { nick : "레", name: "레위기" },
    { nick : "민", name: "민수기" },
    { nick : "신", name: "신명기" },
    { nick : "수", name: "여호수아" },
    { nick : "삿", name: "사사기" },
    { nick : "룻", name: "룻기" },
    { nick : "삼상", name: "사무엘상" },
    { nick : "삼하", name: "사무엘하" },
    { nick : "왕상", name: "열왕기상" },
    { nick : "왕하", name: "열왕기하" },
    { nick : "대상", name: "역대상" },
    ////////////////////////////////////////////////////
    { nick : "대하", name : "역대하" },
    { nick : "스", name: "에스라" },
    { nick : "느", name: "느헤미야" },
    { nick : "에", name: "에스더" },
    { nick : "욥", name: "욥기" },
    { nick : "시", name: "시편" },
    { nick : "잠", name: "잠언" },
    { nick : "전", name: "전도서" },
    { nick : "아", name: "아가" },
    { nick : "사", name: "이사야" },
    { nick : "렘", name: "예레미야" },
    { nick : "애", name: "예레미야애가" },
    { nick : "겔", name: "에스겔" },
    ////////////////////////////////////////////////////
    { nick : "단", name : "다니엘" },
    { nick : "호", name: "호세아" },
    { nick : "욜", name: "요엘" },
    { nick : "암", name: "아모스" },
    { nick : "옵", name: "오바댜" },
    { nick : "욘", name: "요나" },
    { nick : "미", name: "미가" },
    { nick : "나", name: "나훔" },
    { nick : "합", name: "하박국" },
    { nick : "습", name: "스바냐" },
    { nick : "학", name: "학개" },
    { nick : "슥", name: "스가랴" },
    { nick : "말", name: "말라기" },
    ////////////////////////////////////////////////////  구약
    { nick : "마", name : "마태복음" },
    { nick : "막", name: "마가복음" },
    { nick : "눅", name: "누가복음" },
    { nick : "요", name: "요한복음" },
    { nick : "행", name: "사도행전" },
    { nick : "롬", name: "로마서" },
    { nick : "고전", name: "고린도전서" },
    { nick : "고후", name: "고린도후서" },
    { nick : "갈", name: "갈라디아서" },
    ////////////////////////////////////////////////////
    { nick : "엡", name : "에베소서" },
    { nick : "빌", name: "빌립보서" },
    { nick : "골", name: "골로새서" },
    { nick : "살전", name: "데살로니가전서" },
    { nick : "살후", name: "데살로니가후서" },
    { nick : "딤전", name: "디모데전서" },
    { nick : "딤후", name: "디모데후서" },
    { nick : "딛", name: "디도서" },
    { nick : "몬", name: "빌레몬서" },
    ////////////////////////////////////////////////////
    { nick : "히", name : "히브리서" },
    { nick : "약", name: "야고보서" },
    { nick : "벧전", name: "베드로전서" },
    { nick : "벧후", name: "베드로후서" },
    { nick : "요일", name: "요한1서" },
    { nick : "요이", name: "요한2서" },
    { nick : "요삼", name: "요한3서" },
    { nick : "유", name: "유다서" },
    { nick : "계", name: "요한계시록" }
    ////////////////////////////////////////////////////
];



module.exports = {
    findByShortTitle : function( paramTitle ) {
        for( idx in chapterNameArray ){
            var obj = chapterNameArray[idx];
            if( obj.nick == paramTitle ){
                return obj;
            }
        }
        return null;
    },
    findByLongTitle : function( paramTitle ){
        for( idx in chapterNameArray ){
            var obj = chapterNameArray[idx];
            if( obj.name == paramTitle ){
                return obj;
            }
        }
        return null;
    }
};

