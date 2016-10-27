///////////////////////////////////////////////////////////////
//------------------<<>>-----------\\
function sketch_01 ( sk ) {
//<<<<<<<-------->>>>>>>\\
  //GLOBALS FOR SKETCH
  var w = 2000 ;var h = 600;
  //GLOBALS FOR DATA
  var baseData;
  var dataSource = "assets/NA-Edited_stakeholders_emh.csv";
  var dataSource = "https://raw.githubusercontent.com/nicoazel/D3_js_01/master/NA-Edited_stakeholders_emh.csv";

  var stopData= {};
  var d3StopData;
  var index_nums;
  var array;

  var myButton;

  var theCatagories = [];
  var theHeadings = [];
  var theGroups = [];
  var theInstatutions = [];
  var Table =[];

  var headingInterface = [];
  var groupInterface = [];
//########//<<<<<<<<<<<<<<<<<<<<<<<<<||||||>>>>>>>>>>>>>>>>>>>>>>\\#########\\
//<<<<<<<-------->>>>>>>\\
  sk.preload = function(){
    //setup data
    baseData = sk.loadTable(dataSource, "csv");
  }//end preload
  //########//<<<<<<<<<<<<<<<<<<<<<<<<<||||||>>>>>>>>>>>>>>>>>>>>>>\\#########\\
//<<<<<<<-------->>>>>>>\\
   sk.setup = function (){
      //setup canvas
      sk.createCanvas(w, h);// gives us a canvas
      //construct info
      //>>>>>Headders
      for (var c = 4; c<baseData.getColumnCount(); c++){
        theCatagories.push(baseData.getRow(1).get(c))
        theHeadings.push(baseData.getRow(2).get(c))
      }
      //>>>>>instatution names & Master Table
      for (var i = 3; i<baseData.getRowCount(); i++){
        row = [];
        theInstatutions.push(baseData.getRow(i).get(2));
        theGroups.push(baseData.getRow(i).get(1));
        for (var c = 4; c<baseData.getColumnCount(); c++){
          row.push(baseData.getRow(i).get(c));
        }
        Table.push(row);
      }c

      var xx = 30;
      var yy = 15;
      var c = 0

      for (item of theHeadings){
        headingInterface.push( new aButton(xx,yy, item, sk.textWidth(item)+10, 20, 0,c)   );
        xx = xx+(sk.textWidth(item)+25);
        c+=1;
      }
      /*
      var xx = 30;
      var yy = 80;
      for (var item of theGroups.getUnique()){
        groupInterface.push( new aButton(xx,yy, item, sk.textWidth(item)+10, 20, 1,0) );
        yy = yy+25;
      }
      */console.log("theCatagories");
      console.log(theCatagories);
      myTable = new viewtable( 100, 800, 100, 400);
      console.log("end_setup");
      console.log("table");
      console.log(Table[0][20], "00");
      console.log(Table.length, "table length");
      console.log("theHeadings");
      console.log(theHeadings);
      sk.background(0);
   }// end sk.setup
//########//<<<<<<<<<<<<<<<<<<<<<<<<<||||||>>>>>>>>>>>>>>>>>>>>>>\\#########\\

//------------------------<<<<>>>>>-----------------------\\
//<<<<<<<-------->>>>>>>\\
   sk.draw = function (){
      sk.background(0);
      //if (myButton.isOver()){myButton.display();}
      myTable.display();
      for (var obj of headingInterface){
        obj.display();
        if (obj.isOver()){
          obj.tableSeek();
        }
        if (obj.runSeek){obj.tableSeek();}
      }
   }//End sk.draw
   //########//<<<<<<<<<<<<<<<<<<<<<<<<<||||||>>>>>>>>>>>>>>>>>>>>>>\\#########\\
//------------------------<<<<>>>>>-----------------------\\
   sk.mouseClicked = function(){
     for (var obj of headingInterface){
       if (obj.isOver()){
         if (!obj.isInTable){ console.log("not in table");myTable.addCol(obj.c);}
         else{console.log("was in table"); myTable.removeCol(obj.c); }
         obj.isInTable = !obj.isInTable;
       }
     }
   }
//########//<<<<<<<<<<<<<<<<<<<<<<<<<||||||>>>>>>>>>>>>>>>>>>>>>>\\#########\\
//------------------------<<<<>>>>>-----------------------\\
   sk.keyPressed = function(){myTable.table = [];}
//########//<<<<<<<<<<<<<<<<<<<<<<<<<||||||>>>>>>>>>>>>>>>>>>>>>>\\#########\\
//------------------------<<<<>>>>>-----------------------\\
   function viewtable( minx, w, miny, h){
     this.x = minx;
     this.y = miny;
     this.w = w;
     this.h = h;
     this.table = [];
     this.beingdisplayed = [];
     this.tableCols = [];
     //this.bd = [];
     //viewtable
     this.addCol = function(c){
       this.tableCols.push(c);
       console.log(this.tableCols, "in table");
     }// end addcol
     //view table
     this.removeCol = function(c){
       var newCols = [];
       for (col of this.tableCols){
         if (col ==c){ }
         else{newCols.push(col);}
       }// end col of tableCols

       this.tableCols = newCols;
       console.log(this.tableCols, "after removal");
     }//end remove col
     //view table
     this.display = function(){
       this.beingdisplayed = [];
       var obX = this.x;
       var obY = this.y;
       for (col of this.tableCols){
          for (var row = 0;row < Table.length; row++){
            rowItem = Table[row][col];
             if (rowItem){
               if (rowItem > 0){
                 var txt = theInstatutions[row];
                 if (this.test(txt, this.beingdisplayed )){ // retruns true if not in
                   //this.bd.push(txt);
                   this.beingdisplayed.push(txt);
                   sk.fill(137, 98, 185);
                   sk.rect(obX,obY,sk.textWidth(txt),15);
                   sk.fill(200);
                   sk.textAlign(sk.LEFT, sk.TOP);
                   sk.text(txt,obX, obY);
                   obX = obX +(sk.textWidth(txt)+5);
                   if (obX>(this.x+this.w-100)){
                     obX = this.x;
                     obY += 20;
                   } //IFF TEST LOCATOIN FOR SHIFT
                 }// END IF THIS.TEST  ((NOT in))
               }//end if row > 0
            }//END IF ROW
          }// END ROW IN TABLE[COL]
      }//END FOR COL OF THIS TABLE COLS
       //console.log(this.bd);
     }
     this.test = function(ob,list){ // ob is the institution to add, list is the lsit of instatutions
       var notIn = true;
       for (item of list){
         if (item == ob){
           notIn = false;      //true
         }
       }
       return notIn;
     }
   }// end viewtable( minx, w, miny, h)
//########//<<<<<<<<<<<<<<<<<<<<<<<<<||||||>>>>>>>>>>>>>>>>>>>>>>\\#########\\
//------------------------<<<<>>>>>-----------------------\\
   function aButton(x,y,name, w, h,r,c){
     //this.runSeek = false;
     this.isInTable = false;

      this.xloc = x;
      this.yloc = y;
      this.w = w;
      this.h = h;
      this.txt = name;
      this.r = r;
      this.c = c;
      this.xSize = 80;
      this.ySize = 20;
      this.xdis  = this.xSize/2;
      this.ydis  = this.ySize/2;

      //button
      this.display = function(){
        if (this.isInTable){sk.fill(61,168,204);}
        else{sk.fill(173, 171, 55);}

         sk.rect(this.xloc,this.yloc,this.w, this.h);
         sk.textAlign(sk.CENTER,sk.CENTER);
         sk.textSize(12);
         sk.fill(220);
         sk.text(this.txt,this.xloc+(this.w/2),this.yloc+(this.h/2));

         //if (this.runSeek){this.tableSeek();}
      }//end display
      //button
      this.isOver = function(){//return true false for over
         if((this.xloc<sk.mouseX)&&(sk.mouseX<this.xloc+this.w) && (this.yloc<sk.mouseY)&&(sk.mouseY<this.yloc+this.h)){
            sk.fill(10,150,10);
            sk.rect(this.xloc,this.yloc,this.w, this.h);
            sk.textAlign(sk.CENTER,sk.CENTER);
            sk.textSize(12);
            sk.fill(0);
            sk.text(this.txt,this.xloc+(this.w/2),this.yloc+(this.h/2));
            return true;
         }
         else{return false;}
      }//end isOVER
      //button
      this.tableSeek = function(){
        var xloc = 300;
        var yloc = 100;
        var r = 0;
        for (var row of Table){
          txt = theInstatutions[r];
          r+=1;
          if (row[this.c]){
            if (row[this.c]>0){
              if (row[this.c] == 1){sk.fill(44, 140, 69);}
              else if (row[this.c] == 2){sk.fill(20, 82, 34);}
              else{sk.fill(206, 70, 124);}
              sk.rect(xloc, yloc, sk.textWidth(txt)+10, 15 );
              sk.fill(200);
              sk.textAlign(sk.LEFT, sk.TOP);
              sk.text(txt, xloc, yloc);
              yloc+=20;
              if (yloc>sk.height-100){yloc =100;xloc +=200;}
            }//end if row[this.c]>0
          }//end if row[this.c]
        }//end for row of table
      }//end of table seek

   }// END OF THE BUTTON
//########//<<<<<<<<<<<<<<<<<<<<<<<<<||||||>>>>>>>>>>>>>>>>>>>>>>\\#########\\




//<<<<<<<-------->>>>>>>\\
}//end sketch_01 function
///////////////////////////////////////////////////////////////
