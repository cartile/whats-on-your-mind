<template>
  <div class="container">
    <div class="content">
      <h1 class="display-4">Greetings, Online Adventurer</h1>
      <p class="lead"> <Strong><span style="font-family: 'Georgia', sans-serif; font-size: 20px;">What's On Your Mind</span></Strong> is a vibrant online forum where you can freely share your thoughts, gain insights, and connect with individuals who share your passions</p>
      <hr class="my-4">
      <p>Click below to start posting your thoughts</p>
      <router-link to="/thoughts" class="btn btn-success btn-lg">Start Sharing</router-link>
    </div>
    <div class="image-container">
      <img src="../assets/brainstorm.png" alt="Man Thinking" class="man-thinking-img">
    </div>
  </div>
</template>

<style>
.container {
  display: flex;
  align-items: center;
}

.image-container {
  margin-left: 20px;
}

.man-thinking-img {
  width: 350px;
}
</style>


