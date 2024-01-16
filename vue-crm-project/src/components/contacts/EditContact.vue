<template>
  <div class="container">
    <div class="card">
      <div class="card-header">Edit new contacts</div>
      <div class="card-body">
        <form v-on:submit.prevent="updateRecord">
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
            <button type="submit" class="btn btn-success">Update</button>
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
  created: function () {
    this.getInformationID();
  },
  methods: {
    async getInformationID() {
    try {
      const contactResponse = await axios.get(`http://localhost:3000/apistore/contacts/${this.$route.params.id}`);
      const contactData = contactResponse.data;
      
      // Fetch the image associated with the contact
      //const imageResponse = await axios.get(`http://localhost:3000/apistore/file/name/${contactData.Image}`);
      //const imageData = imageResponse.data;

      // Update contact data with image information
      this.contact = {
        ...contactData,
        imagePreview: `http://localhost:3000/build/uploads/img/${contactData.Image}`,
      };
    } catch (error) {
      console.error("Error fetching contact information:", error);
    }
  },
    async updateRecord() {
  try {
    var dataSend;
    // Check if a new image is selected
    if (this.file) {
      // If a new image is selected, handle it as usual
      dataSend = {
        Name: this.contact.Name,
        LastName: this.contact.LastName,
        Email: this.contact.Email,
        Phone: this.contact.Phone,
        Address: this.contact.Address,
        Image: this.file.name,
      };

      const formData = new FormData();
      formData.append("file", this.file);

      const contact = await axios.get(
        `http://localhost:3000/apistore/contacts/${this.$route.params.id}`
      );

      const file = await axios.get(
        `http://localhost:3000/apistore/file/name/${contact.data.Image}`
      );

      await axios.delete(
        `http://localhost:3000/apistore/file/${file.data.FileId}`
      );

      await axios.put(
        `http://localhost:3000/apistore/contacts/${this.$route.params.id}`,
        dataSend
      );

      await axios.post("http://localhost:3000/apistore/saveimg", formData);
    } else {
      // If no new image is selected, update the record without changing the image
      dataSend = {
        Name: this.contact.Name,
        LastName: this.contact.LastName,
        Email: this.contact.Email,
        Phone: this.contact.Phone,
        Address: this.contact.Address,
        Image: this.contact.Image, // Use the existing image name
      };

      await axios.put(
        `http://localhost:3000/apistore/contacts/${this.$route.params.id}`,
        dataSend
      );
    }

    window.location.href = "../list";
  } catch (error) {
    console.error("Error:", error);
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