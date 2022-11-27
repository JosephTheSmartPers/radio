<?php
$playing = true
?>
<html>
<link rel="stylesheet" href="styles.css">
  <center>
    <body>
        <text>WC rádió</text>
        <form action="hello.php" method="post">
            <input style="margin-top: 60px" name="subject" value="" type=text placeholder="Linket ide...">
            </form>
        <button id="play"></button>

        <?php 
            $myfile = fopen("songs.txt", "w");
            $txt = $_REQUEST['subject'] or "";
            fwrite($myfile, $txt);
            fclose($myfile);
        ?>
    </body>
    <script src="script.js"></script>
  </center>
</html>