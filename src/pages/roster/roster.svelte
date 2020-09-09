<script lang="ts">
  import { onMount } from "svelte";
  import Icon from "svelte-awesome";
  import {
    user,
    users,
    plus,
    minus,
    ellipsisH,
    times,
  } from "svelte-awesome/icons";
  import {
    fetchEmployees,
    fetchTeams,
    selectEmployee,
    selectTeam,
    addEmployeeToTeam,
    deleteEmployeeFromTeam,
    createEmployee,
  } from "./usecases";
  import { employees, teams, currentEmployee, currentTeam } from "./store";

  onMount(async () => {
    fetchEmployees();
    fetchTeams();
  });

  let view: "employees" | "teams" = "employees";
  let menuShowing = "";
  let showTeams = false;
  let showEmployees = false;
  let showModal = false;
  let newEmployee = {
    name: "",
    team: "",
    contact: "",
  };
</script>

<style lang="scss">
  @import "../../shared/tokens";

  .head {
    display: flex;
    flex: auto 0;

    h1 {
      width: 100%;
    }

    .addEmployeeButton {
      flex-basis: 50px;
      width: 50px;
      height: 30px;
      border: 1px solid $color-gray50;
      border-radius: 4px;
      margin: $spacing-lv3;
      background: none;
      appearance: none;
      cursor: pointer;
    }
  }

  .container {
    display: grid;
    grid-template-areas:
      "navigation single"
      "collection single";
    grid-template-columns: 300px 1fr;
    grid-column-gap: $spacing-lv4;
    color: $color-basic;
    font-size: $font-size-basic;
    height: calc(100vh - 30px);
    overflow: hidden;
    margin: 0;
    padding: 0;

    .navigation {
      grid-area: navigation;
      display: flex;
      margin: 0 0 $spacing-lv1;

      button {
        flex-basis: 50%;
        height: 30px;
        background: none;
        border: none;
        appearance: none;
        cursor: pointer;

        &:first-of-type {
          border-right: 1px solid $color-gray50;
        }
      }
    }

    .collection {
      grid-area: collection;

      .list {
        height: 100vh;
        overflow: scroll;
        padding: 0;
        margin: 0;

        .item {
          padding: $spacing-lv3 0;
          border-top: 1px solid $color-gray50;

          &:hover,
          &.current {
            background-color: #eee;
          }

          .link {
            display: flex;
            color: inherit;
            text-decoration: none;
          }

          .icon {
            flex-basis: 40px;
            width: 40px;
            height: 40px;
            border-radius: 20px;
            border: 2px solid $color-gray50;
            color: $color-gray50;
            box-sizing: border-box;
            margin-left: $spacing-lv2;
          }

          .name {
            flex-basis: 230px;
            height: 40px;
            line-height: 40px;
            text-decoration: underline;
            padding-left: $spacing-lv4;
          }

          .badge {
            width: 10px;
            height: 10px;
            border-radius: 5px;
            background-color: $color-offline;
            margin: 15px $spacing-lv2;

            &.online {
              background-color: $color-online;
            }
          }
        }
      }
    }

    .single {
      grid-area: single;

      .icon {
        width: 115px;
        margin: 0 auto;
      }

      .name {
        width: auto;
        margin: $spacing-lv4 0;
        font-size: $font-size-large;
        text-align: center;
      }
    }
  }

  .employees {
    .collection {
      .icon {
        padding: 2px 7px;
      }
    }

    .single {
      .table {
        display: grid;
        grid-template-areas: "teams contact";
        width: 800px;
        margin: 0 auto;
        font-size: $font-size-basic;

        .teams {
          grid-area: teams;
          width: 600px;

          ul {
            margin: 0;
            padding: 0;

            li {
              display: flex;
              list-style: none;
              margin: 0;
              padding: $spacing-lv3;
              border-bottom: 1px solid $color-gray90;
              position: relative;

              &:last-of-type {
                border: none;
              }

              .name {
                width: 380px;
                font-size: $font-size-basic;
                margin: 0;
                text-align: left;
              }

              .addButton,
              .deleteButton {
                background: none;
                border: none;
                appearance: none;
                cursor: pointer;
              }

              .deleteButton {
                .icon {
                  width: 20px;
                  height: 20px;
                  border-radius: 10px;
                  border: 1px solid $color-negative;
                  color: $color-negative;
                  padding-top: 2px;
                  padding-left: 1px;
                  box-sizing: border-box;
                }
              }

              .addButton {
                width: 100%;
                height: 30px;
                color: $color-positive;
              }
            }
          }
        }

        .teamList {
          position: absolute;
          width: 600px - $spacing-lv3 * 2;
          background: #fff;
          border: 1px solid $color-gray50;
          border-radius: 4px;

          button {
            width: 100%;
            height: 100%;
            text-align: left;
            background: none;
            border: none;
            appearance: none;
            cursor: pointer;
          }

          li {
            box-sizing: border-box;
          }
        }

        .contact {
          grid-area: contact;
          width: 200px;
        }

        .th {
          font-weight: normal;
          text-align: left;
          padding: $spacing-lv2 0 $spacing-lv2 $spacing-lv3;
          border-bottom: 1px solid $color-gray50;
          box-sizing: border-box;
        }

        .td {
          padding: $spacing-lv3;
          box-sizing: border-box;
        }
      }
    }
  }

  .teams {
    .collection {
      .icon {
        padding: 6px;
      }
    }

    .single {
      .description {
        text-align: center;
      }

      .employees {
        width: 800px;
        display: flex;
        margin: $spacing-lv5 auto 0;

        li {
          list-style: none;
        }

        .employee {
          display: grid;
          grid-template-areas:
            ". menu"
            "icon icon"
            "name name";
          width: 100px;
          height: 130px;
          padding: $spacing-lv4 $spacing-lv2;
          border-right: 1px solid $color-gray90;
          position: relative;

          &:first-of-type,
          &:last-of-type {
            border: none;
          }

          &.add {
            position: relative;
            border: 2px dashed $color-gray50;
          }

          .menu {
            grid-area: menu;
            width: 20px;
            height: 20px;
            position: relative;

            button {
              background: none;
              border: none;
              appearance: none;
              color: $color-gray50;
              cursor: pointer;
            }

            .body {
              position: absolute;
              top: 20px;
              right: 0;
              width: 120px;
              background: #fff;
              border: 1px solid $color-gray50;
              border-radius: 4px;

              &.close {
                display: none;
              }

              &.open {
                display: block;
              }

              .deleteButton {
                background: none;
                border: none;
                appearance: none;
                color: $color-negative;
                font-size: $font-size-small;
                cursor: pointer;
              }
            }
          }

          .icon {
            grid-area: icon;
            width: 24px;
            margin: $spacing-lv4 auto 0;
          }

          .name {
            grid-area: name;
            font-size: $font-size-basic;
            text-align: center;
          }

          .addEmployeeButton {
            grid-area: icon;
            width: 100%;
            height: 100%;
            background: none;
            border: none;
            appearance: none;
            cursor: pointer;

            .icon {
              color: $color-gray50;
              margin: 0 auto;
            }
          }
        }
      }

      .employeesList {
        position: absolute;
        top: 0;
        left: 0;
        width: 200px;
        margin: 0;
        padding: 0;
        background: #fff;
        border: 1px solid $color-gray50;
        border-radius: 4px;
        z-index: 1;

        .item {
          width: 200px;
          padding: $spacing-lv2;
          box-sizing: border-box;
          border-bottom: 1px solid $color-gray90;

          button {
            width: 100%;
            height: 100%;
            background: none;
            border: none;
            appearance: none;
            cursor: pointer;
          }

          .addEmployeeButton {
            text-align: left;
          }

          .closeButton {
            text-align: right;
            color: $color-gray50;
          }
        }
      }
    }
  }

  .modal {
    display: grid;
    grid-template-areas:
      ". . ."
      ". dialog ."
      ". . .";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background: rgba(0, 0, 0, 0.2);

    .dialog {
      grid-area: dialog;
      position: relative;
      width: 600px;
      height: 300px;
      margin: auto;
      padding: $spacing-lv4 $spacing-lv3;
      background: #fff;
      border: 1px solid $color-gray50;
      border-radius: 10px;
      box-sizing: border-box;

      h1 {
        font-size: $font-size-large;
        margin: 0;
        margin-bottom: $spacing-lv4;
      }

      label {
        display: flex;
        flex: 0 auto;
        padding: $spacing-lv2;
      }

      .label {
        width: 120px;
      }

      button {
        background: none;
        border: none;
        appearance: none;
        cursor: pointer;
      }

      .createButton {
        width: 100%;
        color: $color-positive;
        margin-top: $spacing-lv4;
        padding: $spacing-lv2 0;
        border: 1px solid $color-positive;
        border-radius: 4px;
        font-size: $font-size-basic;
      }

      .closeButton {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 40px;
        height: 40px;
        border-radius: 20px;
        border: 1px solid $color-basic;
        color: $color-basic;
      }
    }
  }
</style>

<div class="head">
  <h1>Roster</h1>
  <button on:click={() => (showModal = true)} class="addEmployeeButton">
    <div class="icon">
      <Icon data={plus} />
    </div>
  </button>
</div>

<div
  class="container"
  class:employees={view === 'employees'}
  class:teams={view === 'teams'}>

  <div class="navigation">
    <button
      on:click={() => (view = 'employees')}
      type="button"
      class="toggleButton employeesButton">
      <span class="icon">
        <Icon data={user} />
      </span>
    </button>
    <button
      on:click={() => (view = 'teams')}
      type="button"
      class="toggleButton teamsButton">
      <span class="icon">
        <Icon data={users} />
      </span>
    </button>
  </div>

  {#if view === 'employees'}
    <div class="collection">
      <ul class="list">
        {#each $employees as employee}
          <li
            class="item"
            class:current={$currentEmployee !== null && $currentEmployee.name === employee.name}>
            <a
              on:click|preventDefault={() => selectEmployee(employee)}
              class="link"
              href="#">
              <div class="icon">
                <Icon data={user} scale="2" />
              </div>
              <div class="name">{employee.name}</div>
              <div class="badge" class:online={employee.isOnline} />
            </a>
          </li>
        {/each}
      </ul>
    </div>
    {#if $currentEmployee !== null}
      <div class="single">
        <div class="icon">
          <Icon data={user} scale="10" />
        </div>
        <div class="name">{$currentEmployee.name}</div>
        <div class="table">
          <div class="teams">
            <div class="th">所属</div>
            <div class="td">
              <ul>
                {#each $currentEmployee.teams as team}
                  <li class="team">
                    <button on:click={() => deleteEmployeeFromTeam($currentEmployee)} class="deleteButton" type="button">
                      <div class="icon">
                        <Icon data={minus} />
                      </div>
                    </button>
                    <div class="name">{team}</div>
                  </li>
                {/each}
                <li class="team">
                  <button
                    on:click={() => (showTeams = true)}
                    class="addButton"
                    type="button">
                    <div class="icon">
                      <Icon data={plus} scale="2" />
                    </div>
                  </button>
                  {#if showTeams}
                    <ul class="teamList">
                      {#each $teams as team}
                        <li class="team">
                          <button
                            on:click={() => addEmployeeToTeam($currentEmployee)}
                            class="addTeam"
                            type="button">
                            {team.name}
                          </button>
                        </li>
                      {/each}
                      <li>
                        <button
                          on:click={() => (showTeams = false)}
                          class="closeTeamList">
                          閉じる
                        </button>
                      </li>
                    </ul>
                  {/if}
                </li>
              </ul>
            </div>
          </div>
          <div class="contact">
            <div class="th">連絡先</div>
            <div class="td">
              <div>{$currentEmployee.contact}</div>
            </div>
          </div>
        </div>
      </div>
    {/if}
  {/if}

  {#if view === 'teams'}
    <div class="collection">
      <ul class="list">
        {#each $teams as team}
          <li
            class="item"
            class:current={$currentTeam !== null && $currentTeam.name === team.name}>
            <a
              on:click|preventDefault={() => selectTeam(team)}
              class="link"
              href="#">
              <div class="icon">
                <Icon data={users} scale="1.5" />
              </div>
              <div class="name">{team.name}</div>
            </a>
          </li>
        {/each}
      </ul>
    </div>
    {#if $currentTeam !== null}
      <div class="single">
        <div class="icon">
          <Icon data={users} scale="10" />
        </div>
        <div class="name">{$currentTeam.name}</div>
        <div class="description">{$currentTeam.description}</div>
        <ul class="employees">
          <li class="employee add">
            <button
              on:click={() => (showEmployees = true)}
              class="addEmployeeButton"
              type="button">
              <div class="icon">
                <Icon data={plus} scale="2" />
              </div>
            </button>
            {#if showEmployees}
              <ul class="employeesList">
                {#each $employees as employee}
                  {#if !$currentTeam.employees.has(employee.name)}
                    <li class="item">
                      <button on:click={() => addEmployeeToTeam(employee)} class="addEmployeeButton" type="button">{employee.name}</button>
                    </li>
                  {/if}
                {/each}
                <li class="item">
                  <button
                    on:click={() => (showEmployees = false)}
                    class="closeButton"
                    type="button">
                    閉じる
                  </button>
                </li>
              </ul>
            {/if}
          </li>
          {#each [...$currentTeam.employees] as employee}
            <li class="employee">
              <div class="menu">
                <button
                  on:click={() => (menuShowing = employee.name)}
                  class="menuButton">
                  <Icon data={ellipsisH} />
                </button>
                <div
                  class="body"
                  class:close={menuShowing !== employee.name}
                  class:open={menuShowing === employee.name}>
                  <button on:click={() => deleteEmployeeFromTeam(employee)} class="deleteButton" type="button">
                    チームから削除
                  </button>
                  <button
                    on:click={() => (menuShowing = '')}
                    class="closeButton"
                    type="button">
                    閉じる
                  </button>
                </div>
              </div>
              <div class="icon">
                <Icon data={user} scale="2" />
              </div>
              <div class="name">{employee.name}</div>
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  {/if}
</div>

{#if showModal}
  <div class="modal">
    <div class="dialog">
      <h1>社員を新規登録する</h1>
      <label>
        <span class="label">名前</span>
        <input bind:value={newEmployee.name} type="text" />
      </label>
      <label>
        <span class="label">チーム</span>
        <input bind:value={newEmployee.team} type="text" />
      </label>
      <label>
        <span class="label">連絡先</span>
        <input bind:value={newEmployee.contact} type="text" />
      </label>
      <button
        on:click={() => (showModal = false)}
        class="closeButton"
        type="button">
        <Icon data={times} />
      </button>
      <button on:click={() => createEmployee(newEmployee)} class="createButton" type="button">この内容で作成する</button>
    </div>
  </div>
{/if}
