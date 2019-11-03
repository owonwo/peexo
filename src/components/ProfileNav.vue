<template>
    <div class="profile-tab mb-12">
        <div class="container px-4 flex justify-between mx-auto relative">
          <div class="w-48">
            <img
              class="w-48 h-48 rounded-lg absolute"
              style="transform: translateY(-50%)"
              src="@/assets/profile-avatar.png"
            />
          </div>
          <nav class="flex-1 profile-nav flex items-center justify-around">
            <li><a href="#">Details</a></li>
            <li><a href="#">Portfolio</a></li>
            <li class="active"><a href="#">Availability</a></li>
            <li><a href="#">Pricing Packages</a></li>
            <li><a href="#">Reviews</a></li>
          </nav>
        </div>
      </div>
</template>
