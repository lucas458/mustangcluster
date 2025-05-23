function checarNumeroPrimo( n ) {
    for (let i = 2; i < n; i++) {
        if (n % i === 0) return false;
    }
    return n > 1;
}

function removeSpaces( str = '' ){
    return (str.replace(/  +/g, ' ')).trim();
}

Math.clamp = (value, min, max) => {
    if (value < min) return min;
    if (value > max) return max;
    return value;
};

function getSpacing( width, sizes = [] ){
    const sum = sizes.reduce((a, b) => a+b, 0);
    const len = (sizes.length - 1) >= 2? sizes.length - 1 : 2;
    return (width - sum) / len;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}


function map(x, in_min, in_max, out_min, out_max) {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function pad( v = 0 ){
    if ( v < 10 ) return '0' + v;
    return v.toString();
}


function shuffleArray( arr = [] ){
    for (let i = arr.length - 1; i >= 1; i--){
        let j = getRandomInt(0, i + 1);
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}


function fatorial(n){
    if (n > 1) {
        return n * fatorial(n - 1);
    }
    return n;
}

function leapYear(year){
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

const DATES    = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const WEEKDAYS = ["DOMINGO", "SEGUNDA", "TERÇA", "QUARTA", "QUINTA", "SEXTA", "SÁBADO"];
const MONTHS   = ["JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO", "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"];







function getMarkBig( value = 0 ){
    const mark = document.createElement("div");
    mark.classList.add("mark");

    mark.innerHTML = `
    <div class="markBig">
        <div></div>
        <div>${value}</div>
        <div></div>
    </div>
    `;

    return mark;
}


function getMarkMedium(){
    const mark = document.createElement("div");
    mark.classList.add("mark");

    mark.innerHTML = `
    <div class="markMedium">
        <div></div> 
        <div></div>
    </div>
    `;

    return mark;
}


function getMarkSmall(){
    const mark = document.createElement("div");
    mark.classList.add("mark");

    mark.innerHTML = `
    <div class="markSmall">
        <div></div>
    </div>
    `;

    return mark;
}







function generateRpmMarkList(){


    tachometer.querySelector(".markList").innerHTML = "";

    const AMOUNT_MARKS = 3 * 9 + 6;

    for (let i = 0; i < AMOUNT_MARKS; i++){

        if ( i % 10 == 0 ){ 
            tachometer.querySelector(".markList").appendChild( getMarkBig(i/10) );
            continue;
        }
        
        if ( i % 5 == 0 ){
            tachometer.querySelector(".markList").appendChild( getMarkMedium() ); 
            continue
        }
        
        tachometer.querySelector(".markList").appendChild( getMarkSmall() ); 
    }



    const STEP = map(100, 0, 3200, 0, 135);

    tachometer.querySelectorAll(".markList .mark").forEach((mark, index) => {
        const ANGLE = STEP * index;
        mark.style.transform = `rotate(${-45 + ANGLE}deg)`;

        if ( mark.querySelector(".markBig") != null ){
            mark.querySelector(".markBig").querySelector('div:nth-child(2)').style.transform = `rotate(${45 - ANGLE}deg)`;
        }

    });




    // LINEAR MARKS
    
    tachometer_linear.innerHTML = ""; 

    for (let i = 2; i < 6*9-3; i++){

        if ( i%10 == 0 && i > 0 ){ 
            tachometer_linear.appendChild( getMarkBig(i / 10 + 3) );
            continue;
        }
        
        if ( i % 5 == 0 && i > 0 ){
            tachometer_linear.appendChild( getMarkMedium() ); 
            continue
        }
        
        tachometer_linear.appendChild( getMarkSmall() ); 
        
    } 


}










function generateSpeedMarkList(){

    speedometer.querySelector(".markList").innerHTML = "";
    const AMOUNT_MARKS = 14 * 9 + 5;

    for (let i = 0; i < AMOUNT_MARKS; i++){

        if ( i%10 == 0){ 
            speedometer.querySelector(".markList").appendChild( getMarkBig(i * 2) );
            continue;
        }
        
        if ( i % 5 == 0 ){
            speedometer.querySelector(".markList").appendChild( getMarkMedium() ); 
            continue
        }
        
        speedometer.querySelector(".markList").appendChild( getMarkSmall() ); 
        
    }

    
    const STEP = 270 / (AMOUNT_MARKS - 1);

    speedometer.querySelectorAll(".mark").forEach((mark, index) => {
        const ANGLE = STEP * index;
        mark.style.transform = `rotate(${-45 + ANGLE}deg)`;

        if ( mark.querySelector(".markBig") != null ){
            mark.querySelector(".markBig").querySelector('div:nth-child(2)').style.transform = `rotate(${45 - ANGLE}deg)`;
        }

    });

}






















function getMiniGauge(markCounts = 8, isTemperatureGauge = true, labels = ['100', '200'], iconPath = '', unit = '°F'){


    const miniGauge = document.createElement("div");
    miniGauge.classList.add("miniGauge");

    miniGauge.innerHTML = `
    <div class="miniGaugeSquareToHidden"></div>
    <div class="miniGaugeShadow"></div>
    <div class="miniGaugeMarkList"></div>
    
    <div class="miniGaugeNeedle">
        <div></div>
    </div>

    <div class="miniGaugeLabels">
        <div>${labels[0]}</div>
        <div>${labels[1]}</div>
    </div>

    <div class="miniGaugeUnit">°F</div>

    <div class="miniGaugeIcon">
        <img src="oil_temperature.svg">
    </div>
    
    `;



    if ( !isTemperatureGauge ){
        miniGauge.style.background = "conic-gradient(from 135deg, #353535 90deg)";
    }


    if ( unit == null ){
        miniGauge.querySelector(".miniGaugeUnit").remove();
    }else{ 
        miniGauge.querySelector(".miniGaugeUnit").innerHTML = unit;
    }


    if ( iconPath == null ){
        miniGauge.querySelector(".miniGaugeIcon").remove();
    }else{ 
        miniGauge.querySelector(".miniGaugeIcon").innerHTML = `<img src="${iconPath}">`;
    }


    const STEP = 268 / (markCounts - 1); 

    for (let i = 0; i < markCounts; i++){
        const miniGaugeMark = document.createElement("div");
        miniGaugeMark.innerHTML = "<div></div>";
        
        if ( i % 5 == 0 ){
            miniGaugeMark.classList.add("miniGaugeMarkBig");
        }else{
            miniGaugeMark.classList.add("miniGaugeMarkSmall");
        }

        miniGaugeMark.style.transform = `rotate(${ -44.5 + (STEP*i) }deg)`;
        miniGauge.querySelector(".miniGaugeMarkList").appendChild(miniGaugeMark);
    } 

    return miniGauge;


}



function generateMiniGauges(){

    miniGaugeList.innerHTML = "";
    
    const GAUGES = [

        {
            markCounts: 21,
            isTemperatureGauge: true,
            labels: ['100', '300'],
            unit: '°F',
            icon: ''
        },
        {
            markCounts: 0,
            isTemperatureGauge: true,
            labels: ['L', 'H'],
            unit: '',
            icon: 'oil_temperature.svg'
        },
        {
            markCounts: 26,
            isTemperatureGauge: false,
            labels: ['140', '340'],
            unit: '°F',
            icon: ''
        }

    ];


    GAUGES.forEach(gaugeObject => {
        const GAUGE_ELEMENT = getMiniGauge(gaugeObject.markCounts, gaugeObject.isTemperatureGauge, 
                                            gaugeObject.labels, gaugeObject.icon, gaugeObject.unit);
        
        rotateMiniGauge(GAUGE_ELEMENT, 0);
        miniGaugeList.appendChild(GAUGE_ELEMENT);
    }); 

}



function rotateMiniGauge(gaugeElement, newAngle = 0){
    newAngle = Math.clamp(newAngle, 0, 270);
    gaugeElement.querySelector('.miniGaugeNeedle').style.transform = `rotate(${ -45 + newAngle }deg)`;

    const ANGLE = map(newAngle, 0, 270, 0, 360-90);

    gaugeElement.querySelector(".miniGaugeShadow").style.transform = `rotate(${ 90 + ANGLE }deg)`;
    gaugeElement.querySelector(".miniGaugeShadow").style.background = `conic-gradient(from 135deg, #00000000 ${ 360 - ANGLE }deg, #00000000 0deg, #0365c0 360deg)`;

}









 




function rotateBottomGauge( gaugeElement, newAngle = 0 ){
    newAngle = Math.clamp(newAngle, 0, 45);

    gaugeElement.querySelector('.bottomGaugeNeedle').style.transform = `rotate(${ -45 - newAngle * 2 }deg)`;

    gaugeElement.querySelector(".bottomGaugeShadow").style.transform = `rotate(${ -180 - newAngle * 2 }deg)`;
    gaugeElement.querySelector(".bottomGaugeShadow").style.background = `conic-gradient(from 135deg, #00000000 ${ 270 }deg, #0365c0 0deg, #00000000 360deg)`;

}
















function setRPM( rpmValue ){ 
    rpmValue = Math.clamp(rpmValue, 0, 8000);
    

    if ( rpmValue <= 3200 ){
        
        needleRPM.style.transform = `translateY(-85px) rotate(${-135 + map(rpmValue, 0, 3200, 0, 135) }deg) translateX(0px)`;
        
        const ANGLE = 135 + map(rpmValue, 0, 3200, 0, 135);

        tachometer.querySelector(".gradientShadow").style.transform = `rotate(${ANGLE}deg)`;
        tachometer.querySelector(".gradientShadow").style.background = `conic-gradient(from 90deg, #00000000 ${270 - ANGLE}deg, #00000000 0deg, #0365c0 540deg)`;

        tachometer_linear_shadow.style.width = '0px';

    }else{
        
        needleRPM.style.transform = `translateY(-85px) rotate(0deg) translateX(${ map(rpmValue, 3200, 8000, 0, 385.3) }px)`;

        tachometer.querySelector(".gradientShadow").style.transform = `rotate(${ map(rpmValue, 3200, 8000, 270, 495) }deg)`; 

        tachometer_linear_shadow.style.width = map(rpmValue, 3200, 8000, 0, 385) + 'px';

    }



    

    const AMOUNT_MARKS_ACTIVE = Math.ceil(rpmValue * 82 / 8000);

    tachometer.querySelectorAll(".mark").forEach((mark, index) => {
        mark.classList.toggle("markActive", index < AMOUNT_MARKS_ACTIVE)
    });


}



function setSpeed( speedValue = 0 ){ 

    const ANGLE = map(speedValue, 0, 260, 0, 360-90);
    
    speedValue = Math.clamp(speedValue, 0, 260);
    
    
    
    speedometer.querySelector(".meterDiscValue").innerHTML = Math.trunc(speedValue);
    needleSpeed.style.transform = `translateY(-85px) rotate(${ -135 + map(speedValue, 0, 260, 0, 360-90) }deg) translateX(0px)`;


    speedometer.querySelector(".gradientShadow").style.transform = `rotate(${ 90+ map(speedValue, 0, 260, 0, 360-90) }deg)`;
    speedometer.querySelector(".gradientShadow").style.background = `conic-gradient(from 135deg, #00000000 ${ 360 - ANGLE}deg, #00000000 0deg, #0365c0 360deg)`;



    const AMOUNT_MARKS_ACTIVE = Math.ceil(speedValue * 131 / 260);

    speedometer.querySelectorAll(".mark").forEach((mark, index) => {
        mark.classList.toggle("markActive", index < AMOUNT_MARKS_ACTIVE)
    });
    

}






function setGear( gearValue = 'N' ){
    tachometer.querySelector(".meterDiscValue").innerHTML = gearValue;
    document.querySelectorAll(".bottomContentGearSelected").forEach(e => e.classList.remove('bottomContentGearSelected'));

    if ( gearValue == 'R' ){
        bottomContentGears.children[1].classList.add('bottomContentGearSelected');
        return;
    }

    if ( gearValue == 'N' ){
        bottomContentGears.children[2].classList.add('bottomContentGearSelected');
        return;
    }
    
    bottomContentGears.children[3].classList.add('bottomContentGearSelected');

}






function setFuel( percent = 0 ){

    percent = Math.clamp(percent, 0, 1);

    rotateBottomGauge(
        document.querySelectorAll(".bottomGaugeContainer")[1],
        percent * 45
    );

}










var currentRpm = 0;
var flagReverseRpm = false;

var currentSpeed = 0;
var flagReverseSpeed = false;


var miniGaugeValue = 0;
var miniGaugeFlagReverse = false; 


var bottomGaugeValue = 0;
var bottomGaugeFlagReverse = false;



function animateGauge(value, flag, step = 100, max = 8000){
    
    value += flag ? step : -step;
    
    if (value >= max) {
        flag = false;
    } else if (value <= 0) {
        flag = true;
    }
    
    return {value: value, flag: flag};

}



function update(){

    const currentRpmObject      = animateGauge(currentRpm, flagReverseRpm, 100, 8000);
    const currentSpeedObject    = animateGauge(currentSpeed, flagReverseSpeed, 1, 260);
    const miniGaugeObject       = animateGauge(miniGaugeValue, miniGaugeFlagReverse, 1, 270);
    const bottomGaugeObject     = animateGauge(bottomGaugeValue, bottomGaugeFlagReverse, 1, 45);
    
    // RPM
    currentRpm              = currentRpmObject.value;
    flagReverseRpm          = currentRpmObject.flag;
    // SPEED
    currentSpeed            = currentSpeedObject.value;
    flagReverseSpeed        = currentSpeedObject.flag;
    // MINI GAUGE
    miniGaugeValue          = miniGaugeObject.value;
    miniGaugeFlagReverse    = miniGaugeObject.flag;
    // BOTTOM GAUGE
    bottomGaugeValue        = bottomGaugeObject.value;
    bottomGaugeFlagReverse  = bottomGaugeObject.flag;

    
    setRPM(currentRpm);
    setSpeed(currentSpeed);
    document.querySelectorAll(".miniGauge").forEach(e => rotateMiniGauge(e, miniGaugeValue));                   // Mini Gauge Animation    
    document.querySelectorAll(".bottomGaugeContainer").forEach(e => rotateBottomGauge(e, bottomGaugeValue));    // Bottom Gauge Animation

    requestAnimationFrame(update);

}







onwheel = (event) => {

    const delta = (event.deltaY < 0)? 1 : -1;
    
    if ( event.shiftKey ){
        currentSpeed += delta;
        currentSpeed = Math.clamp(currentSpeed, 0, 260);
        console.log("SPEED:", currentSpeed);
        setSpeed(currentSpeed);
    }else{
        currentRpm += delta * 100;
        currentRpm = Math.clamp(currentRpm, 0, 8000);
        console.log("RPM:", currentRpm);
        setRPM(currentRpm);
    }

}








/////////////////// Live For Speed Connection ///////////////////

function sendRequest() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'request.php', true);
    xhr.mode = 'no-cors';
    
    xhr.onreadystatechange = function(){
        
        if (this.readyState == 4 && this.status == 200){

            if ( xhr.responseText != "{}" ){
                updateData(xhr.response);
            }

            sendRequest();

        }else if ( xhr.readyState == 4 ){
            timerRepaetRequest = setTimeout(sendRequest, 1000); 
        }
        
    }
    
    xhr.send();
}


    

    


function bytesToFloat32(bytes, littleEndian = true) {
    if (bytes.length !== 4) {
        throw new Error("O array deve conter exatamente 4 bytes.");
    }
    
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    
    for (let i = 0; i < bytes.length; i++) {
        view.setUint8(i, bytes[i]);
    }
    
    return view.getFloat32(0, littleEndian);
}


function byteArrayToInt32(bytes, littleEndian = true) {
    if (bytes.length !== 4) {
        throw new Error("O array deve conter exatamente 4 bytes.");
    }

    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);

    for (let i = 0; i < bytes.length; i++) {
        view.setUint8(i, bytes[i]);
    }

    return view.getInt32(0, littleEndian);
}


/*
    unsigned	Time;			// bytes: 04 offset: 00 -> time in milliseconds (to check order)
    char		Car[4];			// bytes: 04 offset: 04 -> Car name
    word		Flags;			// bytes: 02 offset: 08 -> Info (see OG_x below)
    byte		Gear;			// bytes: 01 offset: 10 -> Reverse:0, Neutral:1, First:2...
    byte		PLID;			// bytes: 01 offset: 11 -> Unique ID of viewed player (0 = none)
    float		Speed;			// bytes: 04 offset: 12 -> M/S
    float		RPM;			// bytes: 04 offset: 16 -> RPM
    float		Turbo;			// bytes: 04 offset: 20 -> BAR
    float		EngTemp;		// bytes: 04 offset: 24 -> C
    float		Fuel;			// bytes: 04 offset: 28 -> 0 to 1
    float		OilPressure;	// bytes: 04 offset: 32 -> BAR
    float		OilTemp;		// bytes: 04 offset: 36 -> C
    unsigned	DashLights;		// bytes: 04 offset: 40 -> Dash lights available (see DL_x below)
    unsigned	ShowLights;		// bytes: 04 offset: 44 -> Dash lights currently switched on
    float		Throttle;		// bytes: 04 offset: 48 -> 0 to 1
    float		Brake;			// bytes: 04 offset: 52 -> 0 to 1
    float		Clutch;			// bytes: 04 offset: 56 -> 0 to 1
    char		Display1[16];	// bytes: 16 offset: 60 -> Usually Fuel
    char		Display2[16];	// bytes: 16 offset: 76 -> Usually Settings
    int			ID;				// bytes: 04 offset: 92 -> optional - only if OutGauge ID is specified
*/



/*
    DL_SHIFT,			// bit 0	- shift light
    DL_FULLBEAM,		// bit 1	- full beam
    DL_HANDBRAKE,		// bit 2	- handbrake
    DL_PITSPEED,		// bit 3	- pit speed limiter
    DL_TC,				// bit 4	- TC active or switched off
    DL_SIGNAL_L,		// bit 5	- left turn signal
    DL_SIGNAL_R,		// bit 6	- right turn signal
    DL_SIGNAL_ANY,		// bit 7	- shared turn signal
    DL_OILWARN,			// bit 8	- oil pressure warning
    DL_BATTERY,			// bit 9	- battery warning
    DL_ABS,				// bit 10	- ABS active or switched off
    DL_ENGINE,			// bit 11	- engine damage
    DL_FOG_REAR,		// bit 12
    DL_FOG_FRONT,		// bit 13
    DL_DIPPED,			// bit 14	- dipped headlight symbol
    DL_FUELWARN,		// bit 15	- low fuel warning light
    DL_SIDELIGHTS,		// bit 16	- sidelights symbol
    DL_NEUTRAL,			// bit 17	- neutral light
    DL_18,
    DL_19,
    DL_20,
    DL_21,
    DL_22,
    DL_23,
    DL_NUM
*/
const DAHSLIGHTS_BITS = [
    "SHIFT", "FULLBEAM", "HANDBRAKE", "PITSPEED", "TC", 
    "SIGNAL_L", "SIGNAL_R", "SIGNAL_ANY", "OILWARN", "BATTERY",
    "ABS", "ENGINE", "FOG_REAR", "FOG_FRONT", "DIPPED", 
    "FUELWARN", "SIDELIGHTS", "NEUTRAL",
    "#18", "#19", "#20", "#21", "#22", "#23",
    "NUM"
];


function getDashLightSwitched( value = 0 ){
    return DAHSLIGHTS_BITS.filter((e, i) => (value & 1 << i) );
}


function updateData( data = "" ){
    const array = data.match(/.{2}/g).map(e => parseInt(e, 16));

    // console.log(array); 

    const GEAR               = array[10];
    const SPEED              = bytesToFloat32(array.slice(12, 12+4)) * 3.6; // KM/h
    const RPM                = bytesToFloat32(array.slice(16, 16+4));
    const ENGINE_TEMPERATURE = bytesToFloat32(array.slice(24, 24+4));
    const FUEL               = bytesToFloat32(array.slice(28, 28+4));
    const DASH_LIGHTS        = array.slice(40, 40+4);
    const SHOW_LIGHTS        = array.slice(44, 44+4);
    
    // console.log(DASH_LIGHTS, SHOW_LIGHTS); // 102,35
    const DAHSLIGHTS_NAMES = getDashLightSwitched(byteArrayToInt32(DASH_LIGHTS), true);
    const SHOWLIGHTS_NAMES = getDashLightSwitched(byteArrayToInt32(SHOW_LIGHTS), true);
    

    if ( GEAR == 0 ){
        setGear('R');
    }else if ( GEAR == 1 ){
        setGear('N');
    }else{
        setGear(GEAR - 1);
    }


    setSpeed(Math.trunc(SPEED));
    setRPM(Math.trunc(RPM));
    setFuel(FUEL);
    

    /*speedAtual.innerHTML = `SPEED: ${Math.trunc(SPEED)}`;
    rpmAtual.innerHTM = `RPM: ${Math.trunc(RPM)}`;
    temperaturaMotorAtual.innerHTML = `TEMP.: ${ENGINE_TEMPERATURE}°`;
    combustivelAtual.innerHTML = `FUEL: ${(FUEL * 100).toFixed(2)}%`;


    luzesLista.innerHTML = "";

    DAHSLIGHTS_NAMES.forEach(e => {
        const li = document.createElement('li');
        li.classList.toggle("luzLigada", SHOWLIGHTS_NAMES.includes(e));
        li.innerHTML = e;
        luzesLista.appendChild(li);
    });*/


}


///////////////////







onload = () => {
    
    generateSpeedMarkList();
    generateRpmMarkList();
    generateMiniGauges();
    
    //update();

    sendRequest();
}; 