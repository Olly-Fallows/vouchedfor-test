<?php require_once("controllers/index_controller.php"); ?>
<!DOCTYPE html>
<html>
  <head>
    <?php require_once("controllers/head.php"); ?>
    <style>
      *{
        padding: 0px;
        margin: 0px;
      }

      .root {
        padding: 2vw;
        padding-left: 25vw;
      }

      .input-field {
        padding: 0.5vw;
      }

      .inline-block {
        display: inline-block;
      }
      .inline {
        display: inline;
      }
      .width-100 {
        width:100%
      }
      .width-75 {
        width: 75%;
      }
      .width-50 {
        width: 50%
      }
      .width-40 {
        width: 40%
      }
      .width-20 {
        width: 20%
      }
      .width-10 {
        width: 10%
      }
      .middle {
        text-align: center;
      }
      .left {
        text-align: left;
      }
    </style>
  </head>
  <body>
    <div id="root" class="root middle">
    </div>
    <div id="feedback" class="root middle">
    </div>
    <script type="text/babel" src="scripts/index_script.js"></script>
  </body>
</html>
