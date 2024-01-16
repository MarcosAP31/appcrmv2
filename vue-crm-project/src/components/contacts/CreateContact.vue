<template>
  <div class="container">
    <div class="card">
      <div class="card-header">Add new Contact</div>
      <div class="card-body">
        <form v-on:submit.prevent="agregarRegistro">
          <div class="form-group">
            <label for="name" class="form-label">Name:</label>
            <input
              type="text"
              class="form-control"
              required
              name="name"
              v-model="contact.Name"
              id="name"
              aria-describedby="helpId"
              placeholder="Name"
            />
            <small id="helpId" class="form-text text-muted"
              >Write the contact's name</small
            >
          </div>
          <div class="form-group">
            <label for="lastname" class="form-label">LastName:</label>
            <input
              type="text"
              class="form-control"
              required
              name="lastname"
              v-model="contact.LastName"
              id="lastname"
              aria-describedby="helpId"
              placeholder="LastName"
            />
            <small id="helpId" class="form-text text-muted"
              >Write the contact's lastname</small
            >
          </div>
          <div class="form-group">
            <label for="email" class="form-label">Email:</label>
            <input
              type="text"
              class="form-control"
              required
              name="email"
              id="email"
              v-model="contact.Email"
              aria-describedby="helpId"
              placeholder="Email"
            />
            <small id="helpId" class="form-text text-muted"
              >Write the contact's email</small
            >
          </div>
          <div class="form-group">
            <label for="phone" class="form-label">Phone:</label>
            <input
              type="text"
              class="form-control"
              required
              name="phone"
              id="phone"
              v-model="contact.Phone"
              aria-describedby="helpId"
              placeholder="Phone"
            />
            <small id="helpId" class="form-text text-muted"
              >Write the contact's phone</small
            >
          </div>
          <div class="form-group">
            <label for="address" class="form-label">Address:</label>
            <input
              type="text"
              class="form-control"
              required
              name="address"
              id="address"
              v-model="contact.Address"
              aria-describedby="helpId"
              placeholder="Address"
            />
            <small id="helpId" class="form-text text-muted"
              >Write the contact's address</small
            >
          </div>
          <div class="form-group">
            <label for="image" class="form-label">Image:</label>
            <input
              type="file"
              class="form-control-file"
              name="image"
              id="image"
              @change="handleImageUpload"
            />
            <small id="helpId" class="form-text text-muted"></small>
            <!-- Display image preview -->
            <img
              v-if="contact.imagePreview"
              :src="contact.imagePreview"
              alt="Preview"
              class="img-preview"
              style="width: 100px"
            />
          </div>
          <div class="btn-group" role="group" aria-label="Button group name">
            <button type="submit" class="btn btn-success">Add</button>
            <router-link :to="{ name: 'ListContact' }" class="btn btn-warning"
              >Cancel</router-link
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      file: null,
      contact: {},
    };
  },
  methods: {
    async agregarRegistro() {
      console.log(this.contact);
      var dataSend = {
        Name: this.contact.Name,
        LastName: this.contact.LastName,
        Email: this.contact.Email,
        Phone: this.contact.Phone,
        Address: this.contact.Address,
        Image: this.file.name,
      };
      console.log(this.file);
      const formData = new FormData();
      formData.append("file", this.file);
      try {
        // Post contact data
        const responseContact = await axios.post(
          "http://localhost:8000/api/contacts",
          dataSend
        );

        // Post image data
        const responseImage = await axios.post(
          "http://localhost:8000/api/images/upload",
          formData
        );
        
        // Handle responses if needed
        console.log("Contact added:", responseContact.data);
        console.log("Image uploaded:", responseImage.data);
        window.location.href = "list";
      } catch (error) {
        console.error("Error adding contact:", error);
      }
    },
    handleImageUpload(event) {
      this.file = event.target.files[0];
      if (this.file) {
        // Convert the image to a base64-encoded string
        this.convertImageToBase64(this.file)
          .then(() => {
            this.contact.imagePreview = URL.createObjectURL(this.file); // Set image preview
            this.contact.Image = this.file.name; // Update Image property
          })
          .catch((error) => {
            console.error("Error converting image to base64:", error);
          });
      }
    },
    convertImageToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result.split(",")[1]);
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsDataURL(file);
      });
    },
  },
};
</script>