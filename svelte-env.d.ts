declare module "svelte-awesome" {
  import { SvelteComponent } from "svelte";

  export = SvelteAwesome;
  namespace SvelteAwesome {
    class Icon extends SvelteComponent {}
  }
}
