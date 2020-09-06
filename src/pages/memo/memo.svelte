<script lang="ts">
  import { onMount } from "svelte";
  import Icon from "svelte-awesome";
  import { search } from "svelte-awesome/icons";

  import type { Memo } from "../../domains/memo";
  import { memos, keyword, current } from "./store";
  import {
    editContent,
    editTitle,
    fetchMemos,
    searchByKeyword,
    switchMemo,
  } from "./usecases";

  onMount(async () => {
    fetchMemos();
  });
</script>

<style lang="scss">
  @import "../../shared/tokens";

  $searchBox-height: 100px;

  .container {
    display: grid;
    grid-template-areas:
      "searchBox single"
      "collection single";
    grid-template-columns: 300px 1fr;
    grid-column-gap: $spacing-lv4;
    color: $font-color-basic;
    font-size: $font-size-basic;
    height: calc(100vh - 30px);
    overflow: hidden;
    margin: 0;
    padding: 0 $spacing-lv4;

    .searchBox {
      grid-area: searchBox;
      display: flex;
      width: 300px;
      height: 30px;
      margin: $spacing-lv3 0 0;
      border: 1px solid #ccc;
      box-sizing: border-box;

      .keyword {
        order: 2;
        flex-basis: auto;
        width: 100%;
        height: 26px;
        vertical-align: bottom;
        padding: 0;
        border: none;
      }

      .icon {
        order: 1;
        flex-basis: 40px;
        height: 22px;
        line-height: 22px;
        border: none;
        background: transparent;
        padding: $spacing-lv1 $spacing-lv1 0;
        appearance: none;
      }
    }

    .collection {
      grid-area: collection;
      height: 100vh;
      overflow: scroll;
      padding: 0;

      .memo {
        list-style: none;
        padding-bottom: $spacing-lv1;
        border-bottom: 1px solid #ccc;

        :hover {
          background-color: #eee;
        }

        .link {
          display: block;
          color: inherit;
          text-decoration: none;

          .title {
            font-size: 20px;
            margin: $spacing-lv3 0 0;
            text-decoration: underline;
          }

          .content {
            margin: $spacing-lv2 0 0;
            height: 3em;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }

    .single {
      grid-area: single;

      .title {
        font-size: $font-size-large;
        margin-top: $spacing-lv5;
        border: none;
      }

      .content {
        width: 100%;
        height: auto;
        font-size: $font-size-basic;
        color: $font-color-basic;
        border: none;
        margin-top: $spacing-lv5;
      }
    }
  }
</style>

<div class="container">
  <div class="searchBox">
    <input
      value={$keyword}
      on:input={(ev) => searchByKeyword(ev.currentTarget.value)}
      type="text"
      class="keyword" />
    <div class="icon">
      <Icon data={search} />
    </div>
  </div>
  <ul class="collection">
    {#each $memos as memo}
      <li class="memo">
        <a
          on:click|preventDefault={() => switchMemo(memo)}
          href="#"
          class="link">
          <h1 class="title">{memo.title}</h1>
          <p class="content">{memo.content}</p>
        </a>
      </li>
    {/each}
  </ul>

  {#if $current !== null}
    <div class="single">
      <input
        value={$current.title}
        on:blur={(ev) => editTitle(ev.currentTarget.value)}
        class="title" />
      <textarea
        value={$current.content}
        on:blur={(ev) => editContent(ev)}
        class="content" />
    </div>
  {/if}
</div>
