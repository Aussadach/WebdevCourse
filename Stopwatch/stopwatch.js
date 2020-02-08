$(function(){
    //variable
        //App mode
        var mode = false ;
        //time counter
        var time_counter = 0 ;
        //lap counter
        var lap_counter = 0 ;
        //variable for setInterval
        var action;
        //Number of laps
        var lapNumber = 0 ;
        //miniute , seconds , centisecond for the time lap
        var times_Min , times_sec , times_cent ;
        var lap_Min , lap_sec , lap_cent ;
    //On app load show start and lap button
        hideshowButtons("#start_button","#lap_button")
        //Click on start Button
        $("#start_button").click(function(){
            //mode on
            mode = true ; 
            //show stop and lap button
            hideshowButtons("#stop_button","#lap_button")
            //start counter
            startAction();



        });
            

        //Click on stop Button
        $("#stop_button").click(function(){
            //show resume and reset button
            hideshowButtons("#resume_button","#reset_button");
            //stop counter
            clearInterval(action);


        });
            

        //Click on resume Button
        $("#resume_button").click(function(){
            //show stop button and lap button
            hideshowButtons("#stop_button","#lap_button");
            //start action(counter)
            startAction();
        });

        //Click on reset button
        $("#reset_button").click(function(){
            //reload page
            location.reload();

        });
            

        //click on lap button
        $("#lap_button").click(function(){
            //if mode is on
            if(mode == true){
                //stop action
                clearInterval(action);
                //add lap
                lap_counter = 0 ;
                addLap();
                //start action
                startAction();
                
             
                
            }
        });
            
    
    //function
        //hide all show 2 selected 2 button
        function hideshowButtons(x,y){
            $(".control").hide();
            $(x).show();
            $(y).show();


        }
    
        // start counter
        function startAction(){
            action = setInterval(function(){
                time_counter++;
                if(time_counter == 100*60*100){
                    time_counter = 0;

                }
                lap_counter++;
                if(lap_counter == 100*60*100){
                    lap_counter = 0 ; 
                }
                updateTime();
            },10);
            


        }
        // convert counter to min sec centisec
        function updateTime(){
            // 1 minute = 60*100 = 6000 centisecond
            times_Min = Math.floor(time_counter/6000);
            //  1 sec = 100 centiscond
            times_sec = Math.floor((time_counter%6000)/100);
            //  the remainder
            times_cent = (time_counter%6000)%100;

            $("#time_min").text(format(times_Min));
            $("#time_sec").text(format(times_sec));
            $("#time_cen").text(format(times_cent));

            // 1 minute = 60*100 = 6000 centisecond
            lap_Min = Math.floor(lap_counter/6000);
            //  1 sec = 100 centiscond
            lap_sec = Math.floor((lap_counter%6000)/100);
            //  the remainder
            lap_cent = (lap_counter%6000)%100;

            $("#lap_min").text(format(lap_Min));
            $("#lap_sec").text(format(lap_sec));
            $("#lap_cen").text(format(lap_cent));
        }   

        //format number
        function format(number){
            if(number < 10 ){
                return '0'+number;

            }else{
                return number ; 

            }

        }

        //add lap detai inside the lap box
        function addLap(){
            lapNumber++;
            var myLapDetails = '<div class="lap_log_detail">'+
                                    '<div class = "lap_time_title">'+
                                        'Lap' + lapNumber +
                                    '</div>'+
                                    '<div class = "laptime">'+
                                    '<span>'+format(lap_Min)+'</span>'+':'+
                                    '<span>'+format(lap_sec)+'</span>'+':'+
                                    '<span>'+format(lap_cent)+'</span>'+
                                    '</div>'+
                                '</div>';
            $(myLapDetails).prependTo("#lap_log");

        }
});