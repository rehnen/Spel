<?php

session_start();
error_reporting(-1);


$con = mysql_connect("blu-ray.student.bth.se", "marj10", $_SESSION['pw']);
if (!$con)
    die("could not connect");
if (!isset($_SESSION['name'])) {
    $_SESSION['name'] = "";
    $_SESSION['time'] = 0;
}
mysql_select_db("marj10", $con);
if (isset($_POST['name'])) {
    $_SESSION['name'] = $_POST['name'];
    $_SESSION['time'] = $_POST['time'];
    $_SESSION['name'] = mysql_real_escape_string($_SESSION['name']);
    $_SESSION['name'] = strip_tags($_SESSION['name']);
    mysql_query("INSERT INTO game (name, time) VALUES ('" . $_SESSION['name'] . "', " . intval($_SESSION['time']). ")") or die("bu why");
}
$result = mysql_query("SELECT * FROM game ORDER BY time");
echo "<h2>Highscore: </h2>";
echo "<table>";
while($row = mysql_fetch_array($result))
{
  echo "<tr>";
  echo "<td>".$row['name'] . "</td><td>" . $row['time'] . " </td><td> ". $row['date']."</td>";
  echo "</tr>";
}
echo '</table>';



mysql_close($con);