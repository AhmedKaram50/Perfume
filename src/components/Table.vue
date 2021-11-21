<template>
  <section class="data-table mb-5">
    <link rel="stylesheet" href="../sass/dataTable.css" />
    <div class="container-fluid">
      <div class="heading d-flex justify-content-between align-items-end">
        <div class="right">
          <h4>Users Informations</h4>
        </div>
        <div class="left d-flex justify-content-center align-items-center">
          <router-link :to="addLink"> <fa-icon :icon="['fas', 'plus']" /> </router-link>
          <div class="search-input">
            <span class="holder"
              ><fa-icon :icon="['fas', 'search']" class="search"
            /></span>
            <input type="text" placeholder="Search" id="mySearch" />
          </div>
        </div>
      </div>
      <div class="table-holder">
        <table id="example" class="display" style="width: 100%">
          <thead>
            <tr>
              <th>Id<fa-icon :icon="['fas', 'exchange-alt']" /></th>
              <th v-for="(heading, index) in headings" :key="index">
                {{ heading }}<fa-icon :icon="['fas', 'exchange-alt']" />
              </th>
            </tr>
          </thead>
          <tbody>
            <slot></slot>
          </tbody>
          <tfoot></tfoot>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["tableDataObj", "headings", "addLink"],
};
</script>

<style lang="scss" scoped>
/* ===================== Start Admin Home Page ===================== */
@import "../sass/config";

.data-table {
  margin-top: 0;
  font-family: var(--main-font);
  background-color: $body-color;
  .heading {
    padding: 35px 10px;
    padding-top: 0;
    .left svg {
      background-color: #1f1a24;
      height: 47px;
      width: 45px;
      color: #fff;
      text-align: center;
      line-height: 45px;
      position: relative;
      top: 20px;
      left: 0px;
      padding: 10px;
      a {
        text-decoration: none;
        color: inherit;
      }
    }
    h4 {
      font-size: 28px;
      font-weight: bold;
      color: var(--main-font);
    }
    .search-input {
      span {
        width: 35px;
        height: 35px;
        line-height: 35px;
        border-radius: 50%;
        display: block;
        text-align: center;
        position: relative;
        top: 15px;
        right: -230px;
        svg {
          color: #fff;
        }
        svg.search {
          background: none;
          color: #1f1a24;
          font-size: 12px;
        }
      }
      input#mySearch {
        font-weight: 500;
        color: rgba(0, 0, 0, 0.54);
        border: 0;
        height: 50px;
        padding: 8px 8px 8px 50px;
        width: 280px;
        background: #ffffff;
        transition: background 0.2s, width 0.2s;
        font-family: var(--main-font);
        outline: none;
        padding: 0 20px;
      }
    }
  }
  .table-holder {
    text-align: center;
    table {
      width: 100%;
      // border-radius: 15px;
      // overflow: hidden;
      box-shadow: $main-shadow;
      thead {
        background-color: #fff;
        padding: 10px;
      }
      tr {
        th {
          padding: 20px 10px;
          background-color: #1f1a24;
          color: #fff;
          svg {
            transform: rotate(90deg);
            margin-right: 5px;
            font-size: 14px;
          }
        }
        td {
          padding: 22px 10px;
          &:nth-child(2) {
            color: #0d6efd;
            a {
              text-decoration: none;
            }
          }
          span.category {
            background-color: $main-color;
            font-size: 16px;
            color: #fff;
            padding: 5px 10px;
          }
          span.percent {
            border-radius: 50%;
            font-weight: bold;
            background-color: #e91e63;
            font-size: 14px;
            padding: 5px;
            width: 40px;
            line-height: 30px;
            height: 40px;
            display: block;
            margin: 0 auto;
            text-align: center;
            color: #fff;
          }
          ul.categories {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0;
            gap: 20px;
            li {
              list-style: none;
              padding: 0;
              margin-bottom: 0;
            }
          }
          button {
            background: none;
            border: none;
            color: #0d6efd;
          }
          .profile-pic {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            overflow: hidden;
            border: 2px solid #fc846b;
            margin: 0 auto;
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
          .action-holder.edit {
            span,
            svg {
              color: $second-color;
            }
          }
          .action-holder.delete {
            span,
            svg {
              color: #e74c3c;
            }
          }
          #dropdown-1,
          .btn-secondary {
            background-color: #fc846b !important;
            color: #fff !important;
          }
          #dropdown-1__BV_toggle_ {
            background-color: #fc846b !important;
            color: #fff !important;
          }
        }
      }
      tr:nth-child(even) {
        background-color: #04295408;
      }
    }
  }
}
/* ===================== End Admin Home Page ===================== */
</style>
