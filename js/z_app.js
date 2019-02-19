window.onload = () => {
    
    'use strict';
    
    // set the width and height to the device sizes
    document.getElementById('container').style.width = W+'px';
    document.getElementById('container').style.height = H+'px';
    
    // set the contols container to the screen height
    document.getElementById('infotable').style.height = H+'px';
    document.getElementById('info').style.height = H+'px';
    
    // set the target container
    $t = document.getElementById('target');

    // create the lights
    let i = $w.add_object_single(
                        1,
                        Light,{
                            x:hW,
                            y:hH-150,
                            li:50,
                            color:'#ffffff'
                        },
                        $t,
                        W,H
    );
    
    $w.add_object_single(
                        1,
                        Light,{
                            x:hW+250,
                            y:hH+150,
                            li:50,
                            color:'#ffffff'
                        },
                        i,
                        W,H
    );
    $w.add_object_single(
                        1,
                        Light,{
                            x:hW-250,
                            y:hH+150,
                            li:50,
                            color:'#ffffff'
                        },
                        i,
                        W,H
    );
    // create the squares to receive the light
    var j = $w.add_object(
                        1,
                        Target,{
                            x:hW+200,
                            y:hH+200,
                            color:'#f48000',
                            size:150
                        },
                        $t,
                        W,H
    );
    // if ANIMATE (set in config) then loop
    if(ANIMATE)$w.loop(true,i);
}



/**
 * @param {Object}
 * */
var Light = function(o) {
    this.i = o.i;
    this.x = o.x;
    this.y = o.y;
    this.z = o.z;

    this.speed = 0;
    this.timer = 0;
    this.bool = true;
    
    this.radius = 1;
    this.degrees = 120 * this.z;
    
    this.color = o.color;
    this.light_intensity = o.li; // the intensity of the light
    $w.canvas.zIndex(o.i,10);
    $w.canvas.circle(o.i,o.x,o.y,20,o.color);
    /**
     * example
     * (1 - (0/400)) = 0
     * (1 - (4/400)) = 0.99
     * (1 - (8/400)) = 0.98
     * (1 - (12/400)) = 0.97
     * ...
     * ...
     * */                  
}
/**
 * loop
 * */
Light.prototype.loop = function() {
    
    if (this.bool) {
        if(this.radius < 600)this.radius++;
    }else{
        if(this.radius > 1)this.radius--;
    }
    this.timer++;
    if (this.timer > 500) {
        this.timer = 0;
        if (this.bool) {
            this.bool = false;
        }else{
            this.bool = true;
        }
    }

    this.degrees++;
    if (this.degrees > 360) this.degrees -= 360;
    let angle = $w.math.radians(this.degrees);
    this.x = hW + Math.cos(angle) * this.radius;
    this.y = hH + Math.sin(angle) * this.radius;
    $w.canvas.circle(this.i,this.x,this.y,20,this.color);                    
}


/**
 * @param {Object}
 * */
var Target = function(o) {
    this.i = o.i;
    this.x = o.x;
    this.y = o.y;
    this.color = o.color;
    this.size = o.size;
    this.drawcount = 0;
    
    this.lightcolor;
    
    if (o.color.indexOf('#') > -1) {
            o.color = hexToRgb(o.color,true);
    }else{
            o.color = helperRGBToString(o.color);
    }
    this.lightcolor = $w.objects.Light[0].color;
    if (this.lightcolor.indexOf('#') > -1) {
            this.lightcolor = hexToRgb(this.lightcolor,true);
    }else{
            this.lightcolor = helperRGBToString(this.lightcolor);
    }
    for(let x=100; x<W; x+= this.size*2) {
        for(let y=100; y<H; y+= this.size*2) {
            this.draw(x,y,this.size,this.size,o.color,this.lightcolor);
        }
    }  
}
/**
 * loop
 * */
Target.prototype.loop = function() {
    for(let x=100; x<W; x+= this.size*2) {
        for(let y=100; y<H; y+= this.size*2) {
            this.draw(x,y,this.size,this.size,this.color,this.lightcolor);
        }
    }
}
/**
 * draw - this is where I actually draw the effect of the light
 * @param {Number}
 * @param {Number}
 * @param {Number}
 * @param {Number}
 * @param {String}
 * @param {String}
 * */
Target.prototype.draw = function(x,y,w,h,color,lightcolor) {
    // @var - localize the resolution
    let res = RESOLUTION;
    // draw a white square
    $w.canvas.rectangle(this.i,x,y,w,h,'#fff');
    // for the size of the square rasterize and chnage the color of the pixel based on the amout of light hitting it
    // the squares are WHITE but they are drawn black because of the absence of reflective light
    for(let xx=0; xx<w; xx+=res) {
        for(let yy=0; yy<h; yy+=res) {
            // @var - init
             let c = null, cc = 0, cl = $w.objects.Light.length, min = {d:null,k:null};
             
             for(let j=0; j<cl; j++) {
                   let d = $w.motion.distance_to_point($w.objects.Light[j].x,$w.objects.Light[j].y,(x+xx),(y+yy));
                   //d += $w.objects.Light[j].z;
                   if (min.d == null) {
                        min.d = d;
                        min.k = j;
                   }else{
                        if (d < min.d) {
                            min.d = d;
                            min.k = j;
                        }
                   }
             }
             // calculate the intensity of the light
             cc = (1 - ((min.d/4)/$w.objects.Light[min.k].light_intensity));
             //cc = (1 - (($w.objects.Light[min.k].light_intensity) / (min.d*min.d)));
            // determine how the light will blend
             let bool = true;
             if (cc < -1) {
                c = '#000000';
                bool = false;
             }
            if (cc > 1) {
                c = '#ffffff';
                bool = false;
            }
            // blend the light
            if(bool)c = shadeBlendConvert(cc,color);
            // draw the square
            $w.canvas.rectangle(this.i,(x+xx),(y+yy),res,res,c,'fill');
        }
    }               
}