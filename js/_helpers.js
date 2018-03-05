/**
 * Helpers
 * */

/**
 * opens and closes the controls
 * */
function helperOpen() {
    let $info = document.getElementById('info');
    if($info.hasClass('open')) {
        $info.removeClass('open');   
    }else{
        $info.addClass('open');
    }
}
/**
 * sets the color of the squares to be lit
 * @param {Object}
 * @param {String}
 * */
function helperColor(_this,target) {
    let module = _this.closest('.module');
    let color = _this.value;
    let $target = module.getElementsByClassName('cresult')[0];
    $target.setAttribute('data-'+target,color);
    let r = $target.getAttribute('data-red');
    let g = $target.getAttribute('data-green');
    let b = $target.getAttribute('data-blue');
    let c = 'rgb('+r+','+g+','+b+')';
    $target.style.background = c;
    $w.obj_set_var('Target','color',$w.color.rgbToHex(r,g,b));
}
/**
 * set the strength of the light
 * @param {Object}
 * */
function helperLightStrength(_this) {
    $w.obj_set_var('Light','light_intensity',_this.value);
}
/**
 * update the squares with new settings
 * @param {Object}
 * */
function helperSetSquares(_this) {
    $w.obj_set_var('Target','size',_this.value);
    helperRepaint('Target');
}
/**
 * update the render resolution
 * @param {Object}
 * */
function helperSetResolution(_this) {
    RESOLUTION = parseInt(_this.value);
    helperRepaint('Target');
}
/**
 * forces a repaint of the spcified object to update changes
 * @param {String}
 * */
function helperRepaint(obj) {
    let l = $w.objects[obj].length;
    for(let j=0; j<l; j++) {
        if (null != $w.objects[obj][j]) {
            $w.canvas.clear($w.objects[obj][j].i);
            j = l;
        }
    }
}
/**
 * create a CSS RGB string based on RGB
 * @param {Array}
 * */
function helperRGBToString(a) {
    return 'rgb('+a[0]+','+a[1]+','+a[2]+')';
}
