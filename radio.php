<html>
<link rel="stylesheet" href="styles.css">
<center>

  <body>
    <text>WC rádió</text>
    <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
      <input style="margin-top: 60px" name="subject" id="" type=text placeholder="Linket ide">
            </form>
      <text id="song">Now playing:
        <br>
        <?php
        if (isset($_REQUEST["subject"])) {
          echo $_REQUEST["subject"];
        } 
        else{
        $myfile = fopen("songs.txt", "r") or die("nothing");
        echo fgets($myfile);
        }
        ?>
      </text>
      <?php
      if (isset($_REQUEST["subject"])) {
        $txt = $_REQUEST["subject"];
        $myfile = fopen("songs.txt", "w+") or die("Unable to start" + $txt);
        fwrite($myfile, $txt);
        fclose($myfile);
      }
      ?>
      <button id="stopButton">Stop/Start</button>
      <style>
.slidecontainer {
  margin-top: 40px;
  width: 60%;
}

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 15px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #04AA6D;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #04AA6D;
  cursor: pointer;
}
</style>
        <div class="slidecontainer">
          <input type="range" min="1" max="100" value="50" class="slider" id="myRange">
        </div>
  </body>
  <script src="script.js"></script>
</center>

</html>