<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <label for="username">Username:</label>
      <input type="text" v-model="username" required />
      
      <label for="password">Password:</label>
      <input type="password" v-model="password" required />
      
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      userName: '',
      password: ''
    };
  },
  methods: {
    login() {
      axios.post(
        'http://localhost:8000/api/users/login',
        {
          userName: this.userName,
          password: this.password
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      .then(()=> {
       

        // Redirect using Vue Router
        window.location.href = "contacts/list";
      })
      .catch(error => {
        console.error('Login failed', error);

        if (error.response && error.response.status === 401) {
          // Unauthorized, handle the case where login credentials are incorrect
          alert('Invalid username or password. Please try again.');
        } else {
          // Handle other errors (network issues, server errors, etc.)
          console.error('Unexpected error during login:', error);
          alert('An unexpected error occurred. Please try again later.');
        }
      });
    }
  }
};
</script>


<style scoped>
/* Add your component-specific styles here */
</style>