window.onload = () => {
                    'use strict';
                    
                    document.getElementById('container').style.width = W+'px';
                    document.getElementById('container').style.height = H+'px';
                    
                    document.getElementById('infotable').style.height = H+'px';
                    
                    $t = document.getElementById('target');
                    $i = document.getElementById('info');
                    $i.style.height = H+'px';
                    
                    
                    let i = $w.add_object_single(
                                        1,
                                        Light,{
                                            x:hW,
                                            y:hH-150,
                                            z:250,
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
                                            z:0,
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
                                            z:0,
                                            li:50,
                                            color:'#ffffff'
                                        },
                                        i,
                                        W,H
                    );
                    $w.add_object(
                                        1,
                                        Target,{
                                            x:hW+200,
                                            y:hH+200,
                                            color:'#f48000',
                                            width:50,
                                            height:50
                                        },
                                        $t,
                                        W,H
                    );
}

var Light = function(o) {
                    this.x = o.x;
                    this.y = o.y;
                    this.z = o.z;
                    this.color = o.color;
                    this.light_intensity = o.li; // the intensity of the light
                    $w.canvas.zIndex(o.i,10);
                    $w.canvas.circle(o.i,o.x,o.y,20,o.color);
                    //for(let i = 0; i < this.light_intesity; i+=4) {
                                        /**
                                         * example
                                         * (1 - (0/400)) = 0
                                         * (1 - (4/400)) = 0.99
                                         * (1 - (8/400)) = 0.98
                                         * (1 - (12/400)) = 0.97
                                         * ...
                                         * ...
                                         * */
                                        //$w.canvas.circle(o.i,o.x,o.y,i,'#FFFFFF',(1 - (i/this.light_intesity)));
                    //}
                    
}
Light.prototype.loop = function() {
                    
}
var Target = function(o) {
                    this.i = o.i;
                    this.x = o.x;
                    this.y = o.y;
                    if (o.color.indexOf('#') > -1) {
                                        o.color = hexToRgb(o.color,true);
                    }else{
                                        o.color = helperRGBToString(o.color);
                    }
                    let lightcolor = $w.objects.Light[0].color;
                    if (lightcolor.indexOf('#') > -1) {
                                        lightcolor = hexToRgb(lightcolor,true);
                    }else{
                                        lightcolor = helperRGBToString(lightcolor);
                    }
                    this.width = o.width;
                    this.height = o.height;
                    for(let x=100; x<W; x+= this.width*2) {
                        for(let y=100; y<H; y+= this.height*2) {
                            this.draw(x,y,this.width,this.height,o.color,lightcolor);
                        }
                    }
                    
}
Target.prototype.loop = function() {
                
}
Target.prototype.draw = function(x,y,w,h,color,lightcolor) {
  
                    $w.canvas.rectangle(this.i,x,y,w,h,'#fff');
                        for(let xx=0; xx<w; xx+=RESOLUTION) {
                            for(let yy=0; yy<h; yy+=RESOLUTION) {
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
                                 cc = (1 - ((min.d/4)/$w.objects.Light[min.k].light_intensity));
                                 let bool = true;
                                 if (cc < -1) {
                                    c = '#000000';
                                    bool = false;
                                 }
                                if (cc > 1) {
                                    c = '#ffffff';
                                    bool = false;
                                }
                                if(bool)c = shadeBlendConvert(cc,color);
                                $w.canvas.rectangle(this.i,(x+xx),(y+yy),RESOLUTION,RESOLUTION,c,'fill');
                            }
                        }
                    
}