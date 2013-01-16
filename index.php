<?php $title = 'Game Project';
 session_start();
include(__DIR__ . '/../mall/header.php'); 
include 'config.php';
$_SESSION['pw'] = DB_PASSWORD?>


<div id='flash'>
    <h1>Land safely on the blue box, and avoid the pink obsticles</h1>
    <canvas id='canvas' width='900' height='400'>
        Your browser does not support the element HTML5 Canvas.
    </canvas>
    <form method="post" action="">
        <label>
            Name:
            <input type="text" name="name" id="name" />
        </label>
        <input type="submit" name="send" value="send" id="send" />
        
    </form>
    <div id="highscore">
        
    </div>
</div>
<?php $path = __DIR__;
include(__DIR__ . '/../mall/footer.php'); ?>