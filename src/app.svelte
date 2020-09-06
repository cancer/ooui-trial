<script>
  import Memo from "./pages/memo/memo.svelte";
  import { Router, Route } from "svelte-routing";
</script>

<Router>
  <Route path="/memo">
    <Memo />
  </Route>
</Router>

<svelte:head>
  <link rel="stylesheet" href="./bundle.css" />
  <style>
    body {
      font-family: "Noto Sans JP", sans-serif;
      margin: 0;
    }
  </style>
</svelte:head>
