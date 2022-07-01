<template>
  <div class="header">
    <img src="../assets/qgen-logo-big.png" alt="">
    <div class="header-right">
      <router-link :class="$route.path == '/' ? 'active' : ''" to="/">Home</router-link>
      <router-link :class="$route.path == '/add' ? 'active' : ''" to="/add">Add User</router-link>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

header{
    position: fixed;
    background-color: rgb(228, 255, 255);
}

/* Style the header with a grey background and some padding */
.header {
  overflow: hidden;
  background-color: #f1f1f1;
  padding: 20px 10px;
}

/* Style the header links */
.header a {
  float: left;
  color: black;
  text-align: center;
  padding: 12px;
  text-decoration: none;
  font-size: 18px;
  line-height: 25px;
  border-radius: 4px;
  background-color: rgb(255, 214, 214);
}

/* Style the logo link (notice that we set the same value of line-height and font-size to prevent the header to increase when the font gets bigger */
.header a.logo {
  font-size: 25px;
  font-weight: bold;
}

/* Change the background color on mouse-over */
.header a:hover {
  background-color: #ddd;
  color: black;
}

/* Style the active/current link*/
.header a.active {
  background-color: dodgerblue;
  color: white;
}

/* Float the link section to the right */
.header-right {
  padding-right : 2rem;
  float: right;
  display: flex;
  gap: 1rem;
}

/* Add media queries for responsiveness - when the screen is 500px wide or less, stack the links on top of each other */
@media screen and (max-width: 500px) {
  .header a {
    float: none;
    display: block;
    text-align: left;
  }
  .header-right {
    float: none;
  }
}

</style>