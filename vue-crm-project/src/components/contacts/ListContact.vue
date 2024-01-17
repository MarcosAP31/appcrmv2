<template>
  <div class="container">
    <router-link to="/contacts/create" class="btn btn-success">Add new contact</router-link>
    <br/><br/>
    <diV class="card">
      <div class="card-header">Contacts</div>
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>LastName</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="contact in contacts" :key="contact.contactId">
              <td>{{ contact.ContactId }}</td>
              <td>{{ contact.Name }}</td>
              <td>{{ contact.LastName }}</td>
              <td>{{ contact.Email }}</td>
              <td>{{ contact.Phone }}</td>
              <td>{{ contact.Address }}</td>
              <td><img :width="120" :src="'http://localhost:3000/apistore/images/' + contact.Image" alt=""></td>
              <!--<td><img :width="120" :src="'http://localhost:3000/build/uploads/img/' + contact.Image" alt=""></td>-->
              <td>
                <div class="btn-group" role="group" aria-label="Button group name">
                  <router-link :to="{name:'EditContact',params:{id:contact.ContactId}}" class="btn btn-info">Edit</router-link>
                  <button type="button" v-on:click="deleteContact(contact.ContactId)" class="btn btn-danger">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </diV>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      contacts: {},
    };
  },
  created: function () {
    this.consultContacts();
  },
  methods: {
    //http://localhost/contacts/
    async consultContacts() {
      await axios.get("http://localhost:3000/apistore/contacts")
        .then((response) => {
          console.log(response.data);
          this.contacts = response.data;
        })
        .catch(console.error);
    },
    async deleteContact(id) {
      try {
        const contact=await axios.get(`http://localhost:3000/apistore/contacts/${id}`);
        console.log(contact.data.Image);
        const file=await axios.get(`http://localhost:3000/apistore/file/name/${contact.data.Image}`);
        await axios.delete(`http://localhost:3000/apistore/contacts/${id}`);
        await axios.delete(`http://localhost:3000/apistore/file/${file.data.FileId}`);
        
        window.location.href = "list";
      } catch (error) {
        console.error("Error:", error);
      }
    },

  },
};
</script>