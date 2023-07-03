<template>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top custom-bg-dark">
    <router-link to="/" class="navbar-brand"> 
      <a class="navbar-brand" href="#">
        <img alt="WOYM logo" src="../assets/light-bulb.png" style="max-height: 30px"/> What's On Your Mind?
        </a>
    </router-link>
      <div class="container-fluid">
      
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link" exact> 
              Home
          </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/thoughts" class="nav-link" exact> 
              Thoughts
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link" exact> 
              Register
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link" exact> 
              Login
            </router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Logout</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Jeff</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>