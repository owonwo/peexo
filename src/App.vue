<template>
  <div>
    <Nav />
    <main class="bg-primary-100">
      <section id="jumbo" class="bg-gray-800 cover-image"></section>
      <ProfileNav />
      <div class="container px-4 mx-auto">
        <section class="flex items-center justify-between">
          <h2 class="font-serif text-6xl">
            Afroshots <span class="verified"></span>
          </h2>
          <div class="actions">
            <button
              class="py-3 px-10 rounded-full text-center text-white bg-primary"
            >
              Message
            </button>
            <button
              class="py-3 px-10 ml-4 rounded-full text-center text-white bg-primary"
            >
              Book Now
            </button>
          </div>
        </section>
      </div>
      <Calendar />
    </main>
    <footer>
      <div class="sublinks flex container px-4 justify-center mx-auto py-5 pb-10">
        <div class="w-1/5">
          <h4 class="text-xl mb-4">Quick Links</h4>
          <li><a href="#">Find a photographer </a></li>
          <li><a href="#">Find my photos </a></li>
          <li><a href="#">Peexoomemories </a></li>
          <li><a href="#">Become a photographer</a></li>
        </div>
        <div class="w-1/5">
          <h4 class="text-xl mb-4">Company</h4>
          <div class="text-sm">
            <li><a href="#">About Us </a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Pricing </a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Help & Support </a></li>
            <li><a href="#">Terms of Service </a></li>
            <li><a href="#">Privacy Policy</a></li>
          </div>
        </div>
        <div class="w-1/5">
          <h4 class="text-xl mb-4">Connect with Us</h4>
          <p class="text-sm">
            5A, Awudu Egheda, <br />
            Lekki, Lagos. <br />
            +234 8003229932 <br />
            <a href="mailto:customer.service@peexo.ai"
              >customer.service@peexo.ai</a
            >
          </p>
        </div>
      </div>
      <div class="text-center py-3 bg-black text-white">
        <span class="opacity-75">
          © 2019 Peexo Nigeria Limited
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue';
import ProfileNav from '@/components/ProfileNav.vue';
import Calendar from '@/components/Calendar.vue';

export default {
  name: 'App',
  components: { Nav, ProfileNav, Calendar },
};
</script>
