<template>

  <nav class="mainNav">
    <ul>

      <li class="floatLeft">
        <router-link :to="{ name: 'Home' }" class='mainLink' >Home</router-link>
      </li>

      <li class="floatLeft">
        <div class="subnav">
          <router-link :to="{ name: 'Courses' }" class='mainLink'>Courses</router-link>
          <div className="subnavContent">
            <h2>Search for courses</h2>
            <input
              className="inputField"
              type="text"
              placeholder="Search.."
            />
            <table className="subnavTable">
              <!-- Following must be translated from React to Vue -->

              <!-- <thead>
                <tr>
                  <th>Course</th>
                  <th>Short Description</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(3)].map((e, i) => {
                  return (
                    <tr key={i + 1}>
                      <td>
                        <Link to={`/courses/${i + 1}`}>Course {i + 1}</Link>
                      </td>
                      <td>Course short description!</td>
                    </tr>
                  );
                })}
              </tbody> -->

            </table>
          </div>
        </div>
      </li>

      <li class="floatLeft">
        <router-link :to="{ name: 'About' }" class='mainLink'>About</router-link>
      </li>

      <li class="floatLeft">
        <router-link :to="{ name: 'AdminView' }" class='mainLink'>Admin Pages</router-link>
      </li>

      <li class="floatRight">
      <router-link :to="{ name: 'Register' }" class='mainLink'>Register </router-link>
      </li>

      <li class="floatRight">
        <router-link v-if="false" :to="{ name: 'Home' }" class='mainLink'>Log out</router-link> <!--should also log out a person and only visible to inlogged person-->
        <router-link v-else :to="{ name: 'Login' }" class='mainLink'>Log in</router-link>
      </li>

      <li class="floatRight">
      <router-link v-if="true" :to="{ name: 'Profile' }" class='mainLink'>
        <div className="headerProfileImageContainer">
          <img src="../images/default_profile.png" alt="Profile" />
        </div>
      </router-link>
      </li>

    </ul>
      
  </nav>
</template>
<script>
  export default{
    name:'Header',
    data() {
      return {
        title: 'The Best Free Gym in Luleå'
      }
    },
  }
</script>