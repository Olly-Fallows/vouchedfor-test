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

      #root {
        padding: 2vw 2vw;
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
      .min-width {
        min-width: 0px;
      }
    </style>
  </head>
  <body>
    <div id="root">
    </div>
    <script type="text/babel" src="scripts/index_script.js"></script>
  </body>
</html>
