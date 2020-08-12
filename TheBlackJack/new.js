
let blackjackjgame= {
    'youz':{'scoreSpan':'#your-score','div':'#you','score':0},
    'dealerz':{'scoreSpan':'#dealer-score','div':'#dealer','score':0},
    'cardz':['2','3','4','5','6','7','8','9','10','J','K','Q','A'],
    'cardmap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,11]},
    'winz':0,
    'losz':0,
    'drawz':0,
    'istand':false,
    'allturns':false,
    

}
 let YOU=blackjackjgame['youz'];
 let DEALER=blackjackjgame['dealerz'];
 const hitsound=new Audio('sounds/swish.m4a');
 const winsound=new Audio('sounds/cash.mp3');
 const losesound=new Audio('sounds/aww.mp3');

 document.querySelector('#blackjack-hit').addEventListener('click',hitz);
 document.querySelector('#blackjack-deal').addEventListener('click',dealz);
 document.querySelector('#blackjack-stand').addEventListener('click',standz);

 function hitz(){
     if(blackjackjgame['istand']===false)
     {
     let carding=randomzz();
     showcard(carding,YOU);
     calscore(carding,YOU);
     showscore(YOU);
     }
    }     
 function randomzz(){
     let randomcard=Math.floor(Math.random()*13);
   
     return blackjackjgame['cardz'][randomcard];
 
}
 function showcard(card,activeplayer){
     let cardimg=document.createElement('img');
     cardimg.src=`images/${card}.png`;
     document.querySelector(activeplayer['div']).appendChild(cardimg);
     hitsound.play();
 }
 
 function dealz()
{
 if(blackjackjgame['allturns']===true)
 {
     blackjackjgame['istand']=false;

  let yourimg=document.querySelector('#you').querySelectorAll('img');
  let dealerimg=document.querySelector('#dealer').querySelectorAll('img');

  for(let i=0;i<yourimg.length;i++)
    {
        yourimg[i].remove();
      
    }
    for(let i=0;i<dealerimg.length;i++)
    {
        dealerimg[i].remove();
    }
    YOU['score']=0;
    DEALER['score']=0;
    document.querySelector(YOU['scoreSpan']).textContent=0;
    document.querySelector(DEALER['scoreSpan']).textContent=0;
    document.querySelector(YOU['scoreSpan']).style.color='white';
    document.querySelector(DEALER['scoreSpan']).style.color='white';

    document.querySelector('#blackjack-status').textContent="let's play again";
    document.querySelector('#blackjack-status').style.color='black';
    blackjackjgame['allturns']=true;
 }
   
   

} 
function calscore(card,activeplayer)
{
    if(card==='A')
    {
        if(activeplayer['score']+blackjackjgame['cardmap'][card][1]<=21){
        activeplayer['score']+=blackjackjgame['cardmap'][card][1];
        }else{
            activeplayer['score']+=blackjackjgame['cardmap'][card][0];
        }

    }
    else{
        activeplayer['score']+=blackjackjgame['cardmap'][card];
    }
}

function showscore(activeplayer)
{
    if(activeplayer['score']>21){
        document.querySelector(activeplayer['scoreSpan']).textContent='BUST';
        document.querySelector(activeplayer['scoreSpan']).style.color='red';
    }
    else{
        document.querySelector(activeplayer['scoreSpan']).textContent=activeplayer['score'];
    }
}
function standz()
{
   
    blackjackjgame['istand']=true;
    let card=randomzz();
    showcard(card,DEALER);
    calscore(card,DEALER);
    showscore(DEALER);

  if(DEALER['score']>15)
  {
      blackjackjgame['allturns']=true;
      let winner=computewinner();
      showwinner(winner);
  }

}
function computewinner()
{
    let winnerz;
    if(YOU['score']<=21)
    {
        if(YOU['score']>DEALER['score'] || DEALER['score']>21)
        {
            blackjackjgame['winz']++;
            winnerz=YOU;
            
        }
        else if(YOU['score']<DEALER['score'])
        {
            blackjackjgame['losz']++;
            winnerz=DEALER;
           
        }
        else if(YOU['score']===DEALER['score'])
        {
            blackjackjgame['drawz']++;
        }
    }
    else if(YOU['score']>21 && DEALER['score']<=21)
    {
        blackjackjgame['losz']++;
        winnerz= DEALER;
        
    }
    else if(YOU['score']>21 && DEALER['score']>21)
    {
        blackjackjgame['drawz']++;

    }
    else{
        blackjackjgame['winz']++;
        winnerz=YOU;
       
    }
    return winnerz;
}
function showwinner(winnerz)

{
    let mssg,mssgcolor;
    if(blackjackjgame['allturns']===true)
    {
    if(winnerz===YOU)
    {
        document.querySelector('#wins').textContent=blackjackjgame['winz'];
        mssg='YOU WON';
        mssgcolor='green'
        winsound.play();
        
        
    }
    else if(winnerz===DEALER)
    {
        document.querySelector('#loses').textContent=blackjackjgame['losz'];
        mssg='YOU LOSE';
        mssgcolor='red';
        losesound.play();
       
    }
    else{
        document.querySelector('#draws').textContent=blackjackjgame['drawz'];
        mssg='YOU DREW';
        mssgcolor='black';
        
    }
    document.querySelector('#blackjack-status').textContent=mssg;
    document.querySelector('#blackjack-status').style.color=mssgcolor;
}
}


