class pendu
{
  constructor() {
    this.score;
    if ('mydata' in localStorage)
    {
      this.arrayBestPlayer=JSON.parse(localStorage['mydata']);
    }
    else
    {
      this.arrayBestPlayer=new Array(10);
    }
    this.rang;
    this.d1;
    this.delay;
    this.mot;
    this.categorie;
    this.motchercher="";
    this.interval;
  }

  initialisation()
  {
    this.categorie = categoriWords[Math.floor(Math.random() * categoriWords.length)];
    this.mot = arrayWords[this.categorie][Math.floor(Math.random() * arrayWords[this.categorie].length)];
    this.score = 0;
    this.d1 = new Date();
    this.rang = 11;
    this.delay = 0;
    this.construireMot();
    this.buildArrayLetter();
    this.informationMot();
    this.ecrireMot();
  }

  construireMot()
  {
    for (var char=0; char<this.mot.length; char++)
    {
      this.motchercher +="_";
    }
  }

  buildArrayLetter()
  {
    var table = $('<table>').attr('id','tableauLettres');
    var elementLettre = 0;
    for(var i=0 ; i<3 ; i++)
    {
      var row = $('<tr>');
      for(var j=0; j < 10;j++ )
      {
        if( i == 2 && ( j == 0 || j == 1 || j == 8 || j == 9))
        {
          var cell =$('<td>');
          row.append(cell);
        }
        else
        {
          var cell =$('<td>').attr({id :"c"+alphabet[elementLettre]});
          var bout = $("<button>").text(alphabet[elementLettre]);
          bout.attr({class:"button2",id:"b"+alphabet[elementLettre]});
          cell.append(bout);
          row.append(cell);
          elementLettre ++;
        }
        
      }

      table.append(row);
    }
    $("#jouer").append(table);
  }

  informationMot()
  {
    for ( var element = 0; element<categoriWords.length;element++ )
    {
      if (this.categorie == categoriWords[element])
      {
        var ligne = $("<div>").text("Indice : le mot est un "+this.categorie);
        $("#jouer").append(ligne.attr({class:"text Space2"}));
        return;
      }
    }
  
  }
  ecrireMot()
  {
    var ligne = $("<div>").text(game.motchercher);
    $("#jouer").append(ligne.attr({class:"Soustitre",id:"motchercher"}));
    
  }


  start()
  { 
    this.initialisation();
    this.partie();
  }

  initialisationComputer()
  {
    this.score = 0;
    this.construireMot();
    this.buildArrayLetter();
    this.ecrireMot();
    this.alphabetOrdinateur = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  }

  startComputer()
  {
    this.initialisationComputer();
    this.partiecomputer();
  }

  partiecomputer()
  {
    var index = Math.floor(Math.random() * game.alphabetOrdinateur.length)
    var lettreChoisie = game.alphabetOrdinateur[index];
    game.alphabetOrdinateur.splice(index,1);
    game.blettre(lettreChoisie);
    
  }

  partie()
  {
    $("#bA").click(function() {game.blettre("A");});
    $("#bB").click(function() {game.blettre("B");});
    $("#bC").click(function() {game.blettre("C");});
    $("#bD").click(function() {game.blettre("D");});
    $("#bE").click(function() {game.blettre("E");});
    $("#bF").click(function() {game.blettre("F");});
    $("#bG").click(function() {game.blettre("G");});
    $("#bH").click(function() {game.blettre("H");});
    $("#bI").click(function() {game.blettre("I");});
    $("#bJ").click(function() {game.blettre("J");});
    $("#bK").click(function() {game.blettre("K");});
    $("#bL").click(function() {game.blettre("L");});
    $("#bM").click(function() {game.blettre("M");});
    $("#bN").click(function() {game.blettre("N");});
    $("#bO").click(function() {game.blettre("O");});
    $("#bP").click(function() {game.blettre("P");});
    $("#bQ").click(function() {game.blettre("Q");});
    $("#bR").click(function() {game.blettre("R");});
    $("#bS").click(function() {game.blettre("S");});
    $("#bT").click(function() {game.blettre("T");});
    $("#bU").click(function() {game.blettre("U");});
    $("#bV").click(function() {game.blettre("V");});
    $("#bW").click(function() {game.blettre("W");});
    $("#bX").click(function() {game.blettre("X");});
    $("#bY").click(function() {game.blettre("Y");});
    $("#bZ").click(function() {game.blettre("Z");});

  }

  blettre(lettre)
  {
    $("#c"+lettre).empty();
    if (game.checkLetter(lettre.toLowerCase()))
    {
      game.modifyMotChercher(lettre.toLowerCase());
      $("#motchercher").text(game.motchercher);
      $("#c"+lettre).text(lettre);
      $("#c"+lettre).attr({class:"lettreArray goodLetters"});
    }
    else
    {
      game.score += 1;
      $("#c"+lettre).text(lettre);
      $("#c"+lettre).attr({class:"lettreArray wrongLetters"});
      
    }
    
    game.remplirDessin();

    if(game.motchercher == game.mot)
    {
      if(!(typeof game.rang === 'undefined'))
      {
        game.end();
      }
      game.drawWin();
      setTimeout(game.win, 500);
    }
    else if(game.score == 7)
    {
     setTimeout(game.lost, 500);
    }
    else if(typeof game.rang === 'undefined' && game.score < 7)
    {
      setTimeout(game.partiecomputer,3000);
    }
    
  }

  checkLetter(letters)
  {
    if(game.mot.includes(letters))
    {
      return true;
    }
    return false;
  }

  modifyMotChercher(letters)
  {
    var tmp = "";
    for ( var char = 0 ; char<game.mot.length;char++)
    {
      if(game.mot[char]==letters)
      {
        tmp += letters;
      }
      else
      {
        tmp += game.motchercher[char];
      }
    }
    game.motchercher = tmp;
  }

  remplirDessin()
  {
    var canvas = document.getElementsByTagName('canvas')[0];
    var ctx = canvas.getContext('2d');
    if(game.score==1)
    {
      //Corde :
      ctx.beginPath();
      ctx.moveTo(105.5,  16.5);
      ctx.lineTo(105.5,40.5);
      ctx.stroke();
    }

    else if(game.score==2)
    {
      //Personne :
      ctx.beginPath();
      ctx.arc(105, 40, 15, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.moveTo(94.5, 37.5);
      ctx.lineTo(102.5, 37.5);
      ctx.stroke();
      ctx.moveTo(107.5, 37.5);
      ctx.lineTo(115.5, 37.5);
      ctx.stroke();
      ctx.moveTo(100.5, 45.5);
      ctx.lineTo(110.5, 45.5);
      ctx.stroke();
    }

    else if(game.score==3)
    {
      //Corps
      ctx.beginPath();
      ctx.moveTo(105.5, 54.5);
      ctx.lineTo(105.5, 80.5);
      ctx.stroke();
    }

    else if (game.score==4)
    {
      //Bras Gauche
      ctx.beginPath();
      ctx.moveTo(105.5, 64.5);
      ctx.lineTo(95.5, 78.5);
      ctx.stroke();
    }

    else if (game.score==5)
    {
      //Bras Droit
      ctx.beginPath();
      ctx.moveTo(105.5, 64.5);
      ctx.lineTo(115.5, 78.5);
      ctx.stroke();
    }

    else if (game.score==6)
    {
      //Jambe Gauche
      ctx.beginPath();
      ctx.moveTo(105.5, 80.5);
      ctx.lineTo(94.5, 95.5);
      ctx.stroke();
    }

    else if (game.score==7)
    {
      //Jambe Droite
      ctx.beginPath();
      ctx.moveTo(105.5, 80.5);
      ctx.lineTo(116.5, 95.5);
      ctx.stroke();
      //Mort
      ctx.moveTo(98.5, 33.5);
      ctx.lineTo(98.5, 41.5);
      ctx.stroke();
      ctx.moveTo(111.5, 33.5);
      ctx.lineTo(111.5, 41.5);
      ctx.stroke();
      ctx.font = 'bold 18px arial';
      ctx.fillStyle = "black";
      ctx.fillText("Monde Cruel", 150, 40);
      game.interval = setInterval(game.animation,200);
    }


  }
  


  animation()
  {
    var canvas = document.getElementsByTagName('canvas')[0];
    var ctx = canvas.getContext('2d');
    if(i == -3)
    {
      j = 1 
    }
    else if(i == 3)
    {
      j = -1 
    }
    if (i<=3 && j==1)
    {
      i++;
    }
    else if (i<=3 && j==-1 )
    {
      i--;
    }

    ctx.clearRect(70, 17, 72, 80);
    ctx.save();
    ctx.translate(105.5,16.5);
    ctx.rotate(Math.PI/30*i);

    //corde
    ctx.beginPath()
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 24);
    ctx.stroke();

    //ctx.arc(105, 40, 15, 0, 2 * Math.PI); 
    //tete
    ctx.beginPath()
    ctx.arc(0, 24, 15, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();
    ctx.moveTo(-10, 21);
    ctx.lineTo(-3, 21);
    ctx.stroke();
    ctx.moveTo(3, 21);
    ctx.lineTo(10, 21);
    ctx.stroke();
    ctx.moveTo(-5, 29);
    ctx.lineTo(5, 29);
    ctx.stroke();
    ctx.moveTo(-7, 17);
    ctx.lineTo(-7, 25);
    ctx.stroke();
    ctx.moveTo(7, 17);
    ctx.lineTo(7, 25);
    ctx.stroke();

    //Corps
    ctx.beginPath();
    ctx.moveTo(0, 38);
    ctx.lineTo(0, 64);
    ctx.stroke();
    //Bras Gauche
    ctx.beginPath();
    ctx.moveTo(0, 48);
    ctx.lineTo(-10, 62);
    ctx.stroke();

    //Bras Droit
    ctx.beginPath();
    ctx.moveTo(0, 48);
    ctx.lineTo(10, 62);
    ctx.stroke();

    //Jambe Gauche
    ctx.beginPath();
    ctx.moveTo(0, 64);
    ctx.lineTo(-11, 79);
    ctx.stroke();

    //Jambe Droite
    ctx.beginPath();
    ctx.moveTo(0, 64);
    ctx.lineTo(11, 79);
    ctx.stroke();
    ctx.restore();
  }


  end()
  {
    var d2=new Date();
    this.delay=Math.floor((d2.getTime()-this.d1.getTime())/1000);
    this.hallofFame();
  }

  hallofFame()
  {
    for(var i=0;i<this.arrayBestPlayer.length;i++)
    {
      if(typeof this.arrayBestPlayer[i] === 'undefined')
      {
        this.rang=i;
        this.arrayBestPlayer[i]=["",this.score,this.delay];
        return;
      }
      else 
      {
        if(this.arrayBestPlayer[i]==null)
        {
          this.rang=i;
          this.arrayBestPlayer[i]=["",this.score,this.delay];
          return;
        }
        else if(this.arrayBestPlayer[i][1]>this.score || (this.arrayBestPlayer[i][1] == this.score &&this.arrayBestPlayer[i][2]>=this.delay) )
        {
          this.rang=i;
          this.arrayBestPlayer.splice(i,0,["",this.score ,this.delay])
          if(this.arrayBestPlayer.length>10)
          {
            this.arrayBestPlayer.pop();
          }
          return;
        }
      }
    } 
  }

  drawWin()
  {
    var canvas = document.getElementsByTagName('canvas')[0];
    var ctx = canvas.getContext('2d');
    ctx.clearRect(85, 17, 40, 80);

    ctx.beginPath();

    //Personne :
    ctx.arc(215, 80, 15, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(208, 78, 4,  Math.PI, 2 * Math.PI   );
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(222, 78, 4,  Math.PI, 2 * Math.PI   );
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(215, 83, 5,  0,  Math.PI   );
    ctx.stroke();
    ctx.beginPath();

    //Bras Gauche
    ctx.moveTo(215.5, 105.5);
    ctx.lineTo(200.5, 115.5);
    ctx.stroke();

    //Bras Droit
    ctx.moveTo(215.5, 105.5);
    ctx.lineTo(230.5, 115.5);
    ctx.stroke();

    //Corps
    ctx.moveTo(215.5, 94.5);
    ctx.lineTo(215.5, 120.5);
    ctx.stroke();

    //Jambe Gauche
    ctx.moveTo(215.5, 120.5);
    ctx.lineTo(204.5, 138.5);
    ctx.stroke();

    //Jambe Droite
    ctx.moveTo(215.5, 120.5);
    ctx.lineTo(226.5, 138.5);
    ctx.stroke();

    ctx.font = 'bold 18px arial';
    ctx.fillStyle = "black";
    ctx.fillText("Bien joué", 100, 80);
  }

  win()
  {
    $("#jouer").empty();
    if(typeof game.rang === 'undefined')
    {
      var affi = $("<span>").text("Bravo l'ordinateur a trouvé le mot était : "+game.mot);
      affi.attr({class:"Soustitre",id:"CenterScreen"});
      $("#jouer").append(affi);
      setTimeout(rejouer, 3000);
    }
    else
    {
      var affi1 = $("<span>").text("Bravo c'est gagné le mot était : "+game.mot);
      affi1.attr({class:"Soustitre",id:"affichage1"});
      if(game.rang<10)
      {
        var affi2 = $("<div>").text("Vous êtes au classement : "+(game.rang+1));
        affi2.addClass("text");
    
        var affi3 = $("<span>").text("Entrez votre nom :  ");;
        affi3.attr({class:"text",id:"affichage3"});
    
        var inp = $("<input>").attr({class:"inputs",id:"input",placeholder:"Your Name"});
      
        var buttonAffi = $("<button>").attr({class:"button",id:"buttonAffi"});
        buttonAffi.text("OK");
    
        affi3.append(inp,buttonAffi);
        affi1.append(affi2);
        $("#jouer").append(affi1,affi3);
        $("#buttonAffi").click(game.remplieHoF);
      }
      else
      {
        $("#jouer").append(affi1);
        setTimeout(rejouer, 3000);
      }
    }
  }

  remplieHoF(){
    $("#buttonAffi").remove();
    game.arrayBestPlayer[game.rang][0]=$("#input").val();
    if($("#Nom"+(game.rang+1)).html()!="..."){
      for(var l=10;l>(game.rang+1);l--){
        $("#Nom"+(l)).text($("#Nom"+(l-1)).html());
        $("#Erreurs"+(l)).text($("#Erreurs"+(l-1)).html());
        $("#Temps"+(l)).text($("#Temps"+(l-1)).html());
      }
    }
    $("#Nom"+(game.rang+1)).text($("#input").val());
    $("#Erreurs"+(game.rang+1)).text(game.score);
    $("#Temps"+(game.rang+1)).text(game.delay);
    $("#input").val(" ");
    setTimeout(rejouer, 3000);

  }

  lost()
  {
    $("#jouer").empty();
    if(typeof game.rang === 'undefined')
    {
      var affi = $("<span>").text("Dommage l'ordinateur n'a pas trouvé le mot : "+game.mot);
      affi.attr({class:"Soustitre",id:"CenterScreen"});
      $("#jouer").append(affi);
      setTimeout(rejouer, 3500);
    }
    else
    {
      var affi1 = $("<span>").text("Dommage c'est perdu le mot était : "+game.mot);      
      affi1.attr({class:"Soustitre",id:"CenterScreen"});
      $("#jouer").append(affi1);
      setTimeout(rejouer, 3500);
    }
  }

  
}


function commencer(){
  $("#jouer").empty();
  $(".tableau").empty();
  $(".tableau").removeAttr("id", "tableau2");
  var question = $("<h1>").text(" Quel mode de jeu voulez vous sélectionner ?");
  $("#jouer").append(question.attr({class:"Soustitre"}));
  var divv = $("<div>").attr({class:"Space"});
  var buttonFindWord = $("<button>").text("Trouver un mot");
  buttonFindWord.attr({class:"button",id:"buttonFindWord"});
  divv.append(buttonFindWord);
  var buttonGiveWord = $("<button>").text("Donner un mot");
  buttonGiveWord.attr({class:"button",id:"buttonGiveWord"});
  $("#jouer").append(divv,buttonGiveWord);

  $("#buttonFindWord").click(trouverMot);
  $("#buttonGiveWord").click(donnerMot);
  
}

function trouverMot()
{
  $("#jouer").empty();
  game = new pendu();
  creatependu();
  createArray();
  game.start();
}

function donnerMot()
{
  $("#jouer").empty();
  var donMot = $("<span>").text("Donner un mot (sans accents ni tiret): ");
  donMot.attr({class:"text Space3",id:"CenterScreen"});
  var inp = $("<input>").attr({class:"inputs",id:"input",placeholder:"3-10 caracteres"});
  var buttonWord = $("<button>").text("Continuer");
  buttonWord.attr({class:"button ",id:"buttonWord"});
  $("#jouer").append(donMot);
  donMot.append(inp,$("<span>").text(" "),buttonWord);

  $("#buttonWord").click(checkWord);
}

function checkWord()
{
  var mot = $("#input").val();
  var flag = 0;
  if (mot.length < 3 || mot.length > 10 )
  {
    flag=1;
    mauvais();
  }
  for (var lettre = 0; lettre<mot.length ; lettre++)
  {
    if(!alphabet.includes(mot[lettre].toUpperCase()))
    {
      flag=1;
      mauvais();
    }
  }
  if(flag == 0)
  {
    goodWord(mot);
  } 
}

function mauvais()
{
  $("#jouer").empty();
  var mauvais = $("<span>").text("Mot incorrect");
  mauvais.attr({class:"Soustitre ",id:"CenterScreen"})
  $("#jouer").append(mauvais);
  setTimeout(donnerMot,1000);
}

function goodWord(mot)
{
  $("#jouer").empty();
  game = new pendu();
  game.mot = mot;
  creatependu();
  game.startComputer();
}

function rejouer()
{
  clearInterval(game.interval);
  localStorage["mydata"] = JSON.stringify(game.arrayBestPlayer);
  $("#jouer").empty();
  if(!(typeof game.rang === 'undefined'))
  {
    $(".tableau").removeAttr("id", "tableau1"); 
    $(".tableau").attr("id", "tableau2");
  }
  var canvas = document.getElementsByTagName('canvas')[0];
  document.getElementById("drawPendu").removeChild(canvas);
  $(".dessin").removeAttr("id", "drawPendu");
  var question = $("<h1>").text(" Voulez vous rejouer ?");
  $("#jouer").append(question.attr({class:"Soustitre"}));
  var divv = $("<div>").attr({class:"Space"});
  var buttonOui = $("<button>").text("Oui");
  buttonOui.attr({class:"button",id:"buttonOui"});
  var buttonNon = $("<button>").text("Non");
   buttonNon.attr({class:"button",id:"buttonNon"});
  divv.append(buttonOui,$("<span>").text(" "),buttonNon);
  $("#jouer").append(divv);

  $("#buttonOui").click(commencer);
  $("#buttonNon").click(quitter);
  
}

function quitter()
{
  $("#jouer").empty();
  $(".tableau").empty();
  $(".tableau").removeAttr("id", "tableau2");
  var er = $("<span>").text("Merci et à bientôt !");
  $("#jouer").append(er.attr({class:"Soustitre",id :"CenterScreen"}));
  setTimeout(function(){$("#jouer").empty();$("#jouer").removeAttr("id", "jouer" );$(document.body).removeAttr("id","template")},1500);
}

function creatependu()
{
  $(".dessin").attr('id',"drawPendu");
  document.getElementById("drawPendu").appendChild(document.createElement("canvas"));

  var canvas = document.getElementsByTagName('canvas')[0];
  canvas.id = "canvasDraw";
  var ctx = canvas.getContext('2d');
 
  //Sol :
  ctx.beginPath();
  ctx.strokeStyle = "green";
  ctx.lineWidth = 4;
  ctx.moveTo(0, 138);
  ctx.lineTo(300, 138);
  ctx.stroke();
  ctx.fillStyle = "saddlebrown";
  ctx.fillRect(0, 140, 300, 10);

  //Socle :
  ctx.fillStyle = "peru";
  ctx.fillRect(15, 112, 151, 23);
  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgba(0, 0, 0,1)";
  ctx.strokeRect(14.5, 112.5, 152, 23);

  //Echafaud :
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "black";
  ctx.moveTo(29.5, 111.5);
  ctx.lineTo(29.5, 0.5);
  ctx.lineTo(45.5, 0.5);
  ctx.lineTo(45.5, 111.5);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
  ctx.moveTo(46,  0.5);
  ctx.lineTo(135.5,  0.5);
  ctx.lineTo(135.5, 16.5);
  ctx.lineTo(46, 16.5);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
  ctx.moveTo(45.5, 26.5);
  ctx.lineTo(55.5, 16.5);
  ctx.lineTo(65.5, 16.5);
  ctx.lineTo(45.5, 36.5);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
   
}

function createArray()
{
  var table = $('<table>').attr('id','tableauScore');
  var row = $('<tr>');
  for(var nb=0;nb<tab.length;nb++)
  {
    var cell =$('<td>').text(tab[nb]);
    row.append(cell.addClass("text"));
  }
  table.append(row);
  
  
  for(var i = 1 ; i <= game.arrayBestPlayer.length; i++) 
  {
    row = $('<tr>');
    cell =$('<td>').text(i);
    row.append(cell.addClass("text"));
    
    if(game.arrayBestPlayer[i-1]!=null )
    {
      for(col = 1;col<=game.arrayBestPlayer[i-1].length;col++)
      {
        cell =$('<td>').text(game.arrayBestPlayer[i-1][col-1]);
        cell.addClass("soustext");
        row.append(cell.attr('id',""+tab[col]+i));
      }
    }
    else
    {
      for(col = 1;col<tab.length;col++)
      {
        cell =$('<td>').text("...");
        cell.addClass("soustext");
        row.append(cell.attr('id',""+tab[col]+i));
      }

    }
    
    table.append(row);
  }

 
  $(".tableau").append(table);
  $(".tableau").attr('id',"tableau1");
  table.attr('border', 1);
  table.css('text-align', 'center');
  $('tr:odd').css('background-color', 'gray');
}

var game;
var alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
var tab=["Rang","Nom","Erreurs","Temps"];
var arrayWords = {animal:["alligator","buffle","caribou","dromadaire","ecureuil","faucon","gazelle","hibou","jaguar","koala","loup","lion","marmotte","ours","panda","renard","suricate","tortue","vautour","zebre"],
fruit:["avocat","abricot","banane","cerise","fraise","kiwi","mangue","marron","melon","orange","pasteque","poire","pomme"],
legume:["asperge","betterave","brocoli","carotte","epinard","fenouil","haricot","lentille","patate","potiron","radis","soja"],
sport:["athletisme","basketball","course","danse","escalade","football","gymnastique","hockey","judo","karate","lutte","musculation","natation","patinage","rugby","ski","tennis","volleyball","waterpolo"],
transport:["avion","bateau","camion","dirigeable","helicoptere","limousine","metro","moto","planeur","quad","scooter","train","velo","voiture"],
};
var categoriWords = ["animal","fruit","legume","sport","transport"];

var i = 0;
var j = 1;

//localStorage.clear();
