<template>
  <header class="py-6">
    <div class="container items-center px-4 mx-auto flex justify-between">
      <div class="flex logo-image w-1/6">
        <a href="#">
          <img src="@/assets/logo.png" class="md:w-5/6" alt="Logo" />
        </a>
      </div>
      <nav class>
        <ul class="flex justify-end">
          <li>
            <a href="#">I am a photographer</a>
          </li>
          <li>
            <a href="#">Explore photos</a>
          </li>
          <li>
            <a href="#">Find a photographer</a>
          </li>
          <li>
            <a href="#">Find my photo</a>
          </li>
          <li class="text-primary">Login & Register</li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Nav',
};
</script>
