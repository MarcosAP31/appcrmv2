<template>
  <nav class="navbar navbar-expand navbar-light bg-light">
      <div class="nav navbar-nav">
          <router-link to="/contacts/create" class="nav-link">Create</router-link>
          <router-link to="/contacts/list" class="nav-link">Contacts</router-link>
      </div>
  </nav>
  <br/>
  <router-view/>
</template>
