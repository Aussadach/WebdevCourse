$(function(){
    $("#slider").slider({
        min: 3,
        max:30,
        slide:function(event,ui){
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
        }
    });

    // var canvas = document.getElementById("paint");
    // var context = canvas.getContext('2d');
    
    //declare variable
        //paintingerasing or not
        var paint = false ;
        //painting or erasing
        var paint_erase = "paint" ; 
        //get the canvas and context
        var canvas = document.getElementById("paint");
        var ctx = canvas.getContext("2d") ; 
        //get the canvas container 
        var container = $("#container");
        //mouse position
        var mouse = {
            x:0 , y : 0 ,
        };
    //onload load saved work from LocalStorage 
    if(localStorage.getItem("imgCanvas") != null){
        var img = new Image();
        img.onload = function(){
            ctx.drawImage(img, 0,0);

        }
        img.src = localStorage.getItem("imgCanvas");

    }
    //set drawing parameter (lineWidth,lineJoin line Cap)
    ctx.lineWidth = 3 ;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    //click inside container
    container.mousedown(function(e){
        paint = true ;
        //window.alert(paint);
        ctx.beginPath();
        mouse.x =  e.pageX - this.offsetLeft;
        mouse.y =  e.pageY - this.offsetTop;
        ctx.moveTo(mouse.x,mouse.y);
        
    });
    //move the mouse while holding mouse key
    container.mousemove(function(e){
        ctx.beginPath();
        mouse.x =  e.pageX - this.offsetLeft;
        mouse.y =  e.pageY - this.offsetTop;
        if(paint == true){
            if(paint_erase == 'paint'){
                //get color input
                ctx.strokeStyle = $("#paintColor").val() ;
            }
            else{
                //color to white
                ctx.strokeStyle = "white" ;
            }
            ctx.lineTo(mouse.x,mouse.y);
            ctx.stroke();
        }   
        
    });
    //mouse up --> we are not paintingerasing anymore
    container.mouseup(function(){
        paint = false ;


    });
    //if we leave the container we are not paintingerasing anymore
    container.mouseleave(function(){
        paint = false ;

    });

    //click on the reset button
    $("#reset").click(function(){
        ctx.clearRect(0,0, canvas.width , canvas.height);
        paint_erase = "paint";
        $("#erase").removeClass("erasemode");
    });
    //click on save button 
    $("#save").click(function(){
        if(typeof(localStorage) != null){
            localStorage.setItem("imgCanvas",canvas.toDataURL());
            window.alert("Saved");
        }else{
            window.alert("Local storage not available");
    
        }
    })
    //click on the erase button 
    $("#erase").click(function(){
        if(paint_erase == 'paint'){
            paint_erase = 'erase';

        }else{
            paint_erase = 'paint' ;

        }
        $(this).toggleClass("erasemode");

    });
    //change color input
    $('#paintColor').change(function(){
        $("#circle").css("background-color", $(this).val())

    });
    //change lineWidth using slider 
    $("#slider").slider({
        min: 3,
        max:30,
        slide:function(event,ui){
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
            ctx.lineWidth = ui.value ;
        }
    });
    //function


    // //draw a line
    // //declare new path
    // context.beginPath();


    // //set line width
    // context.lineWidth = 40;

    // //set line color
    // context.strokeStyle = '#42e565';
    // //set cap to the line (round , butt ,square)
    // context.lineCap = 'round'
    // //set line joint
    // context.lineJoin = 'round';

    // //position the context point
    // context.moveTo(50,50);
    // //draw a straight line from starting pont to a new position
    // context.lineTo(200,200)
    // //draw another line
    // context.lineTo(400,100)

    // //make line 
    // context.stroke();

});

