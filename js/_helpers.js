function helperOpen() {
    let $info = document.getElementById('info');
    if($info.hasClass('open')) {
        $info.removeClass('open');   
    }else{
        $info.addClass('open');
    }
}
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
}
function helperRGBToString(a) {
    return 'rgb('+a[0]+','+a[1]+','+a[2]+')';
}
function helperUpdate() {
    helperOpen();
    $w.remove_object('Target',1);
    let $target = document.getElementById('targetcolor').getElementsByClassName('cresult')[0];
    let r = $target.getAttribute('data-red');
    let g = $target.getAttribute('data-green');
    let b = $target.getAttribute('data-blue');
    $w.add_object(
        1,
        Target,{
            x:hW+200,
            y:hH+200,
            color:[r,g,b],
            width:150,
            height:150
        },
        $t,
        W,H
    );
}
