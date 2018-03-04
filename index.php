<?php
        $dev = isset($_GET["dev"]) ? strtotime("now") : false;
    ?><!DOCTYPE html>
    <html>
        <head>
            <title>Page Title</title>
            <link href="css/style.css?<?php echo $dev; ?>" rel="stylesheet" />
        </head>
        <body>
            <div id="container">
                <div id="target"></div>
                <div id="info">
                        <table id="infotable">
                                <tr>
                                        <td>
                                                <img src="assets/arrows.svg" id="arrows" onclick="helperOpen()"/>
                                        </td>
                                        <td class="overflow">
                                                <div id="debug"></div>
                                                <div>
                                                        <button type="button" onclick="helperUpdate()">Update Changes</button>
                                                </div>
                                                
                                                <div class="module colorpicker">
                                                        <label for="targetcolor">
                                                                Square Color
                                                                <table id="targetcolor">
                                                                        <tr>
                                                                                <td class="red color">
                                                                                        
                                                                                </td>
                                                                                <td class="cresult" data-red="0" data-green="0" data-blue="0" rowspan="6" style="width: 100px">
                                                                                        
                                                                                </td>
                                                                        </tr>
                                                                        <tr>
                                                                                <td>
                                                                                        <input type="range" onchange="helperColor(this,'red')" min="0" max="255" value="0" />
                                                                                </td>
                                                                        </tr>
                                                                        <tr>
                                                                                <td class="green color">
                                                                                        
                                                                                </td>
                                                                        </tr>
                                                                        <tr>
                                                                                <td>
                                                                                        <input type="range" onchange="helperColor(this,'green')" min="0" max="255" value="0" />
                                                                                </td>
                                                                        </tr>
                                                                        <tr>
                                                                                <td class="blue color">
                                                                                        
                                                                                </td>
                                                                        </tr>
                                                                        <tr>
                                                                                <td>
                                                                                        <input type="range" onchange="helperColor(this,'blue')" min="0" max="255" value="0" />
                                                                                </td>
                                                                        </tr>
                                                                        
                                                                </table>
                                                        </label>
                                                </div>
                                                <div>
                                                        <button type="button" onclick="helperAddLight()">Add New Light</button>
                                                </div>
                                                <div class="module light">
                                                        <div class="remove" onclick="helperRemove(this)">X</div>
                                                        <label for="basiclight">
                                                                Basic Light
                                                                <table class="basiclight">
                                                                        <tr>
                                                                                <td class="red">
                                                                                        
                                                                                </td>
                                                                                <td class="cresult" data-red="0" data-green="0" data-blue="0" rowspan="6" style="width: 100px">
                                                                                        
                                                                                </td>
                                                                        </tr>
                                                                        <tr>
                                                                                <td>
                                                                                        <input type="range" onchange="helperColor(this,'red')" min="0" max="255" value="0" />
                                                                                </td>
                                                                        </tr>
                                                                        <tr>
                                                                                <td class="green">
                                                                                        
                                                                                </td>
                                                                        </tr>
                                                                        <tr>
                                                                                <td>
                                                                                        <input type="range" onchange="helperColor(this,'green')" min="0" max="255" value="0" />
                                                                                </td>
                                                                        </tr>
                                                                        <tr>
                                                                                <td class="blue">
                                                                                        
                                                                                </td>
                                                                        </tr>
                                                                        <tr>
                                                                                <td>
                                                                                        <input type="range" onchange="helperColor(this,'blue')" min="0" max="255" value="0" />
                                                                                </td>
                                                                        </tr>
                                                                        
                                                                </table>
                                                        </label>
                                                </div>
                                        </td>
                                </tr>
                        </table>
                </div>
            </div>
            <script src="js/wes.mantooth.js?<?php echo $dev; ?>"></script>
            <?php
                loadsscripts("js/");
                function loadsscripts($dir) {
                    global $dev;
                    // load files
                    $files = scandir($dir);
                    foreach($files as $file) {
                        if($file == "wes.mantooth.js" || (strpos($file,".js") === false)) {continue;}
                        echo '<script src="'.$dir.$file.'?'.$dev.'&v=1.1.1"></script>'."\n";
                    }   
                }
            ?>
        </body>
    </html>