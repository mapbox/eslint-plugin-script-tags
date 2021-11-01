<cfparam name="URL.param" default="x" />
<cfinvoke component="cfc.method" method="Method" />

<cfquery name="query">
    SELECT something
    FROM somewhere
    WHERE somewhere.column = <cfqueryparam value="#someval#" cfsqltype="CF_SQL_VARCHAR" />
</cfquery>

<!DOCTYPE html>
<html lang='en'>
  <head>
    <style>
        .foo {}
    </style>
  </head>
  <body>
    <script>
      var a = 'b';
        var b = "b";
    </script>
  
    <p>And some other text.</p><script></script>
  
    <script>
    var a = 'a';
      var b = "b"</script>
  
    <script></script>
  </body>
</html>