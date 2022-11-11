// 打席の結果を選択すると打数と安打に繁栄される
let atbat= 0 ;
let hit = 0 ;
let rbi = 0 ;
let homerun = 0 ;
let key = " " ;


// 1打席ごとの結果の入力及びその日の結果に繁栄
$("#enter").on("click",function(){
    let result = $('#result').val() ;
    console.log(result) ;
// 打数を加算
    atbat += 1 ;
    console.log(atbat) ;
    document.getElementById("atbat").value = atbat ;
    $("#atbat").html(atbat);
    $("#hit").val(hit);
    $("#rbi").html(rbi);
    $("#homerun").val(homerun);
// 打撃結果の羅列
    key += result+"  " ;
    document.getElementById("key").value = key ;
    $("#key").html(key);
// 打点があれば内容を選択
    let rbiresult = parseInt($("#rbiresult").val());
    rbi += rbiresult ;
    console.log(rbiresult) ;
    document.getElementById("rbi").value = rbi ;
    $("#rbi").html(rbi);

// ホームランを打ったら安打数と本塁打数が加算される
    if(result=="ホームラン"){
        hit += 1 ;
        console.log(hit) ;
        document.getElementById("hit").value = hit ;
        $("#hit").html(hit);
        homerun += 1 ;
        console.log(homerun) ;
        document.getElementById("homerun").value = homerun ;
        $("#homerun").html(homerun);
    }
// 二塁打を打ったら安打数が加算される
    if(result=="二塁打"){
        hit += 1 ;
        console.log(hit) ;
        document.getElementById("hit").value = hit ;
        $("#hit").html(hit);
    }
// 三塁打を打ったら安打数が加算される
    if(result=="三塁打"){
        hit += 1 ;
        console.log(hit) ;
        document.getElementById("hit").value = hit ;
        $("#hit").html(hit);
    }
// ヒットを打ったら安打数が加算される
    if(result=="ヒット"){
        hit += 1 ;
        console.log(hit) ;
        document.getElementById("hit").value = hit ;
        $("#hit").html(hit);
    }
// 四球の場合は打数に変動なし
    if(result=="四球"){
        atbat -= 1 ;
        console.log(hit) ;
        document.getElementById("atbat").value = atbat ;
        $("#atbat").html(atbat);
    }
// 犠打の場合は打数に変動なし
    if(result=="犠打"){
        atbat -= 1 ;
        document.getElementById("atbat").value = atbat ;
        $("#atbat").html(atbat);
    }
// 犠飛の場合は打数に変動なし、打点が１増える
    if(result=="犠飛"){
        atbat -= 1 ;
        document.getElementById("atbat").value = atbat ;
        $("#atbat").html(atbat);
        rbi += 1 ;
        console.log(rbi) ;
        document.getElementById("rbi").value = rbi ;
        $("#rbi").html(rbi);
    }


}) 


// 通算の打数、安打、打点をまず０にする
let totalatbat = 0 ;
let totalhit = 0 ;
let totalrbi = 0 ;
let totalhomerun = 0 ;
let average = 0 ;

//1.Save クリックイベント
// Saveをクリックするとその日の結果が確定しその日までの通算成績が算出される


$("#save").on('click',function(){

    let enemy = $("#enemy").val();
    let date= $("#date").val();
    let atbat= parseInt($("#atbat").val());
    let hit= parseInt($("#hit").val());
    let homerun= parseInt($("#homerun").val());
    let rbi= parseInt($("#rbi").val());
    let key= $("#key").val();
    let value= $("#value").val();
    
    console.log(key);
    console.log(memo);

 const html =`
    <tr>    
        <th>vs${enemy}</th>
        <td>${date}</td>
        <td>${atbat}打数</td>
        <td>${hit}安打</td>
        <td>${rbi}打点</td>
        <td>${key}</td>
       
    </tr>`
;
console.log(totalatbat);
console.log(atbat);
totalatbat = totalatbat + atbat;
totalhit = totalhit + hit ;
totalrbi = totalrbi + rbi ;
totalhomerun = totalhomerun + homerun ;
average = (Math.round(totalhit / totalatbat *1000) /1000) ;
console.log(`totalatbatは${totalatbat}`     );


$("#list").append(html);
$("#totalatbat").html(totalatbat+"打数");
$("#totalhit").html(totalhit+"安打");
$("#totalhomerun").html(totalhomerun+"本塁打");
$("#totalrbi").html(totalrbi+"打点");
$("#average").html(average);



localStorage.setItem(key,memo);

// 日付が次の日になるできなかった
date += 1 ;
$("#date").html(date);

})

// 次の試合へクリックイベント
$("#next").on('click',function(){
    console.log('次へがおされたよ') ;
    atbat = 0 ;
    hit = 0 ;
    rbi = 0 ;
    homerun = 0 ;
    key=" " ;
    console.log(hit) ;
    $("#atbat").val('');
    $("#hit").val('');
    $("#rbi").val('');
    $("#key").val('');
    $("#homerun").val('');
})


//2.clear クリックイベント

$("#clear").on('click',function(){

let key= $("#key").val();
console.log(key);
alert('ほんとに削除しますか？');

const html = `
<tr>
<th>${key}</th>
<td>${memo}</td>
<td>${date}</td>
</tr>`;

$("#list").empty();
totalatbat == 0 ;
console.log(totalatbat) ;
$("#totalatbat").html(totalatbat+"打数");

localStorage.clear();

})



//3.ページ読み込み：保存データ取得表示
for(let i = 0; i < localStorage.length; i++){
    const key = localStorage.key (i);
    const value = localStorage.getItem(key);
    const html =
    
    `    
    <tr>
        <th>${key}</th>
        <td>${value}</td>
        <td>${date}</td>
    </tr>`;
   

$("#list").append(html);
}


