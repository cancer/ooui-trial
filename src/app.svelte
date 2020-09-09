<script>
  import { Router, Route } from "svelte-routing";
  import Memo from "./pages/memo/memo.svelte";
  import Roster from "./pages/roster/roster.svelte";
</script>

<Router>
  <Route path="/memo">
    <Memo />
  </Route>
  <Route path="/roster">
    <Roster />
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
